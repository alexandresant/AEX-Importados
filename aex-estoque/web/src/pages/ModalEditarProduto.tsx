import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export function ShowModalEditar(props){
    console.log(props.value)
    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-2">
            <div className="bg-white rounded p-4 w-full max-w-md mx-2">
                <h2 className="text-xl font-bold mb-4">
                    Ajustar Estoque: {props.nomeEdit}
                </h2>

                <Input 
                    type="text" 
                    placeholder="Nome"
                    className="w-full px-3 py-2 mb-4"
                    value={props.nomeEdit}
                    onChange={(e) => props.setNomeEdit(e.target.value)}
                />
                <Input 
                    type="text"
                    placeholder="Preço"
                    className="w-full px-3 py-2 mb-4"
                    value={props.precoEdit}
                    onChange={(e) => props.setPrecoEdit(e.target.value)}
                />
                <Input
                    type="number"
                    min={1}
                    placeholder="Quantidade"
                    className="w-full border px-3 py-2 rounded mb-4"
                    value={props.quantEdit}
                    onChange={(e) => props.setQuantEdit(e.target.value)}
                />
                <select
                    className=""
                    value={props.categoriaEdit}
                    onChange={(e) => props.setCategoriaEdit(e.target.value)}
                >
                    <option value="">Selecione uma Categoria</option>
                    {props.categorias.map((categoria) =>(
                        <option
                            key={categoria}
                            value={categoria}
                        >
                            {categoria}
                        </option>
                    ))}
                    <option value="nova"> + Nova Categoria</option>
                </select> 

                {props.categoriaEdit === 'nova' && (
                    <input
                        type="text"
                        placeholder="Digite nova categoria"
                        className="w-full border px-3 py-2 rounded"
                        value={props.novaCategoria}
                        onChange={(e) => props.setNovaCategoria(e.target.value)}
                    />
                )}   

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={props.onCancel}
                        className="px-4 py-2 rounded border bg-gray-300 text-black hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={props.onConfirm}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Adicionar
                    </button>
                    <button
                        onClick={props.onClick}
                        
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}