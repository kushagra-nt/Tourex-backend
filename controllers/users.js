import users from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email: email });

    if (!existingUser) {
      res.status(404).json({ message: "No user with that email" });
      return;
    }

    const passwordMatched = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatched) {
      res.status(403).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ email: email, id: existingUser._id }, process.env.TOKEN_SECRET, { expiresIn: "3h" });
    existingUser.token = token;

    res.status(200).json({ data: existingUser, token: token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong :(" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await users.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({ message: "user with email already exist" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: email, id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: "3h" });

    res.status(200).json({ data: newUser, token: token });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};
