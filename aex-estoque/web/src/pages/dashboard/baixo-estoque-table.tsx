"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

 const produtos = [
  {
    "id": 1,
    "nome": "Fone de Ouvido Bluetooth TWS",
    "codigo": "FONE-BT-001",
    "preco": 299.90,
    "quantidade": 15,
    "categoria": "Áudio",
    "fornecedor": "TechSound Imports"
  },
  {
    "id": 2,
    "nome": "Mouse Óptico Gamer RGB",
    "codigo": "MOUSE-RGB-003",
    "preco": 89.50,
    "quantidade": 8,
    "categoria": "Periféricos",
    "fornecedor": "GamingGear Global"
  },
  {
    "id": 3,
    "nome": "Carregador Portátil 10000mAh",
    "codigo": "POWERBANK-10K",
    "preco": 125.00,
    "quantidade": 2,
    "categoria": "Acessórios",
    "fornecedor": "PowerUp Eletronics"
  },
  {
    "id": 4,
    "nome": "Teclado Mecânico RGB",
    "codigo": "TECLADO-MEC-002",
    "preco": 499.90,
    "quantidade": 12,
    "categoria": "Periféricos",
    "fornecedor": "GamingGear Global"
  },
  {
    "id": 5,
    "nome": "Hub USB 3.0 4 Portas",
    "codigo": "HUB-USB-004",
    "preco": 75.00,
    "quantidade": 20,
    "categoria": "Acessórios",
    "fornecedor": "TechConnect Imports"
  },
  {
    "id": 6,
    "nome": "Suporte de Celular para Carro",
    "codigo": "SUPORTE-CARRO-001",
    "preco": 35.00,
    "quantidade": 5,
    "categoria": "Acessórios",
    "fornecedor": "MobileFix Supply"
  },
  {
    "id": 7,
    "nome": "Película de Vidro iPhone 15",
    "codigo": "PELICULA-IP15",
    "preco": 19.99,
    "quantidade": 0,
    "categoria": "Acessórios",
    "fornecedor": "Protect Screen"
  },
  {
    "id": 8,
    "nome": "Webcam Full HD 1080p",
    "codigo": "WEBCAM-HD-001",
    "preco": 79.90,
    "quantidade": 3,
    "categoria": "Periféricos",
    "fornecedor": "VideoLink Solutions"
  },
  {
    "id": 9,
    "nome": "Cabo USB-C 2 metros",
    "codigo": "CABO-USBC-005",
    "preco": 22.50,
    "quantidade": 18,
    "categoria": "Acessórios",
    "fornecedor": "TechConnect Imports"
  },
  {
    "id": 10,
    "nome": "Caixa de Som Portátil Bluetooth",
    "codigo": "SPEAKER-BT-002",
    "preco": 149.90,
    "quantidade": 7,
    "categoria": "Áudio",
    "fornecedor": "SoundWave Imports"
  }
]

export function BaixoEstoqueTable(){
    const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5)

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
                  <TableCell colSpan={3}>Nenhum produto com estoque</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
}