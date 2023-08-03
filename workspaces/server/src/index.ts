import {APP_TITLE} from "@scribbr-assessment-full-stack/common";
import express from "express";
import {join} from "path";
import {MovieHandler} from "@scribbr-assessment-full-stack/server/src/lib/MovieHandler";
import bodyParser from "body-parser";

const PORT = 3000;

const movieHandler = new MovieHandler();

const app = express();

app.use(bodyParser.json());

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(join(__dirname, "../../client/public")));


async function start() {
    await movieHandler.init();

    app.post('/movie/like', async (req, res) => {
        const input = req.body;
        console.log('Looking up movies for input: ' + JSON.stringify(input, null, 4))

        await movieHandler.voteOnMovie(input);

        // const movies = await movieHandler.lookupMovies(input);
        res.send(201);
        // res.send(movies);
    });

    app.get('/movie/my-likes', async (req, res) => {
       res.send(movieHandler.movies);
    });

    app.get('/movie/lookup/:input', async (req, res) => {
        const input = req.params.input;
        console.log('Looking up movies for input: ' + input)

        const movies = await movieHandler.lookupMovies(input);

        res.send(movies);
    });

    // Serve the HTML page
    app.get("*", (req, res) => {
        res.sendFile(join(__dirname, "../../client/public", "index.html"));
    });

    app.listen(PORT, () => {
        console.log(`${APP_TITLE}'s server listening at http://localhost:${PORT}`);
    });
}

start()