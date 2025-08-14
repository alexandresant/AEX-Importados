"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import type { Produto } from "../../types/produto"

export function BaixoEstoqueTable(){
  const [produtos, setProdutos] = useState<Produto[]>([])

  const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5)

  useEffect(() =>{
    fetch("http://192.168.100.44:3001/produtos")
    .then(res => res.json())
    .then(data => setProdutos(data))
    .catch(err => console.error("Erro ao carregar produtos: " + err))
  })
  
  return(
      <Card>
        <CardHeader>
          <CardTitle>Produtos com estoque baixo</CardTitle>
          <CardDescription>Produtos que necessitam atenção</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">Codigo</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Qtd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosEstoqueBaixo.map((p) =>(
                <TableRow
                  key={p.codigo}
                >
                  <TableCell className="hidden md:table-cell">{p.codigo}</TableCell>
                  <TableCell>{p.nome}</TableCell>
                  <TableCell>{p.quantidade}</TableCell>                  
                </TableRow>
              ))}
              {produtosEstoqueBaixo.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>Nenhum produto com estoque baixo</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
}