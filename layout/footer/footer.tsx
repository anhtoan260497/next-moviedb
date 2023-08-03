import React from "react";
import styles from './footer.module.scss'
import Image from "next/image";

const Footer = () => {
    const footerMenu = [{
        name: 'THE BASICS',
        children: [{
            name: 'About TMDB',
            link: 'https://www.themoviedb.org/about'
        },
        {
            name: 'Contact Us',
            link: 'https://www.themoviedb.org/about/staying-in-touch'
        },
        {
            name: 'Support Forums',
            link: 'themoviedb.org/talk?language'
        },
        {
            name: 'API',
            link: 'https://developer.themoviedb.org/docs'
        },
        {
            name: 'System Status',
            link: 'https://status.themoviedb.org/'
        }]
    },
    {
        name: 'GET INVOLVED',
        children: [{
            name: 'Contribution Bible',
            link: 'https://www.themoviedb.org/bible'
        },
        {
            name: 'Add New Movie',
            link: 'https://www.themoviedb.org/movie/new'
        },
        {
            name: 'Add New TV Show',
            link: 'https://www.themoviedb.org/tv/new'
        }]
    }, {
        name: 'COMMUNITY',
        children: [{
            name: 'Guildlines',
            link: 'https://www.themoviedb.org/documentation/community/guidelines'
        },
        {
            name: 'Discussion',
            link: 'https://www.themoviedb.org/discuss'
        },
        {
            name: 'Leaderboard',
            link: 'https://www.themoviedb.org/leaderboard'
        }, {
            name: 'Twitter',
            link: 'https://twitter.com/themoviedb'
        }]
    }, {
        name: 'LEGAL',
        children: [{
            name: 'Term Of Use',
            link: 'https://www.themoviedb.org/terms-of-use'
        },
        {
            name: 'API Term Of Use',
            link: 'https://www.themoviedb.org/documentation/api/terms-of-use'
        },
        {
            name: 'Privacy Policy',
            link: 'https://www.themoviedb.org/privacy-policy'
        }]
    }]

    const renderFooterMenu = () => {
        return footerMenu.map(item => {
           return <div className={styles.footerMenu} key={item.name}>
                <a className={styles.footerItemTitle}>{item.name}</a>
                <ul className={styles.footerItemList}>
                    {item.children.map(childItem =>
                       {return <a href={childItem.link} className={styles.footerItem} key={childItem.name} target="_blank">{childItem.name}</a>}
                    )}
                </ul>
            </div>
        })
    }


    return (
        <div className={styles.containerFluid}>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <Image className={styles.image} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="icon" width={130} height={94} />
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