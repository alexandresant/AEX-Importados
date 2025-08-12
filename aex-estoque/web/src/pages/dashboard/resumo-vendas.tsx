"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { EstoqueProps } from "../../types/types"

export function ResumoVendas(){
    const [estoque, setEstoque] = useState<EstoqueProps[]>([])
    
    useEffect(() =>{
      fetch("http://192.168.100.44:3001/estoque")
      .then(res => res.json())
      .then(data => setEstoque(data))
      .catch(err => console.error("Erro ao carregar produtos:", err))
    })

    const vendas = estoque.filter(venda => venda.motivoSaida == "VENDA")
  return(
        <Card>
            <CardHeader>
                <CardTitle>Resumo de vendas</CardTitle>
                <CardDescription>Resumo das últimas vendas</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">Data</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead className="hidden md:table-cell">Valor</TableHead>
                            <TableHead className="text-center">Qtd</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                        <TableBody>
                            {vendas.map((v) => {
                                const dataCompleta = v.dataMovimentacao
                                const dataApenas = dataCompleta.split('T')[0]

                                const [ano, mes, dia] = dataApenas.split('-')

                                return(
                                    <TableRow
                                    key={v.id}
                                    >
                                        <TableCell className="hidden md:table-cell">{dataApenas}</TableCell> 
                                        <TableCell>{v.produto?.nome}</TableCell>                                                          
                                        <TableCell className="hidden md:table-cell">R$ {v.produto?.preco.toFixed(2)}</TableCell>
                                        <TableCell className="text-center">{v.quantidade}</TableCell>
                                        <TableCell>R$ {(v.quantidade * v.produto?.preco).toFixed(2)}</TableCell>
                                    </TableRow>
                                )
                                
                            })}
                            {vendas.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={3}>Sem vendas para o período</TableCell>
                              </TableRow>
                            )}
                        </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}