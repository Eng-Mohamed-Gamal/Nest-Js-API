import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth-service";


@Controller("auth") 
export class AuthController {
    constructor (
        private readonly authService : AuthService
    ) {}
    @Post("signUp") 
    async signUpController (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response 
        const createdUser = await this.authService.signUpService(req);
        // response 
        res.status(201).json({
            messsage : "User Created Done",
            data : createdUser
        })
    }
    @Get("confirm-email") 
    async confirmEmail (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response 
        const confirmedUser = await this.authService.confirmEmail(req);
        // response 
        res.status(200).json({
            messsage : "Email Confirmed",
            data : confirmedUser
        })
    }
    @Post("logIn")
    async logIn (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response 
        const token = await this.authService.LogIn(req);
        // response 
        res.status(200).json({
            messsage : "LogIn Done",
            token
        })
    }
}