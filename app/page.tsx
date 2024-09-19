import Head from 'next/head'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Projet Dev</title>
        <meta name="description" content="Page d'accueil du projet Development" />
        <link rel="icon" href="/public/images/JP-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.layout}>
        {/* Bandeau à gauche */}
        <aside className={styles.sidebar}>
          <h2>Options</h2>
          <label htmlFor="select-option">Choisissez une option :</label>
          <select id="select-option" name="options">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" name="checkbox1" /> Option 1
            </label>
            <label>
              <input type="checkbox" name="checkbox2" /> Option 2
            </label>
            <label>
              <input type="checkbox" name="checkbox3" /> Option 3
            </label>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className={styles.main}>
          <h1 className={styles.title}>Projet Development</h1>
        </main>
      </div>

      <footer className={styles.footer}>
        <p>Développé avec Next.js</p>
      </footer>
    </div>
  )
}
