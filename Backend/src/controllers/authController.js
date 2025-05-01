import UserModel from "../models/userModel.js";
import { registerUser, loginUser as loginUserService } from "../services/authService.js";

export const register = async (req, res) => {
    const {username, email, password} = req.body;
    console.log("Incoming request body:", req.body);
    
    if(!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const user = new UserModel({username, email, password});
        const response = await registerUser(user);
        
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch(error) {
        console.error("Backend error", error);
        return res.status(500).json({ 
            success: false, 
            message: "Error registering user", 
            error: error.message 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const response = await loginUserService(email, password);
        
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(401).json(response);
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred during login" 
        });
    }
};