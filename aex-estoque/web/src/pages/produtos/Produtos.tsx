"use client"

import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

import { ShowModalCadastro } from "./ModalCadastroProduto"
import { ShowModalEditar } from "./ModalEditarProduto"

import type { Fornecedor } from "../../types/fornecedores"
import type { Produto } from "../../types/types"

export function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );

  // Campos cadastro
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const categoriasBase = [
    "Eletrônico",
    "Acessórios",
    "Vestuário",
    "Beleza",
    "Periféricos",
  ];
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [categorias, setCategorias] = useState<string[]>(categoriasBase);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState("");

  // Campos edição
  const [nomeEdit, setNomeEdit] = useState("");
  const [precoEdit, setPrecoEdit] = useState("");
  const [quantEdit, setQuantEdit] = useState("");
  const [categoriaEdit, setCategoriaEdit] = useState("");
  const [fornecedorEdit, setFornecedorEdit] = useState("");

  // Filtra produtos
  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  function gerarCodigoProduto() {
    return `PROD-${Date.now()}`;
  }

  async function cadastrarProduto() {
    if (!nome || !preco || !quantidade) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const categoriaFinal =
      categoriaSelecionada === "nova" ? novaCategoria.trim() : categoriaSelecionada;

    if (!categoriaFinal) {
      alert("Informe a categoria");
      return;
    }

    if (!categorias.includes(categoriaFinal)) {
      setCategorias([...categorias, categoriaFinal]);
    }

    if (isNaN(Number(preco)) || Number(preco) <= 0) {
      alert("Preço deve ser número maior que zero");
      return;
    }

    if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 0) {
      alert("Quantidade deve ser um número inteiro ou maior que zero");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          preco: Number(preco),
          quantidade: Number(quantidade),
          categoria: categoriaFinal,
          codigo: gerarCodigoProduto(),
          fornecedorId: Number(fornecedorSelecionado),
        }),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar produto");

      const produtoCriado = await response.json();
      setProdutos((prev) => [...prev, produtoCriado]);
      setShowModalCadastro(false);
      limparFormularioCadastro();
    } catch (error) {
      alert("Falha ao cadastrar produto: " + error);
    }
  }

  function limparFormularioCadastro() {
    setNome("");
    setPreco("");
    setQuantidade("");
    setCategoriaSelecionada("");
    setNovaCategoria("");
    setFornecedorSelecionado("");
  }

  function limparFormularioEditar() {
    setNomeEdit("");
    setPrecoEdit("");
    setQuantEdit("");
    setCategoriaEdit("");
    setFornecedorEdit("");
  }

  function abrirEditarProduto(p: Produto) {
    setProdutoSelecionado(p);
    setNomeEdit(p.nome);
    setPrecoEdit(p.preco.toString());
    setQuantEdit(p.quantidade.toString());
    setCategoriaEdit(p.categoria);
    setFornecedorEdit(p.fornecedor?.id.toString() || "");
    setShowModalEditar(true);
  }

  async function excluirProduto() {
    if (!produtoSelecionado) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/produtos/${produtoSelecionado.codigo}/excluir`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Falha ao excluir produto");

      setProdutos((prev) =>
        prev.filter((p) => p.codigo !== produtoSelecionado.codigo)
      );

      limparFormularioEditar();
      setShowModalEditar(false);
      setProdutoSelecionado(null);
    } catch (error) {
      alert("Erro ao excluir produto: " + error);
    }
  }

  async function confirmarEdicao() {
    if (!produtoSelecionado) return;

    const precoAjuste = parseFloat(precoEdit);

    if (!nomeEdit || !precoAjuste || precoAjuste <= 0 || !categoriaEdit || !fornecedorEdit) {
      alert("Preencha todos os campos corretamente");
      return;
    }
    const produtoEditado: Partial<Produto> = {
      nome: nomeEdit,
      preco: precoAjuste,
      categoria: categoriaEdit,
      fornecedorId: fornecedorEdit ? Number(fornecedorEdit) : undefined,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/${produtoSelecionado.codigo}/editar`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(produtoEditado),
        }
      );

      if (!res.ok) throw new Error("Falha ao atualizar produto");

      const produtoAtualizado = await res.json();

      const fornecedorCompleto = fornecedores.find(
        (f) => f.id === produtoAtualizado.fornecedorId
      );

      const produtoFinal = {
        ...produtoAtualizado,
        fornecedor: fornecedorCompleto || null, // Garante que a propriedade `fornecedor` existe
      };

      setProdutos((prev) =>
        prev.map((p) =>
          p.codigo === produtoFinal.codigo ? produtoFinal : p
        )
      );

      limparFormularioEditar();
      setShowModalEditar(false);
      setProdutoSelecionado(null);
    } catch (error) {
      alert("Erro ao atualizar produto: " + error);
    }
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/produtos`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/fornecedores`)
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch((err) => console.error("Erro ao carregar fornecedores:", err));
  }, []);

  return (
    <div className="bg-white rounded-lg p-2 max-w-full mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button
          onClick={() => setShowModalCadastro(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Novo Produto
        </Button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome, código ou categoria"
        className="w-full border px-3 py-2 rounded mb-4"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </TableHead>
                <TableHead className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </TableHead>
                <TableHead className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estoque
                </TableHead>
                <TableHead className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </TableHead>
                <TableHead className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fornecedor
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {produtosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              ) : (
                produtosFiltrados.map((p) => (
                  <TableRow key={p.id} className="hover:bg-gray-50">
                    <TableCell className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {p.nome}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell px-4 py-3 text-sm text-gray-900">
                      {p.codigo}
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-4 py-3 text-sm text-gray-900">
                      R$ {p.preco.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          p.quantidade > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.quantidade}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3 text-sm text-gray-900">
                      {p.categoria}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3 text-sm text-gray-900">
                      {p.fornecedor?.nome}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right text-sm font-medium">
                      <Button
                        onClick={() => abrirEditarProduto(p)}
                        className="bg-blue-600"
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {showModalCadastro && (
        <ShowModalCadastro
          open={showModalCadastro}
          openChange={(isOpen) => {
            setShowModalCadastro(isOpen);
            if (!isOpen) limparFormularioCadastro();
          }}
          nome={nome}
          setNome={setNome}
          preco={preco}
          setPreco={setPreco}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          novaCategoria={novaCategoria}
          setNovaCategoria={setNovaCategoria}
          categorias={categorias}
          setCategorias={setCategorias}
          fornecedores={fornecedores}
          fornecedorSelecionado={fornecedorSelecionado}
          setFornecedorSelecionado={setFornecedorSelecionado}
          onConfirm={cadastrarProduto}
          onCancel={() => setShowModalCadastro(false)}
        />
      )}

      {showModalEditar && produtoSelecionado && (
        <ShowModalEditar
          open={showModalEditar}
          openChange={(isOpen) => {
            setShowModalEditar(isOpen);
            if (!isOpen) limparFormularioEditar();
          }}
          nomeEdit={nomeEdit}
          setNomeEdit={setNomeEdit}
          precoEdit={precoEdit}
          setPrecoEdit={setPrecoEdit}
          //quantEdit={quantEdit}
          //setQuantEdit={setQuantEdit}
          categoriaEdit={categoriaEdit}
          setCategoriaEdit={setCategoriaEdit}
          novaCategoria={novaCategoria}
          setNovaCategoria={setNovaCategoria}
          categorias={categorias}
          fornecedorEdit={fornecedorEdit}
          setFornecedorEdit={setFornecedorEdit}
          fornecedores={fornecedores}
          onConfirm={confirmarEdicao}
          onClick={excluirProduto}
          onCancel={() => setShowModalEditar(false)}
        />
      )}
    </div>
  );
}
