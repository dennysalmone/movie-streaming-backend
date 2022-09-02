import jwt from "jsonwebtoken";
import { privateKey } from "../assets/environment";

export default module.exports = (req: any, res: any, next: any) => {
    try{
        const token = req.headers.authorization;
        if(token) {
            const decoded: jwt.JwtPayload = jwt.verify(token, privateKey) as jwt.JwtPayload;
            if(decoded){
                req.headers["email"] = decoded.email;
                return next();
            }
        }
    } catch(e){ 
        console.log(e)
        return res.status(401).json({message: 'Account session timed out'});
    }
    return next();
}