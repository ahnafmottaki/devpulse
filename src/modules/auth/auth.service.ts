import config from "../../config/config.js";
import { pool } from "../../db/index.js";
import { getJwtToken } from "../../utils/getJwtToken.js";
import {
    type LoginBody,
    type RegisterBody,
    type User,
} from "./auth.repository.js";
import bcrypt from "bcryptjs";

const loginUser = async (loginCredentials: LoginBody) => {
    const { email, password } = loginCredentials;
    const getUserResult = await pool.query<User>(
        `
    SELECT * FROM users WHERE email = $1
    `,
        [email],
    );

    if (getUserResult.rowCount === 0) {
        throw new Error("User Not Found!");
    }
    const user = getUserResult.rows[0]!;
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Email or Password!");
    const { password: pass, ...rest } = user;
    const token = getJwtToken({
        id: rest.id,
        name: rest.name,
        email: rest.email,
        role: rest.role,
    });
    return {
        token,
        user: rest,
    };
};

const registerUser = async (userDetails: RegisterBody) => {
    const { name, email, password, role } = userDetails;
    const doesUserExist = await pool.query<User>(
        `
        SELECT * FROM users WHERE email = $1
        `,
        [email],
    );
    if (doesUserExist.rows.length > 0) throw new Error("User already exists!");

    const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRounds);
    const dbResponse = await pool.query<User>(
        `
    INSERT INTO users(name, email, password, role)
    VALUES($1, $2, $3, $4) RETURNING *
    `,
        [name, email, hashedPassword, role],
    );
    const { password: _, ...rest } = dbResponse.rows[0]!;
    return rest;
};

export const authService = {
    loginUser,
    registerUser,
};
