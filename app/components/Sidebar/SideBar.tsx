"use client";

import React from 'react';
import { assets } from '../../assets/assets'
import Image from 'next/image';
import './SideBar.css'

const Sidebar = () => {


    return (
        <div className='sidebar'>
            <div className='top'>
                <Image className='menu' src={assets.menu_icon} alt='' />
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <Image src={assets.question_icon} alt='' />
                    <p>Aide</p>
                </div>
                <div className="bottom-item recent-entry">
                    <Image src={assets.setting_icon} alt='' />
                    <p>Paramètre</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar