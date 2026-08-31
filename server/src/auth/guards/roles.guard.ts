import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request} from "express";
import { ROLES_KEY } from "../decorators/roles.decorator.js";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles: string[] | undefined = this.reflector.getAllAndOverride(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );
        if (!requiredRoles) return true;
        const req: Request = context.switchToHttp().getRequest();
        const role = req.user?.role;

        if (role && requiredRoles.includes(role)) {
            return true;
        }
        else {
            throw new ForbiddenException('You do not have permission to access this resource.');
        }
        
    }
}