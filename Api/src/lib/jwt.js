import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        if (!TOKEN_SECRET) {
            return reject(new Error('TOKEN_SECRET is not defined'));
        }

        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) {
                    console.error('Error signing the token:', err);
                    return reject(err);
                }
                resolve(token);
            }
        );
    });
}

