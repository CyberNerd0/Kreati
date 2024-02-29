import { Schema, model } from "mongoose"

export interface IPodcast {
  name: string
  hasStarted: boolean
  timeElapsed?: number | null
  scheduledDate?: boolean
  creatorId: string
  coverPicture: string | null
}

const PodcastSchema = new Schema({
  name: String,
  hasStarted: Boolean,
  timeElapsed: { type: Number, required: false },
  scheduledDate: { type: Date, required: false },
  creatorId: String,
  coverPicture: { type: String, required: false }
})

export const Podcast = model("Podcast", PodcastSchema)
