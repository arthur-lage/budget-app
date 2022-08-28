import jwt from "jsonwebtoken";

export const generateToken = (id: string, expTime: string) => {
  const token = jwt.sign(
    {
      id,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: expTime,
    }
  );

  return token;
};
