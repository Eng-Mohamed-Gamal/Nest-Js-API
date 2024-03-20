import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "./Schemas/user-schema";


export const models = MongooseModule.forFeature([
    {name : User.name , schema : userSchema}
])