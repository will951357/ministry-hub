
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

// Definindo o esquema de validação com Zod
const formSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

const SignIn = () => {
  const { toast } = useToast();
  
  // Inicializando o formulário com react-hook-form e validação com zod
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Função para lidar com o envio do formulário
  const onSubmit = (data: FormData) => {
    // Aqui você implementaria a lógica de autenticação
    console.log("Dados de login:", data);
    toast({
      title: "Login em desenvolvimento",
      description: "Funcionalidade de login será implementada em breve.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-church-background-light p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-church-primary">Nome da Igreja</h1>
          <p className="text-church-secondary mt-2">Sistema de Gestão</p>
        </div>

        <Card className="border-church-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Entre com seu email e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            placeholder="seu@email.com" 
                            type="email" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            placeholder="******" 
                            type="password" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-church-accent hover:bg-church-accent/90">
                  Entrar
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-church-accent hover:underline">
                Esqueceu sua senha?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-center text-sm">
              Ainda não tem uma conta?
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/plans">Conheça nossos planos</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
