import { prop, getModelForClass } from "@typegoose/typegoose"

export class UserSchema {
  @prop()
  public privateKey!: string

  @prop()
  public username!: string

  @prop()
  public profilePicture?: string
}

export const User = getModelForClass(UserSchema)

export default User 
