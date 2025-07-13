import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // Exemplo: usuário fixo (substitua por sua lógica de autenticação)
        if (
          credentials?.email === "admin@sosotorrino.com" &&
          credentials?.password === "123456"
        ) {
          return { id: "1", name: "Admin", email: credentials.email }
        }
        // Se não encontrar, retorna null
        return null
      }
    })
  ],
  pages: {
    signIn: "/login"
  }
})