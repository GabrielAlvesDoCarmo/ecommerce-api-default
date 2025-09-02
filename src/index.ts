import express from "express";

const app = express();
app.use(express.json());
type User = {
    id: number;
    name: string;
    email: string;
}

let id = 0
let usuarios: User[] = []

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello ----- World!");
})

app.get("/users", (req: express.Request, res: express.Response) => {
    res.status(200).send(usuarios);
})

app.get("/users/:id", (req: express.Request, res: express.Response) => {
    let userID = Number(req.params.id)
    let user = usuarios.find(user => user.id == userID)
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

app.put("/users/:id", (req: express.Request, res: express.Response) => {
    let userID = Number(req.params.id)
    let userChange = req.body
    let indexOf = usuarios.findIndex((_user: User)=> _user.id === userID);
    usuarios[indexOf].name = userChange.name
    usuarios[indexOf].email = userChange.email
    res.send({
        message: "Usuario alterado com sucesso"
    })
})

app.delete("/users/:id", (req: express.Request, res: express.Response) => {
    let userID = Number(req.params.id)
    let indexOf = usuarios.findIndex(user => user.id === userID)
    usuarios.splice(indexOf, 1)
    res.send({
        message: "Usuario deletado"
    })
})

app.listen(3000, () => console.log("Server started on port 3000"));