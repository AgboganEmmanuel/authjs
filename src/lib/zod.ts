import { z } from "zod"

// Schéma pour les credentials de connexion
export const loginSchema = z.object({
  email: z.string()
    .email("L'email est invalide")
    .min(5, "L'email est trop court")
    .max(100, "L'email est trop long"),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(100, "Le mot de passe est trop long")
})

// Schéma pour l'inscription (extends loginSchema avec des champs supplémentaires)
export const registerSchema = loginSchema.extend({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom est trop long"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
})

// Types inférés à partir des schémas
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>

// Schéma pour la réinitialisation du mot de passe
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(100, "Le mot de passe est trop long"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
})