import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserProps } from "../../types/types"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import logo from "../../assets/AEX-Logo.png"

const formSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email é obrigatório"),
    senha: z.string().min(6, "Senha é obrigatorio, e deve ter no mínimo 6 caracteres")
})

export function CadastroUsuarios(){
    const navigate =  useNavigate()


    type CadastroFormData = z.infer<typeof formSchema>

    const form = useForm<CadastroFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            senha: ""
        },
    })

    function onSubmit(data: CadastroFormData){
       //console.log("Usuário Cadastrado", data)
        cadastrarUsuarios(data)
        form.reset()

        navigate("/login")
    }
    async function cadastrarUsuarios(data: CadastroFormData){
        try{
            const response = await fetch("http://192.168.100.44:3001/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha
                })
            })

            if(!response){
                throw new Error("Erro ao cadastrar usuário")
            }
        }
        catch(error){
            alert("Falha ao cadastrar Usuaŕio" + error)
        }
    }
    return(
        <div className="flex items-center justify-center">
            <Card className="w-[300px] md:w-[550px]">
                <img src={logo} className="w-[100px] mx-auto mt-4"/>
                <CardHeader>
                    <CardTitle>Cadastro de Usuário</CardTitle>
                    <CardDescription>Preencha todos os campos para se cadastrar</CardDescription>
                    
                </CardHeader>
                
                <CardContent>
                    <Form 
                        {...form}
                    >
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <FormField 
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Nome"
                                                {... field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="exemplo@exemplo"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="senha"
                                render={({ field }) =>(
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Senha"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full mt-2 bg-blue-700">Cadastrar</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}