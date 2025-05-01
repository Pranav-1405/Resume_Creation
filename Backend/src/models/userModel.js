

import { pool } from '../config/db.js';

class UserModel {
    constructor({ username, email, password }) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async save() {
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [this.username, this.email, this.password]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
}

export default UserModel;