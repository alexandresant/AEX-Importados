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
                    preco: true,
                    quantidade:true
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

// Registrar movimentação de estoque com validação
router.post("/", async (req, res) =>{
    const { produtoId, quantidade, tipoMovimentacao, motivoEntrada, motivoSaida, usuarioId } = req.body
    if (!produtoId || !quantidade || tipoMovimentacao || !usuarioId){
        return(
            res.status(400).json({ error: "Dados obrigatórios faltando" })
        )
    }
    try{
        const produto = await prisma.produto.findUnique({ where: {id: produtoId} })
        if (!produto){
            return(
                res.status(404).json({ error: "Produto não encontrado" })
            )
        }

         // Se for saída, verifica estoque
        if (tipoMovimentacao == "SAIDA" && produto.quantidade < quantidade){
            return(
                res.status(400).json({
                    error: "Estoque insuficiente",
                    message: `Quantidade disponível: ${produto.quantidade}`
                })
            )
        }
        // Atualiza quantidade
        await prisma.produto.update({
            where: {id: produtoId},
            data: {
                quantidade: {
                    increment: tipoMovimentacao === "ENTRADA" ? quantidade : -quantidade
                }
            }
        })
        
        // Registra movimentação
        const movimentacao = await prisma.estoque.create({
            data: { produtoId, quantidade, tipoMovimentacao, motivoEntrada, motivoSaida, usuarioId},
            include: {
                produto: true,
                usuario: true
            }
        })
        res.json(movimentacao)
    }
    catch (error) {
        console.error("Erro ao registra movimentação", error)
        res.status(500).json({ error: "Erro interno no servidor" })
    }
})
export default router