import express from "express";
import authenticate from "../middleware/authenticate.js";
import authorizeModification from "../middleware/authorize.js";


const router = express.Router();

router.use("/watchlist", authenticate);

router.get('/:userId',(req, res)=>{
    const id = req.params.userId;
    const watchlist = getWatchlist(id);
    
    res.status(200).json({watchlist});
})

router.post('/:userId/movies',authorizeModification,(req,res)=>{
    const id = req.params.userId;
    const watchlist = getWatchlist(id);

    

});


export default router;