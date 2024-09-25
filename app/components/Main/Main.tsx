import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import Image from 'next/image';
import './Main.css'

const Main = () => {
    return (
        <div className="main">
            <div className="main-container">
                <div className="nav">
                    <p>JurisPrudence</p>
                    <Image src={assets.user_icon} alt="" />
                </div>
                <div className="main-top">
                    <div className="search-box">
                        <input type="text" placeholder="Entrer votre recherche" />
                        <div>
                            <Image src={assets.send_icon} alt="" />
                        </div>
                    </div>
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
        </div>
    )
}

export default Main