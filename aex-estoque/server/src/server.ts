import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import produtoRouter from "./routes/produto"
import fornecedorRouter from "./routes/fornecedor"
import usuarioRouter from "./routes/usuarios"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/produtos", produtoRouter) // Use o router nomeado
app.use("/fornecedores", fornecedorRouter)
app.use("/usuarios", usuarioRouter)

app.get("/", (req, res) => {
  res.send("API do AEX Estoque rodando!")
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))