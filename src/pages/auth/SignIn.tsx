
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Seção de Login (Esquerda) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-church-primary">Nome da Igreja</h1>
            <p className="text-church-secondary mt-2">Sistema de Gestão</p>
          </div>

          <Card className="border-church-border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Bem-vindo de volta!</CardTitle>
              <CardDescription>
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
                  <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-church-accent hover:underline">
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-church-accent hover:bg-church-accent/90">
                    Entrar
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seção de Call-to-Action (Direita) */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-church-primary to-church-accent flex items-center justify-center p-6 md:p-12 text-white">
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforme a gestão da sua igreja</h2>
          <p className="text-lg mb-6">
            Organize membros, eventos, finanças e muito mais em uma única plataforma poderosa.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Gestão de Membros</h3>
                <p className="opacity-90">Cadastre membros, visitantes e acompanhe suas jornadas espirituais.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Lock className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Controle Total</h3>
                <p className="opacity-90">Tenha acesso a relatórios detalhados e tomadas de decisão baseadas em dados.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="font-medium text-xl mb-4">Ainda não tem uma conta?</p>
            <p className="mb-6">Conheça nossos planos e comece a transformar a gestão da sua igreja hoje mesmo.</p>
            <Button variant="outline" className="w-full bg-white text-church-primary hover:bg-white/90 border-0" asChild>
              <Link to="/plans">Conheça nossos planos</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
