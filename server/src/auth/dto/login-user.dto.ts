import { IsEmailOrPhone } from "../../common/validators/email-or-phone.validator.js";
import {IsString, IsStrongPassword} from 'class-validator';
export class LoginUserDto {

    @IsEmailOrPhone()
    login: string;

    @IsString()
    @IsStrongPassword({
        minLength: 6
    })
    password: string; 
}
