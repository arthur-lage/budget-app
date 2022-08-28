declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      iat: string;
      exp: string;
    };
  }
}
