import { Router } from "express";
import { PrismaClient } from "@prisma/client";

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

export default router;
