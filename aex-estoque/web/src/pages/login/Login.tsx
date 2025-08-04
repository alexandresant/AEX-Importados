
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Form } from "../../components/ui/form"
import { Label } from "../../components/ui/label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import type { UserProps } from "../../types/types"

import logo from "../../assets/AEX-Logo.png"

export function Login(){
    const navigate = useNavigate()
    const auth = useAuth()
    
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loginSenha, setLoginSenha] = useState<UserProps[]>([])

    function conferirSenha(){
        loginSenha.find((l) =>{
            if(l.email === email && l.senha === senha){
                console.log("Olá: " + l.nome)
                auth.login()
                navigate("/dashboard")
                setEmail("")
                setSenha("")
            }
            else{
                console.log("Deu errado")
            }
        })

    }

    useEffect(() =>{
        fetch("http://192.168.100.44:3001/usuarios")
        .then(res => res.json())
        .then(data => setLoginSenha(data))
        .catch(err => console.error("Erro ao carregar usuarios", err))
    })


    return(
        <div className="flex items-center justify-center">
            
            <Card className="w-[350x]">
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
                        className="******"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Button 
                        className=" w-full mt-2"
                        onClick={() =>conferirSenha()}    
                    >
                        Login
                    </Button>

                    <a className="block text-sm text-center mt-2 underline" href="/cadastroUsuario">Não possui cadastro?</a>
                </CardContent>
                
            </Card>
        </div>
    )
}