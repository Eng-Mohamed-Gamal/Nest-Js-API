import { Module } from "@nestjs/common";
import { UserController } from "../User/user-controller";
import { UserService } from "../User/user-service";
import { models } from "../DB/model-generation";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports : [models] , 
    controllers : [UserController] ,
    providers : [UserService , JwtService]
})
export class UserModule {}