import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import type { ShowModalEditarProps } from "../../types/types";

export function ShowModalEditar({
  open,
  openChange,
  nomeEdit,
  setNomeEdit,
  precoEdit,
  setPrecoEdit,
  //quantEdit,
  //setQuantEdit,
  categoriaEdit,
  setCategoriaEdit,
  novaCategoria,
  setNovaCategoria,
  categorias,
  fornecedores,
  fornecedorEdit,
  setFornecedorEdit,
  onConfirm,
  onClick,
  onCancel,
}: ShowModalEditarProps) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Ajustar Estoque: {nomeEdit}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          {/* Nome */}
          <Label>Nome</Label>
          <Input
            type="text"
            placeholder="Nome do produto"
            value={nomeEdit}
            onChange={(e) => setNomeEdit(e.target.value)}
          />

          {/* Preço */}
          <Label>Preço</Label>
          <Input
            type="number"
            placeholder="Preço"
            min={0}
            step={0.01}
            value={precoEdit}
            onChange={(e) => setPrecoEdit(e.target.value)}
          />

          {/* Quantidade 
          <Label>Quantidade</Label>
          <Input
            type="number"
            placeholder="Quantidade"
            min={0}
            step={1}
            value={quantEdit}
            onChange={(e) => setQuantEdit(e.target.value)}
          />*/}

          {/* Categoria */}
          <Label>Categoria</Label>
          <Select value={categoriaEdit} onValueChange={setCategoriaEdit}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {categoriaEdit === "nova" && (
            <Input
              type="text"
              placeholder="Digite nova categoria"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
            />
          )}

          {/* Fornecedor */}
          <Label>Fornecedor</Label>
          <Select value={fornecedorEdit} onValueChange={setFornecedorEdit}>
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
        </div>

        {/* Botões */}
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Salvar
          </Button>
          <Button
            onClick={onClick}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
