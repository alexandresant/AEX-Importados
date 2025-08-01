import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) =>{
    const fornecedores = await prisma.fornecedor.findMany()
    res.json(fornecedores)
})

//Enviar(Salvar)  fornecedores
router.post("/", async (req, res)=>{
    const { nome, codigo, contato, telefone, email } = req.body
    const fornecedor = await prisma.fornecedor.create({
        data: { nome, codigo, contato, telefone, email }
    })
    res.json(fornecedor)
})

//Editar Fornecedores
router.put("/:codigo/editar", async(req, res) =>{
    const { codigo } = req.params
    const { nome, contato, telefone, email } = req.body

    try{
        const fornecedor = await prisma.fornecedor.findUnique({  where: { codigo }})

        if(!fornecedor){
            return(
                res.status(404).json({ error: "Fornecedor não encontrado!" })
            ) 
        }

        const fornecedorAtualizado = await prisma.fornecedor.update({
            where: { codigo },
            data: { nome, contato, telefone, email }
        })
        return(
            res.json(fornecedorAtualizado)
        )
    }
    catch(error){
        return(
            res.status(500).json({ error: "Erro ao atualizar fornecedor", details: error })
        )
    }
})

//Excluir fornecedor
router.delete("/:codigo/excluir", async(req, res) =>{
    const { codigo } = req.params

    try{
        const fornecedor = await prisma.fornecedor.findUnique({ where: { codigo } })

        if(!fornecedor){
            return(
                res.status(404).json({ error: "Fornecedor não encontrado!" })
            )
        }
        const fornecedorAtualizado = await prisma.fornecedor.delete({
            where: { codigo }
        })
        return(
            res.json(fornecedorAtualizado)
        )
    }
    catch(error){
        console.error("Erro ao excluir fornecedor!")
        res.status(500).json({ error: "Erro interno no servidor!" })
    }
})


export default router