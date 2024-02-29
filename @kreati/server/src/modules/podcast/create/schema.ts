import { z } from "zod"

export default z.object({
  name: z.string(),
  scheduleDate: z.date(),
  coverPicture: z.string().optional()
})
