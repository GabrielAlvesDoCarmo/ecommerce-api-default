import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World!");
})

app.listen(3000, () => console.log("Server started on port 3000"));