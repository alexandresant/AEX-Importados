import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async(req, res) =>{
    const usuarios =  await prisma.usuario.findMany()
    res.json(usuarios)
})

//Salvar Usuários
router.post("/", async(req, res) =>{
    const { nome, email, senha } = req.body
    const usuario =  await prisma.usuario.create({
        data: { nome, email, senha }
    })
    res.json(usuario)
})

export default router