import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import styles from '../styles/login.module.css'

export default function Login({ notionIcon }: { notionIcon?: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/")
    }
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })
    if (res?.error) {
      setError('Usuário ou senha inválidos.')
    } else {
      router.push('/')
    }
  }

  if (status === "loading") return <div>Carregando...</div>
  if (status === "authenticated") return null

  return (
    <div className={styles.container}>
      <img
        src={'https://static.wixstatic.com/media/5a343c_14205de19f6c4f3f883d490d203b19ce~mv2.png/v1/fill/w_177,h_177,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/png%20sos.png'} // coloque a URL da imagem desejada aqui
        alt="Logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>
        Intranet
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  )
}