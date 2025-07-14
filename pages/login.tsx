import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

  // Efeito para aplicar o tema ao carregar e quando muda
  useEffect(() => {
    // Verificar preferência do sistema ou localStorage
    const savedMode = localStorage.getItem('theme') === 'dark'
    setIsDarkMode(savedMode)
    
    // Aplicar tema ao body
    if (savedMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Atualizar tema quando isDarkMode muda
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push('/')
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.themeToggle}>
        <button 
          onClick={toggleTheme}
          className={styles.toggleButton}
          aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <img
        src={'https://static.wixstatic.com/media/5a343c_14205de19f6c4f3f883d490d203b19ce~mv2.png/v1/fill/w_177,h_177,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/png%20sos.png'}
        alt="Logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>
        Intranet
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail (qualquer valor)"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Senha (qualquer valor)"
          onKeyPress={handleKeyPress}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  )
}