// app/components/AppBar.tsx
import Link from 'next/link'
import SearchBar from './SearchBar'
import styles from './AppBar.module.css'
import Image from 'next/image'

const AppBar = () => {
    return (
        <header className={styles.appBar}>
            <nav className={styles.nav}>
                <div className={styles.iconContainer}>
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/images/JP-logo.png"
                            alt="Juris Pros"
                            width={120}
                            height={40}
                            className={styles.logo}
                        />
                    </Link>
                </div>
                <SearchBar />
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/compte">Deconnexion</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppBar
