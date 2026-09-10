import express from "express";
import {authenticate} from "../middleware/authenticate.js"
import { authorizeModification } from "../middleware/authorize.js"
import { getWatchlist, addMovie } from "../utils/db.js";

const router = express.Router();

router.use(authenticate);
router.use('/:userId/movies',authorizeModification)

router.get('/:userId',(req, res)=>{
    const id = Number(req.params.userId);
    const watchlist = getWatchlist(id);
    
    res.status(200).json({watchlist});
})

router.post('/:userId/movies', (req, res) => {
    const id = Number(req.params.userId);

    const movie = addMovie(id, req.body);

    if (!movie) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    res.status(201).json(movie);
});


export default router;