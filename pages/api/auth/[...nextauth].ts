import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Adição essencial para produção
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // Credenciais fixas (apenas para desenvolvimento)
        if (
          credentials?.email === "admin@sosotorrino.com" &&
          credentials?.password === "123456"
        ) {
          return { 
            id: "1", 
            name: "Admin", 
            email: credentials.email 
          };
        }
        return null;
      }
    })
  ],
  
  pages: {
    signIn: "/login" // Página de login personalizada
  }
});