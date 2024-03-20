import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../DB/Schemas/user-schema";
import { Model } from "mongoose";


@Injectable()
export class UserService {

    constructor (
        @InjectModel(User.name) private userModel : Model<User>,
    ) {}


    async updateUser (req : any) {
        const {name , email} = req.body 
        const {_id} = req.authUser
        // email check 
        const isEmailExist = await this.userModel.findOne({email})
        if(isEmailExist){
            throw new BadRequestException("Email Is Already Exist")
        }else{
        const updatedUser = await this.userModel.findByIdAndUpdate(_id , {email , name} , {new : true}  )  
        return updatedUser
        }
          
    }

    async deleteUser (req : any) {
        const {_id} = req.authUser
        const deletedUser = await this.userModel.findByIdAndDelete(_id)  
        if(!deletedUser) throw new InternalServerErrorException("Delete Fail")
        return deletedUser
    }


}