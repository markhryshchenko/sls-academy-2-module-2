import jwt from "jsonwebtoken";
const { verify } = jwt;
import config from "../config.js"

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "User not authorized"})
        }
        const decodedData = verify(token, config.secret)
        
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "User not authorized"})
    }
};
