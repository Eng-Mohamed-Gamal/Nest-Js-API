import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../DB/Schemas/user-schema";

import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { SendEmailService } from "../common/Services/send-email.service";



@Injectable() 
export class AuthService {
    constructor (
        @InjectModel(User.name) private userModel : Model<User>,
        private jwtService : JwtService ,
        private sendEmailService: SendEmailService,
    ) {}

    async signUpService (req : any) {
        const {name , email , password} = req.body
        // email check 
        const isEmailExist = await this.userModel.findOne({email})
        if(isEmailExist) throw new BadRequestException("Email Is Already Exist")
        // hash password 
        const hashedPassword =  bcrypt.hashSync(password , 10);
        // send confirmation email
        const token = this.jwtService.sign({email} , {secret : "secret-confirmation"})
        const confirmationLink = `${req.protocol}://${req.headers.host}/auth/confirm-email?token=${token}`
        const isEmailSent = await this.sendEmailService.sendEmail(
            email ,
            "Hello With Jemy",
            `<h1>Click on the link to confirm your email</h1> 
            <a href="${confirmationLink}">Confirm Email</a>`
        )        
        if (!isEmailSent) throw new InternalServerErrorException(`Email not sent to ${email}`);
        //create new user
        const user = await this.userModel.create({
            name,
            email,
            password : hashedPassword
        })

        return user;
    }

    async confirmEmail (req : any) {
        const { token } = req.query;
        const decodedData = this.jwtService.verify(token , {secret : "secret-confirmation"}   );
        // get user by email , isEmailVerified = false
        const user = await this.userModel.findOneAndUpdate(
          {
            email: decodedData.email,
            isEmailVerified: false,
          },
          { isEmailVerified: true },
          { new: true }
        );
        if (!user) {
          throw new ConflictException("User Not Found")
        }
        return user
    }

    async LogIn (req : any) {
        const {email , password} = req.body
        // email check 
        const user = await this.userModel.findOne({email})        
        if(!user) throw  new BadRequestException("Wrong Credentials")
        // check password 
        const checkPassword = bcrypt.compareSync(password , user.password)
        if(!checkPassword) throw  new BadRequestException("Wrong Credentials")
        // generate Token 
        const token = this.jwtService.sign({email : user.email , id : user._id} , {secret : "LogIn-Secret"})
        return token
    }
}