import db from "../config/db.js";

const createUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(query, [name, email, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM users
            WHERE email = ?
        `;

        db.query(query, [email], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export {
    createUser,
    getUserByEmail
};