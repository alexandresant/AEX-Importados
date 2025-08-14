import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import type { ShowModalCadastroProps } from "../../types/types"

export function ShowModalCadastro({
  open,
  openChange,
  nome,
  setNome,
  preco,
  setPreco,
  quantidade,
  setQuantidade,
  categoriaSelecionada,
  setCategoriaSelecionada,
  novaCategoria,
  setNovaCategoria,
  categorias,
  fornecedores,
  fornecedorSelecionado,
  setFornecedorSelecionado,
  onConfirm,
  onCancel,
}: ShowModalCadastroProps) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
          <DialogDescription>Todos os campos são obrigatórios</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Nome */}
          <Input
            type="text"
            placeholder="Nome"
            className="w-full border px-3 py-2 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          
          {/* Preço */}
          <Input
            type="number"
            step={0.01}
            min={0}
            placeholder="Preço"
            className="w-full border px-3 py-2 rounded"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          {/* Quantidade */}
          <Input
            type="number"
            min={0}
            placeholder="Quantidade"
            className="w-full border px-3 py-2 rounded"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          {/* Categoria */}
          <Select value={categoriaSelecionada} onValueChange={setCategoriaSelecionada}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <SelectItem value="nova">+ Nova categoria</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {categoriaSelecionada === "nova" && (
            <Input
              type="text"
              placeholder="Digite nova categoria"
              className="w-full border px-3 py-2 rounded"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
            />
          )}

          {/* Fornecedor */}
          <Select
            value={fornecedorSelecionado}
            onValueChange={setFornecedorSelecionado}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um fornecedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fornecedores.map((f) => (
                  <SelectItem key={f.id} value={f.id.toString()}>
                    {f.nome}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Botões */}
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirmar
            </Button>
            <Button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
