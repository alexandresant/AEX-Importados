import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { error } from "console"

const router = Router()
const prisma = new PrismaClient()

//Buscar estoque
router.get("/", async (req, res) => {
    const estoque = await prisma.estoque.findMany({
        include: {
            produto: {
                select: {
                    nome: true,
                    preco: true
                }
            },
            usuario: {
                select: {
                    nome: true
                }
            }
        }
    })
    res.json(estoque)
})

router.post("/", async (req, res) =>{
    const { produtoId, quantidade, tipoMovimentacao, motivoEntrada, motivoSaida, usuarioId } = req.body
    const estoque = await prisma.estoque.create({
        data: { produtoId, quantidade, tipoMovimentacao, motivoEntrada, motivoSaida, usuarioId },
        include: {
            produto: true,
            usuario: true
        }
    })
    res.json(estoque)
})
export default router