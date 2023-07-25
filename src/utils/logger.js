//imports app
import winston from "winston";
import path from "path";
//niveles propios
import { __dirname } from "../utils/utils.js";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const loggerProd = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "/logs/errores.js"),
      level: "error",
    }),
  ],
});

const loggerDev = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

const currentEnv = process.env.ENV;

export const addLogger = (req, res, next) => {
  if (currentEnv === "dev") {
    req.logger = loggerDev;
  } else {
    req.logger = loggerProd;
  }
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

let levelToUse = "null";

if (currentEnv==="dev") {
    levelToUse = "debug"
} else {
    levelToUse = "warning"
}

export const logger = winston.createLogger({
    
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level: levelToUse,
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
    ]
});
