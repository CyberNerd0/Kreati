import { Schema, model } from "mongoose"

export interface IUser {
  address: string
  username: string
  profilePicture?: string
}

const UserSchema = new Schema({
  address: String,
  username: String,
  profilePicture: { type: String, required: false }
})

export const User = model("User", UserSchema)
