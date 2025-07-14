import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) =>{
    const fornecedores = await prisma.fornecedor.findMany()
    res.json(fornecedores)
})

router.post("/", async (req, res)=>{
    const { nome, codigo, contato, telefone, email } = req.body
    const fornecedor = await prisma.fornecedor.create({
        data: { nome, codigo, contato, telefone, email }
    })
    res.json(fornecedor)
})

export default router