"use client";

import React, { useState } from 'react';
import './Main.scss';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import testData from '../../../data/testData.json';

// Interface pour le type des cartes
interface Card {
    title: string;
    description: string;
    link: string;
}

const Main = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Card[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('newest');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchTerm.trim() === '') {
            alert("Veuillez entrer un terme de recherche.");
            return;
        }

        const results = testData.filter((card: Card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log("Résultats trouvés : ", results);
        setSearchResults(results);
    };


    return (
        <div className="main">
            <div className="main-container">
                <div className="nav">
                    <p>JurisPrudence</p>
                    <Image src={assets.user_icon} alt="" />
                </div>

                {searchResults.length > 0 && (
                    <div className="main-result">
                        <div className="top-bar">
                            <p className='result-number'>Results ({searchResults.length})</p>
                            <div className="select-container">
                                <p>Trier par :</p>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="newest">Nouveau</option>
                                    <option value="oldest">Ancien</option>
                                </select>
                            </div>
                        </div>
                        <div className="content">
                            <div className="sidebar">
                                <div className="top-sidebar">
                                    <h4>Recherche Avancée</h4>
                                    <p className="clean">Effacer</p>
                                </div>
                                <div className="filters">
                                    <h2>Types de documents :</h2>
                                    <div className="filter-tags">
                                        <label className="checkbox-container">
                                            <input type="checkbox" name="ordonnances" />
                                            <span className="custom-checkbox"></span>
                                            Ordonnances
                                        </label>

                                        <label className="checkbox-container">
                                            <input type="checkbox" name="articles" />
                                            <span className="custom-checkbox"></span>
                                            Articles
                                        </label>

                                        <label className="checkbox-container">
                                            <input type="checkbox" name="contrats" />
                                            <span className="custom-checkbox"></span>
                                            Contrats
                                        </label>
                                    </div>
                                </div>
                                <div className="search-div">
                                    <button>Recherche</button>
                                </div>
                            </div>

                            <div className="card-container">
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
                                        <div className="btn-discover">
                                            <span>Découvrir l&apos;article</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {searchResults.length === 0 && (
                    <div className="main-welcome">
                        <div className="main-top">
                            <form className="search-box" onSubmit={handleSearch}>
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
                        </div>
                        <div className="greet">
                            <p><span>Bonjour,</span></p>
                            <p>Que puis-je faire pour vous ?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Quelle différence entre mandat et procuration ?</p>
                                <Image src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Quand invoquer la force majeure ?</p>
                                <Image src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Différence entre responsabilité civile et pénale ?</p>
                                <Image src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Quels droits pour un salarié licencié ?</p>
                                <Image src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
