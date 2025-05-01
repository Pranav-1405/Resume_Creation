import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import { pool } from '../config/db.js';

export const registerUser = async (user) => {
    try {
        
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [user.email]);
        
        if (existingUsers.length > 0) {
            return { success: false, message: "User already exists" };
        }

        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        
        await user.save();
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return { 
                success: false, 
                message: "Invalid email or password" 
            };
        }

        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return { 
                success: false, 
                message: "Invalid email or password" 
            };
        }

        
        return { 
            success: true, 
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        };
    } catch (error) {
        console.error("Login service error:", error);
        throw error;
    }
};