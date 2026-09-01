import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { SessionsService } from '../sessions/sessions.service.js';
import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from './constants/auth.constants.js';



@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService,
    private sessionsService: SessionsService
  ) {}

  createAccessJwtToken(user: {id: number, role: string}) {

    const payload = {
      sub: user.id,
      role: user.role
    }

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async createRefreshJwtToken(user: {id: number}) {

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const session = await this.sessionsService.create({
      userId: user.id,
      expiresAt
    })    

    const payload = {
      sub: user.id,
      sessionId: session.id
    }

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: `${REFRESH_TOKEN_EXPIRES_IN_DAYS}d`
    });

    const tokenHash = await bcrypt.hash(refreshToken, 5);
    await this.sessionsService.updateTokenHash(session.id, user.id, tokenHash);

    return refreshToken;
  }

  async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login);

    if (!user) throw new UnauthorizedException('Invalid credentials'); 

    const isValidPass = await bcrypt.compare(userDto.password, user.passwordHash);
    if (!isValidPass) throw new UnauthorizedException('Invalid credentials'); 

    const {passwordHash, ...validUser} = user;

    return validUser;
  }

  async login(userDto: LoginUserDto) {
    const validUser = await this.validateUser(userDto);

    const accessToken = this.createAccessJwtToken({id: validUser.id, role: validUser.role.title});
    const refreshToken = await this.createRefreshJwtToken({id: validUser.id});

    return {
      success: true,
      accessToken, refreshToken,
      data: validUser
    }    
  }

  async register(userDto: CreateUserDto) {

    const createdUser = await this.usersService.create(userDto);    

    const accessToken = this.createAccessJwtToken({id: createdUser.data.id, role: createdUser.data.role.title});
    const refreshToken = await this.createRefreshJwtToken({id: createdUser.data.id});

    return {
      success: true,
      accessToken, refreshToken,
      data: createdUser.data
    }    
  }

  async refresh(refreshToken: string) {

    if (!refreshToken) throw new UnauthorizedException('Refresh token is missing.');

    console.log(refreshToken);
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const session = await this.sessionsService.getSessionById(payload.sessionId, payload.sub);
    const validToken = await bcrypt.compare(refreshToken, session.tokenHash ?? '');

    if (!validToken) throw new UnauthorizedException('Refresh token is missing.');

    if (new Date() > session.expiresAt) {
      await this.sessionsService.remove(payload.sessionId, payload.sub);
    }

    const user = await this.usersService.getUserById(payload.sub);

    if (!user) throw new UnauthorizedException('Invalid refresh token.');

    const accessToken = this.createAccessJwtToken({id: payload.sub, role: user.role.title});

    return {
      accessToken,
      data: {
        id: payload.sub
      }
    }    
  }  

  async logout(refreshToken: string) {

    if (!refreshToken) return;

    let payload;
    try {      
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });  
    } catch {
      return
    }    
    await this.sessionsService.remove(payload.sessionId, payload.sub);
  }  
}
