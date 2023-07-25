import passport from "passport";
import jwt from "passport-jwt";
import { options } from "./config.js";

const jwtStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initializePassport = () => {
  //estrategia jwt
  passport.use(
    "authJWT",
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: options.server.secretToken,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[options.server.cookieToken];
  }
  return token;
};
