'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import Head from 'next/head';
import styles from './page.module.css';
import testData from '../data/testData.json';

export default function Home() {
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('');
  const [showDatePopup, setShowDatePopup] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const numberOfResults = testData.length;

  const handleDateFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDateFilter(event.target.value);
    if (event.target.value === 'datesPrecises') {
      setShowDatePopup(true);
    } else {
      setShowDatePopup(false);
    }
  };

  const handleDatePopupClose = (event: MouseEvent<HTMLButtonElement>) => {
    setShowDatePopup(false);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div className={`${styles.container}`}>
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
          <h2>Filtres</h2>
          <label htmlFor="select-option">Choisissez une option :</label>
          <select id="select-option" name="options">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <label htmlFor="date-filter">Filtrer par date :</label>
          <select id="date-filter" name="date-filter" value={selectedDateFilter} onChange={handleDateFilterChange}>
            <option value="">Date indifférente</option>
            <option value="lessThan1Hour">Moins d'une heure</option>
            <option value="lessThan24Hours">Moins de 24 heures</option>
            <option value="lessThan1Week">Moins d'une semaine</option>
            <option value="lessThan1Month">Moins d'un mois</option>
            <option value="lessThan1Year">Moins d'un an</option>
            <option value="datesPrecises">Dates précises</option>
          </select>

          {showDatePopup && (
            <>
              <div className={styles.overlay} onClick={handleDatePopupClose}></div>
              <div className={styles.datePopup}>
                <button className={styles.closeButton} onClick={handleDatePopupClose}>X</button>
                <h3>Dates précises</h3>
                <div className={styles.calendarContainer}>
                  <label>
                    De :
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </label>
                  <label>
                    À :
                    <input
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                  </label>
                </div>
              </div>
            </>
          )}

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

        {/* Contenu principal avec scroll et cards */}
        <main className={styles.main}>
          <h1 className={styles.title}>Résultats ({numberOfResults})</h1>
          <div className={styles.cardContainer}>
            {testData.map((item, index) => (
              <div key={index} className={styles.card}>
                <h2>{item.title}</h2>
                <p>{item.description.substring(0, 100)}...</p>
                <button
                  className={styles.btnDiscover}
                  onClick={() => window.open(item.link, '_blank')}
                >
                  Découvrir l'article
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className={styles.footer}>
        <p>Développé avec Next.js</p>
      </footer>
    </div>
  );
}