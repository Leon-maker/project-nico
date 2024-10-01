"use client";

import React, { useState } from 'react';
import './Main.scss';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import testData from '../../../data/testData.json';

interface Card {
    title: string;
    description: string;
    link: string;
    type: string;
    date: string;
}

type DateFilter = 'datesPrecises' | 'lessThan1Hour' | 'lessThan24Hours' | 'lessThan1Week' | 'lessThan1Month' | 'lessThan1Year' | '';

const Main = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Card[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('newest');
    const [dateFilter, setDateFilter] = useState<DateFilter>('');
    const [showDatePopup, setShowDatePopup] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [revealClass, setRevealClass] = useState<string>('');
    const [welcomeDisplayed, setWelcomeDisplayed] = useState<boolean>(true);
    const [displayStartDate, setDisplayStartDate] = useState<string>('');
    const [displayEndDate, setDisplayEndDate] = useState<string>('');
    const [documentTypes, setDocumentTypes] = useState({
        ordonnances: false,
        articles: false,
        decisions: false,
    });
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const sortResults = (results: Card[], order: string): Card[] => {
        return results.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
        setSearchResults(sortResults(searchResults, e.target.value));
    };

    const handleRegister = () => {
        setDisplayStartDate(startDate);
        setDisplayEndDate(endDate);
        setShowDatePopup(false);
        handleSearch();
    };

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    const handleDateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as DateFilter;
        setDateFilter(selectedValue);

        if (selectedValue !== 'datesPrecises') {
            setStartDate('');
            setEndDate('');
            setDisplayStartDate('');
            setDisplayEndDate('');
        }

        setShowDatePopup(selectedValue === 'datesPrecises');

        handleSearch();
    };


    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) {
            e.preventDefault();
            if (!searchTerm.trim()) {
                alert("Veuillez entrer un terme de recherche.");
                return;
            }
        }

        let results = testData.filter((card: Card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        results = filterByDate(results);

        setSearchResults(sortResults(results, sortOrder));
        setRevealClass('');

        setTimeout(() => {
            setRevealClass('in');
        }, 400);

        setWelcomeDisplayed(false);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setDocumentTypes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const filterByDate = (results: Card[]) => {
        const currentDate = Date.now();
        console.log("Filtrage par date avec : ", dateFilter);

        return results.filter((card: Card) => {
            const cardDate = new Date(card.date).getTime();

            switch (dateFilter) {
                case 'datesPrecises':
                    if (!startDate || !endDate) {
                        return false;
                    }
                    return cardDate >= new Date(startDate).getTime() && cardDate <= new Date(endDate).getTime();
                case 'lessThan1Hour':
                    return (currentDate - cardDate) < 60 * 60 * 1000;
                case 'lessThan24Hours':
                    return (currentDate - cardDate) < 24 * 60 * 60 * 1000;
                case 'lessThan1Week':
                    return (currentDate - cardDate) < 7 * 24 * 60 * 60 * 1000;
                case 'lessThan1Month':
                    return (currentDate - cardDate) < 30 * 24 * 60 * 60 * 1000;
                case 'lessThan1Year':
                    return (currentDate - cardDate) < 365 * 24 * 60 * 60 * 1000;
                default:
                    return true;
            }
        });
    };

    return (
        <div className="main">
            <div className="header">
                <p className="logo">JurisPrudence</p>
                <button className="button-primary">Deconnexion</button>
            </div>
            <div className="container-main">
                {sidebarOpen && <div className={`overlay`} onClick={toggleSidebar}></div>}

                <form className="search-box" onSubmit={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.035" height="19.039" viewBox="0 0 19.035 19.039">
                        <g id="_x32_-Magnifying_Glass" transform="translate(-7.129 -7.125)">
                            <path id="Tracé_26867" data-name="Tracé 26867" d="M25.834,24.239l-3.659-3.659a8.4,8.4,0,1,0-1.6,1.6l3.659,3.659a1.128,1.128,0,0,0,1.6-1.6Zm-14.658-4.4a6.127,6.127,0,1,1,4.332,1.795A6.134,6.134,0,0,1,11.176,19.841Z" />
                        </g>
                    </svg>
                    <input
                        type="text"
                        placeholder="Entrer votre recherche"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <Image src={assets.send_icon} alt="Envoyer" />
                    </button>
                </form>

                {welcomeDisplayed && searchResults.length === 0 && (
                    <div className="welcome-content">
                        <div className="greet">
                            <p><span>Bonjour,</span></p>
                            <p>Que puis-je faire pour vous ?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <Image src={assets.compass_icon} alt="" />
                                <p>Quelle différence entre mandat et procuration ?</p>
                            </div>
                            <div className="card">
                                <Image src={assets.bulb_icon} alt="" />
                                <p>Quand invoquer la force majeure ?</p>
                            </div>
                            <div className="card">
                                <Image src={assets.message_icon} alt="" />
                                <p>Différence entre responsabilité civile et pénale ?</p>
                            </div>
                            <div className="card">
                                <Image src={assets.code_icon} alt="" />
                                <p>Quels droits pour un salarié licencié ?</p>
                            </div>
                        </div>
                    </div>
                )}

                {!welcomeDisplayed && (
                    <div className={`main-result reveal ${revealClass}`}>
                        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                            <div className="filter">
                                <h2>Documents :</h2>
                                <div className="filter-tags">
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            name="ordonnances"
                                            checked={documentTypes.ordonnances}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="custom-checkbox"></span>
                                        Ordonnances
                                    </label>

                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            name="articles"
                                            checked={documentTypes.articles}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="custom-checkbox"></span>
                                        Articles
                                    </label>

                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            name="decisions"
                                            checked={documentTypes.decisions}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="custom-checkbox"></span>
                                        Décisions
                                    </label>
                                </div>
                            </div>
                            <div className="filter">
                                <h2>Date :</h2>
                                <div className="select-date">
                                    {(!sidebarOpen) &&
                                        (<select
                                            className="select-date"
                                            name="date-filter"
                                            value={dateFilter}
                                            onChange={handleDateFilterChange}
                                        >
                                            <option value="">Date indifférente</option>
                                            <option value="lessThan1Hour">Moins d&#39;une heure</option>
                                            <option value="lessThan24Hours">Moins de 24 heures</option>
                                            <option value="lessThan1Week">Moins d&#39;une semaine</option>
                                            <option value="lessThan1Month">Moins d&#39;un mois</option>
                                            <option value="lessThan1Year">Moins d&#39;un an</option>
                                            <option value="datesPrecises">Dates précises</option>
                                        </select>
                                        )}
                                </div>
                                {(displayStartDate || displayEndDate || sidebarOpen) && (
                                    <div className="selected-dates">
                                        {(displayStartDate || displayEndDate || sidebarOpen) && (<p>Date de début : <input
                                            type="date"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                        /></p>)}
                                        {(displayStartDate || displayEndDate || sidebarOpen) && (<p>Date de fin : <input
                                            type="date"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                        /></p>)}
                                    </div>
                                )}
                            </div>
                        </div>
                        {(sidebarOpen) && (<button className="search-btn button-primary">Appliquer</button>)}
                        <div className={`main-welcome`}>
                            <div className="top-bar">
                                <p className='result-number'>Résultats ({searchResults.length})</p>
                                <div className="select-container">
                                    <p>Trier par :</p>
                                    <select
                                        value={sortOrder}
                                        onChange={handleSortChange}
                                    >
                                        <option value="newest">Nouveau</option>
                                        <option value="oldest">Ancien</option>
                                    </select>
                                </div>
                                <button className="button-primary open-filter" onClick={toggleSidebar}>Filtres</button>
                            </div>

                            {searchResults.length == 0 && (
                                <div className="no-results-message">
                                    <p>Aucun résultat trouvé.</p>
                                </div>
                            )}

                            {searchResults.length > 0 && (
                                <div className={`card-container reveal in`}>
                                    {searchResults.map((item, index) => (
                                        <a
                                            key={index}
                                            className="card-result"
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <h2>{item.title}</h2>
                                            <p>{item.description.substring(0, 100)}...</p>
                                            <button className="btn-discover">
                                                <span>Découvrir l&apos;article</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="7.136" height="12.519" viewBox="0 0 7.136 12.519">
                                                    <g id="arrow-down-sign-to-navigate" transform="translate(-97.141 12.52) rotate(-90)" opacity="0.5">
                                                        <path id="Tracé_26869" data-name="Tracé 26869" d="M6.26,104.277a.874.874,0,0,1-.62-.257L.258,98.637A.877.877,0,1,1,1.5,97.4L6.26,102.16,11.023,97.4a.877.877,0,0,1,1.24,1.24L6.88,104.02A.874.874,0,0,1,6.26,104.277Z" transform="translate(0 0)"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {showDatePopup && (
                    <>
                        <div className="overlay" onClick={() => setShowDatePopup(false)}></div>
                        <div className="date-popup">
                            <div className="content-popup">
                                <button className="close-button" onClick={() => setShowDatePopup(false)}>X</button>
                                <h3>Dates précises</h3>
                                <div className="calendar-container">
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
                            <button className="register-button button-primary" onClick={handleRegister}>Enregistrer</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Main;
