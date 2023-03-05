import React from "react";
import styles from './footer.module.scss'
import Image from "next/image";

const Footer = () => {
    const footerMenu = [{
        name: 'THE BASICS',
        children: [{
            name: 'About TMDB',
            link: ''
        },
        {
            name: 'Contact Us',
            link: ''
        },
        {
            name: 'Support Forums',
            link: ''
        },
        {
            name: 'API',
            link: ''
        },
        {
            name: 'System Status',
            link: ''
        }]
    },
    {
        name: 'GET INVOLVED',
        children: [{
            name: 'Contribution Bible',
            link: ''
        },
        {
            name: 'Add New Movie',
            link: ''
        },
        {
            name: 'Add New TV Show',
            link: ''
        }]
    }, {
        name: 'COMMUNITY',
        children: [{
            name: 'Guildlines',
            link: ''
        },
        {
            name: 'Discussion',
            link: ''
        },
        {
            name: 'Leaderboard',
            link: ''
        }, {
            name: 'Twitter',
            link: ''
        }]
    }, {
        name: 'LEGAL',
        children: [{
            name: 'Term Of Use',
            link: ''
        },
        {
            name: 'API Term Of Use',
            link: ''
        },
        {
            name: 'Privacy Policy',
            link: ''
        }]
    }]

    const renderFooterMenu = () => {
        return footerMenu.map(item => {
           return <div className={styles.footerMenu} key={item.name}>
                <a className={styles.footerItemTitle}>{item.name}</a>
                <ul className={styles.footerItemList}>
                    {item.children.map(childItem =>
                       {return <li className={styles.footerItem} key={childItem.name}>{childItem.name}</li>}
                    )}
                </ul>
            </div>
        })
    }


    return (
        <div className={styles.containerFluid}>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <Image src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="icon" width={130} height={94} />
                    <a className={styles.joinCommunityButton}>JOIN THE COMMUNITY</a>
                </div>
                <div className={styles.rightContainer}>
                    {renderFooterMenu()}
                </div>
            </div>
        </div>
    )
}

export default Footer