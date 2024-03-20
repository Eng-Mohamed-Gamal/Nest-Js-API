import { Controller, Delete, Get, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user-service";
import { AuthGuard } from "../Guards/auth-guard";




@Controller("user")
export class UserController {

    constructor (
        private readonly userService : UserService
    ) {}

    @Put("updateUser")
    @UseGuards(AuthGuard)
    async updateUser (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response
        const updatedUser = await this.userService.updateUser(req)
        // send response
        res.status(200).json({
            message : "Update Done",
            data : updatedUser
        })
    }

    @Delete("deleteUser")
    @UseGuards(AuthGuard)
    async deleteUser (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        // get response  
        const deletedUser = await this.userService.deleteUser(req)
        // send response  
        res.status(200).json({
            message : "Delete Done",
            data : deletedUser
        })
    }

    @Get("profile")
    @UseGuards(AuthGuard)
    async getUSer (
        @Req() req : Request ,
        @Res() res : Response
    ) {
        const data = await req["authUser"]        
        res.status(200).json({
            message : "Done",
            data 
        })
    }


}