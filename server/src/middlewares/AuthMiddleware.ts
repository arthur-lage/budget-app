import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken'

interface IJwtPayload {
  id: string;
  iat: string;
  exp: string;
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: "A token is required." })
  }

  const [, token] = req.headers.authorization.split(" ")

  if(!token) {
    return res.status(401).json({ message: "A token is required." })
  }

  try {
    //@ts-ignore
    const decode: IJwtPayload = jwt.verify(token, String(process.env.JWT_SECRET))

    const user = {
      id: decode.id,
      iat: decode.iat,
      exp: decode.exp
    }

    //@ts-ignore
    req.user = user

    next()
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}