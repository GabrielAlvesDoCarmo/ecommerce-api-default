import express from "express";

const app = express();
app.use(express.json());

let id = 0
let usuarios : {id: number, name: string, email: string}[] = []

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello ----- World!");
})

app.get("/users", (req: express.Request, res: express.Response) => {
    res.status(200).send(usuarios);
})

app.get("/users/:id",(req: express.Request, res: express.Response) => {
    let userID = Number(req.params.id)
    let user = usuarios.find(user => user.id == userID )
    res.send(user);
})

app.post("/users", (req: express.Request, res: express.Response) => {
    let reqUsers = req.body
    reqUsers.id = ++id;
    usuarios.push(reqUsers)
    res.send({
        message: "Usuario adicionado com sucesso"
    })
})

app.listen(3000, () => console.log("Server started on port 3000"));