import passport from "passport";
import { Strategy } from "passport-jwt";

export const authenticate = (Strategy) =>{
    const passportAuthenticate = async (req,res,next) =>{
        passport.authenticate(Strategy,{session:false}, (err,user,info) =>{
            if(err) return next(err);
            if(!user){
                return res.status(401).send({error:info.toString()});
            }
            req.user = user;
            next();
        })(req,res,next);
    };
    return passportAuthenticate;
}