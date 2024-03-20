import { Module } from "@nestjs/common";
import { AuthController } from "../Auth/auth-controller";
import { AuthService } from "../Auth/auth-service";
import { models } from "../DB/model-generation";
import { JwtService } from "@nestjs/jwt";
import { SendEmailService } from "../common/Services/send-email.service" ;


@Module({
    imports : [models] ,
    controllers : [AuthController] ,
    providers : [AuthService , JwtService , SendEmailService] 
})

export class AuthModule {}