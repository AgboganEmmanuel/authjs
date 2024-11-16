"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

export function LogIn() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setError(null);
  
    try {
      // Vérifier si l'utilisateur existe
      const checkUser = await fetch(`/api/user/check?email=${data.email}`);
      const userData = await checkUser.json();
  
      if (!userData.exists) {
        setError("Aucun utilisateur trouvé avec cet email");
        return;
      }
  
      // Vérifier le mot de passe
      const checkPassword = await fetch('/api/user/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });
      const passwordData = await checkPassword.json();
  
      if (!passwordData.isValid) {
        setError("Mot de passe incorrect");
        return;
      }
  
      // Tenter la connexion avec NextAuth
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });
  
      if (!result?.ok) {
        setError("Une erreur est survenue lors de la connexion");
        return;
      }
  
      router.push('/');
      router.refresh();
  
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError("Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>
    </div>
  );
}