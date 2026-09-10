import express from "express";
import { findById, findByUsername, getWatchlist } from "../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/authenticate.js";
import authorizeModification from "../middleware/authorize.js";


const router = express.Router();


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Username and password are required"
        });
    }

    const user = findByUsername(username);

    if (!user) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    const match = bcrypt.compareSync(password, user.passwordHash);

    if (!match) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    const payload = {
        id: user.id,
        role: user.role,
        name: user.name,
        username: user.username
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return res.status(200).json({ token });
});

router.use("/watchlist", authenticate);

router.get('/watchlist/:userId',(req, res)=>{
    const id = req.params.id;
    const watchlist = getWatchlist(id);
    
    res.status(200).json({watchlist});
})

router.post('/watchlist/:userId/movies',authorizeModification,(req,res)=>{
    const id = req.params.id;
    const watchlist = getWatchlist(id);

    

})

export default router;
