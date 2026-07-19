import db from "../config/db.js";

const createUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        const insertQuery = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(insertQuery, [name, email, password], (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const selectQuery = `
            SELECT *
            FROM users
            WHERE email = ?
        `;

        db.query(selectQuery, [email], (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const selectQuery = `
            SELECT id, name, email, created_at
            FROM users
            WHERE id = ?
        `;

        db.query(selectQuery, [id], (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

export {
    createUser,
    getUserByEmail,
    getUserById
};