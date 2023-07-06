import supabase from "../db.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import config from "../config.js"

function generateAccessToken(id) {
  const payload = { id };
  return sign(payload, config.secret, { expiresIn: "1h" });
}

class authController {
  async signUp(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    try {
      const { email, password } = req.body;
      const { data: candidate } = await supabase
        .from("test_auth")
        .select()
        .eq("email", `${email}`)
        .maybeSingle();
      if (candidate) {
        return res.status(409).json({ message: "Email already registrated" });
      }

      const hashPassword = bcrypt.hashSync(password, 4);
      const { error } = await supabase
        .from("test_auth")
        .insert([{ email, password: hashPassword }]);
      if (error) {
        console.log(error);
      }

      return res.status(201).json({ message: `User created` });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const { data: user } = await supabase
        .from("test_auth")
        .select()
        .eq("email", `${email}`);

      if (!user.length) {
        return res.status(404).json({ message: `Email ${email} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user[0].password);

      if (!validPassword) {
        return res.status(404).json({ message: `Entered wrong password` });
      }
      const token = generateAccessToken(user[0].id);

      return res.json({token});
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUser(req, res) {
    try {
        const  user  = req.user;
      
        const { data:  result } = await supabase
        .from("test_auth")
        .select()
        .eq("id", `${user.id}`);
        
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  }
 
}

export default new authController();
