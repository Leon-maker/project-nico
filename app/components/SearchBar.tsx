// app/components/SearchBar.tsx
'use client'

import { useState } from 'react'
import styles from './SearchBar.module.css'

const SearchBar = () => {
    const [query, setQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Recherche pour:', query)
    }

    return (
        <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
                type="search"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12.035" height="12.039" viewBox="0 0 19.035 19.039">
                    <path id="Tracé_26867" data-name="Tracé 26867" d="M25.834,24.239l-3.659-3.659a8.4,8.4,0,1,0-1.6,1.6l3.659,3.659a1.128,1.128,0,0,0,1.6-1.6Zm-14.658-4.4a6.127,6.127,0,1,1,4.332,1.795A6.134,6.134,0,0,1,11.176,19.841Z" transform="translate(-7.129 -7.125)" />
                </svg>
            </button>
        </form>
    )
}

export default SearchBar
