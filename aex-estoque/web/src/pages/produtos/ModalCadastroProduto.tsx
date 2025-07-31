import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select" 

export function ShowModalCadastro(props){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-2">
            <div className="bg-white rounded p-4 w-full max-w-md mx-2">
                <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>
                <div className="space-y-3">
                    <Input 
                        type="text" 
                        placeholder="Nome"
                        className="w-full border px-3 py-2 rounded"    
                        value={props.nome}
                        onChange={(e) => props.setNome(e.target.value)}
                    />

                    <Input 
                        type="number" 
                        step={0.01}
                        min={0}
                        placeholder="Preço"
                        className="w-full border px-3 py-2 rounded"
                        value={props.preco}
                        onChange={(e) => props.setPreco(e.target.value)}
                    />

                    <Input 
                        type="number" 
                        min={0}
                        placeholder="Quantidade"
                        className="w-full border px-3 py-2 rounded"
                        value={props.quantidade}
                        onChange={(e) => props.setQuantidade(e.target.value)}
                    />
                    
                    <Select
                        value={props.categoriaSelecionada}
                        onValueChange={(e) => props.setCategoriaSelecionada(e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Categoria"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {props.categorias.map((cat) =>(
                                    <SelectItem
                                        key={cat}
                                        value={cat}
                                    >
                                        {cat}
                                    </SelectItem>
                                ))}
                                <SelectItem value="nova">+ Nova categoria</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {props.categoriaSelecionada === 'nova' && (
                        <Input
                            type="text"
                            placeholder="Digite nova categoria"
                            className=" border px-3 py-2 rounded"
                            value={props.novaCategoria}
                            onChange={(e) => props.setNovaCategoria(e.target.value)}
                        />
                    )}
                    <div className="flex justify-end space-x-2">
                        <Button
                            onClick={props.onCancel}
                            className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 border-gray-300"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={props.onConfirm}
                            className="px-4 py-2 rounded text-white bg-blue-600  hover:bg-blue-700 "
                        >
                            Confirmar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}