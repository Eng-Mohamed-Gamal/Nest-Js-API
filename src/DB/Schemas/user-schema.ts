import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({timestamps : true}) 
export class User {
    @Prop({
        required : true ,
        type : String ,
        lowercase : true ,
        trim : true
    })
    name : string

    @Prop({
        required : true ,
        type : String ,
        unique : true
    })

    email : string

    @Prop({
        required : true ,
        type : String ,
    })

    password : string

    @Prop({
        required : true ,
        type : String ,
        default : "user" ,
        enum : ["user" , "admin"]
    })

    role : string

    @Prop({
        required : true ,
        type : Boolean ,
        default : false
    })

    isEmailVerified : boolean


}


export const userSchema =  SchemaFactory.createForClass(User)