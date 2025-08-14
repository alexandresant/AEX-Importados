
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import type { UserProps } from "../../types/types"
//import { Link } from "react-router-dom"

import logo from "../../assets/AEX-Logo.png"

export function Login(){
    const navigate = useNavigate()
    const auth = useAuth()
    
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loginSenha, setLoginSenha] = useState<UserProps[]>([])

    const [login, setLogin] = useState(true)

    function conferirSenha(){
        loginSenha.find((l) =>{
            if(l.email === email && l.senha === senha){
            console.log("Olá: " + l.nome + "Id: " + l.id)
                auth.login()
                navigate("/dashboard")
                setEmail("")
                setSenha("")
                localStorage.setItem("usuarioId", l.id)
                setLogin(true)
            }
            else{
                setLogin(false)
            }
        })

    }

    useEffect(() =>{
        fetch(`${import.meta.env.VITE_API_URL}/usuarios`)
        .then(res => res.json())
        .then(data => setLoginSenha(data))
        .catch(err => console.error("Erro ao carregar usuarios", err))
    })


    return(
        <div className="flex items-center justify-center">
            
            <Card className="w-[300px] md:w-[550px]">
                <img src={logo} alt="logo-aeximportados" className="w-[100px] mx-auto mt-4" />
                <CardHeader>
                    <CardTitle >Login</CardTitle>
                    <CardDescription>Faça login para ter acesso</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label>Email</Label>
                    <Input 
                        type="text"
                        className="exemplo@exemplo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        placeholder="******"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Button 
                        className=" w-full mt-2 bg-blue-700 hover:bg-blue-600"
                        onClick={() =>conferirSenha()}    
                    >
                        Login
                    </Button>
                    {!login &&
                        <p className="text-red-600 text-center">Login ou senha incorretos</p>
                    }
                    {/*<Link className="block text-sm text-center mt-2 underline text-muted-foreground" to="/cadastroUsuario">Não possui cadastro?</Link>*/}
                </CardContent>
                
            </Card>
        </div>
    )
}