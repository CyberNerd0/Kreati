import { Schema, model, HydratedDocument, ObjectId } from "mongoose"

export namespace IUser {
  export type Insertable = {
    address: string
    username: string
    profilePicture?: string
    creatorId: ObjectId
  }

  export type Updateable = Partial<Insertable>

  export type Selectable = HydratedDocument<Insertable>
}

const UserSchema = new Schema({
  address: String,
  username: String,
  profilePicture: { type: String, required: false }
})

export const User = model<IUser.Insertable>("User", UserSchema)
