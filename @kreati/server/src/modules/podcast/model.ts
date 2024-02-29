import { prop, getModelForClass } from "@typegoose/typegoose"

export class PodcastSchema {
  @prop()
  public name!: string

  @prop()
  public hasStarted!: boolean

  @prop()
  public timeElapsed?: number

  @prop()
  public scheduledDate?: boolean

  @prop()
  public creatorId!: string

  @prop()
  public coverPicture?: string
}

export const Podcast = getModelForClass(PodcastSchema)

export default PodcastSchema

