import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { User } from "../entities/userEntity";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { ForgotPasswordToken } from "../entities/forgotPasswordTokenEntity";

import crypto from "crypto";
import { sendMail } from "../utils/sendMail";

export const userController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({});

      return res.status(200).json(users);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      return res.status(200).json(user);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!validateName(name)) {
        return res.status(400).json({
          message:
            "Invalid name. It should have at least 2 characters, up to 24 characters.",
        });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({
          message: "Invalid email. It should look like email@example.com.",
        });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({
          message:
            "Invalid password. It should have at least 6 characters up to 16 characters.",
        });
      }

      const emailExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (emailExists) {
        return res
          .status(409)
          .json({ message: "This email is already being used." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User(name, email, hashedPassword);

      await prisma.user.create({
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
        },
      });

      const token = generateToken(newUser.id, "7d");

      return res
        .status(200)
        .json({ token, message: "User created successfully" });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!validateEmail(email)) {
        return res.status(400).json({
          message: "Invalid email. It should look like email@example.com",
        });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({
          message:
            "Invalid password. It should have at least 6 characters up to 16 characters",
        });
      }

      const currentUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!currentUser) {
        return res.status(400).json({ message: "Invalid user credentials." });
      }

      const isPassword = await bcrypt.compare(password, currentUser.password);

      if (!isPassword) {
        return res.status(400).json({ message: "Invalid user credentials." });
      }

      const token = generateToken(currentUser.id, "7d");

      return res
        .status(200)
        .json({ token, message: "User logged in successfully" });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async deleteAll(req: Request, res: Response) {
    try {
      await prisma.user.deleteMany({});

      return res.status(200).json({ message: "Users deleted." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({ message: `User with id ${id} deleted.` });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async auth(req: Request, res: Response) {
    try {
      //@ts-ignore
      if (!req.user) {
        return res.status(401).json({ message: "Invalid user authentication" });
      }

      //@ts-ignore
      const { id } = req.user;

      const currentUser = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      const userInfo = {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        balance: currentUser?.balance,
      };

      return res
        .status(200)
        .json({ user: userInfo, message: "User authenticated successfully." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email field is required." });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      const userExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!userExists) {
        return res.status(400).json({
          message: "We couldn't find the email you were looking for.",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");

      const forgotPasswordToken = new ForgotPasswordToken(
        resetToken,
        userExists.id
      );

      await prisma.forgotPasswordToken.deleteMany({});

      const createdToken = await prisma.forgotPasswordToken.create({
        data: forgotPasswordToken,
      });

      sendMail({
        toEmail: email,
        emailSubject: "Password Recovery",
        emailHTML: `
        <b>Hello, ${userExists.name}</b>,

        <br/>

        <p>Here is your reset password link. Click the link below and follow the instructions in order to create a new password for you account. </p>

        <p>If you didn't request a password recovery, ignore this email and change the password of your account</p>

        <br/>

        <a href="http://127.0.0.1:5173/recover?code=${createdToken.token}">RESET PASSWORD</a>
        `,
      });

      return res.status(200).json({ message: "Email sent to user." });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  async recoverPassword(req: Request, res: Response) {
    try {
      const { code } = req.query;
      const { password, confirmPassword } = req.body;

      if (!code) {
        return res.status(400).json({
          message: "Invalid password reset code.",
        });
      }

      if (!password) {
        return res.status(400).json({
          message: "Password field is required.",
        });
      }

      if (!confirmPassword) {
        return res.status(400).json({
          message: "Confirm password field is required.",
        });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      if (!validatePassword(confirmPassword)) {
        return res.status(400).json({
          message: "Invalid password confirmation",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Passwords should match.",
        });
      }

      const currentForgotPasswordToken =
        await prisma.forgotPasswordToken.findFirst({
          where: {
            token: String(code),
          },
        });

      if (!currentForgotPasswordToken) {
        return res
          .status(400)
          .json({ message: "Invalid password reset code." });
      }
      
      if (
        new Date().getTime() >
        new Date(currentForgotPasswordToken?.createdAt).getTime() +
          currentForgotPasswordToken?.expiresIn
      ) {
        return res
          .status(400)
          .json({ message: "Your password reset code has been reseted!" });
      }

      const currentUser = await prisma.user.findFirst({
        where: {
          id: String(currentForgotPasswordToken.userId),
        },
      });

      const arePasswordsEqual = await bcrypt.compare(
        password,
        String(currentUser?.password)
      );

      if (arePasswordsEqual) {
        return res.status(400).json({
          message: "New password should be different from the current one.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: {
          id: String(currentForgotPasswordToken.userId),
        },
        data: {
          password: hashedPassword,
        },
      });

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
