import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});


router.post("/", async (req, res) => {
  const { nome, codigo, preco, quantidade, categoria } = req.body;
  const produto = await prisma.produto.create({
    data: { nome, codigo, preco, quantidade, categoria },
  });
  res.json(produto);
});

//Editar quantidade
router.put("/:codigo/quantidade", async (req, res) => {
  const { codigo } = req.params
  const { ajuste } = req.body //ajuste pode ser positivo ou negativo

  if (typeof ajuste !=="number"){
    return res.status(400).json({ error: "Ajuste deve ser um número"})
  }

  try {
    const produto = await prisma.produto.findUnique({ where: { codigo } });
    
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Regra de negócio: não permitir estoque negativo
    if (produto.quantidade + ajuste < 0) {
      return res.status(400).json({ 
        error: "Operação inválida",
        message: `Quantidade não pode ficar negativa (estoque atual: ${produto.quantidade})`
      });
    }

    // Atualização segura
    const produtoAtualizado = await prisma.produto.update({
      where: { codigo },
      data: { quantidade: { increment: ajuste } },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar quantidade" });
  }
})

//Editar Produtos
router.put("/:codigo/editar", async (req, res) =>{
  const { codigo } = req.params
  const { nome, preco, quantidade, categoria } = req.body

  try{
    const produto = await prisma.produto.findUnique({ where: { codigo } })

    if(!produto) {
      return res.status(404).json({ error: "Produto não encontrado!" })
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { codigo },
      data: { nome, preco, quantidade, categoria}
    })  
    return res.json(produtoAtualizado)
  
  }
  catch (error){
    return res.status(500).json({ error: "Erro ao atualizar produto", details: error })
  }
  

})

router.delete("/:codigo/excluir", async (req, res) =>{
  const { codigo } = req.params

  try{
    const produto = await prisma.produto.findUnique({ where: { codigo } })

    if(!produto) {
      return res.status(404).json({ error: "produto não encontrado!" })
    }

    const produtoAtualizado = await prisma.produto.delete({
      where: { codigo }
    })
    return res.json(produtoAtualizado)
  }
  catch (error){
    console.error("Erro ao excluir produto:", error)
    res.status(500).json({ error: "Erro interno no servidor." })
  }
})

export default router;
