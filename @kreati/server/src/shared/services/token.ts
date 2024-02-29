import jwt from "jsonwebtoken";
import { IUser } from "../database/models/user";
import config from "../config";

namespace TokenServive {
  export type Token = {
    username: string;
  };

  export async function generateAccessToken(user: IUser.Selectable) {
    return jwt.sign(
      {
        username: user.username
      },
      config.jwt.accessToken.secret,
      { expiresIn: config.jwt.accessToken.validity }
    );
  }

  export async function verifyAccessToken(accessToken: string) {
    return jwt.verify(accessToken, config.jwt.accessToken.secret) as Token;
  }
}

export default TokenServive;

