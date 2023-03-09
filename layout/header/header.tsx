import React, { useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { Icon } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import clsx from "clsx";

const Header = () => {

  const menu = [{
    id: 0,
    name: 'Movies',
    path: '/movies',
    children: [{
      name: 'Popular',
      path: '/popular'
    }, {
      name: 'Now Playing',
      path: '/now-playing'
    }, {
      name: 'Upcoming',
      path: '/upcoming'
    }, {
      name: 'Top Rated',
      path: '/toprated'
    }]
  }, {
    id: 1,
    name: 'TV Shows',
    path: '/tvshows',
    children: [{
      name: 'Popular',
      path: '/tv'
    }, {
      name: 'Airing Today',
      path: '/tv/airing-today'
    }, {
      name: 'on TV',
      path: '/tv/on-the-air'
    }, {
      name: 'Top Rated',
      path: '/tv/top-rated'
    }]
  }, {
    id: 2,
    name: 'People',
    path: '/persion',
    children: [{
      name: 'Popular People',
      path: '/popularpeople'
    }]
  }, {
    id: 3,
    name: 'More',
    path: '/more',
    children: [{
      name: 'Discussion',
      path: '/discuss'
    }, {
      name: 'Leaderboard',
      path: '/leaderboard'
    }, {
      name: 'Support',
      path: '/talk'
    }, {
      name: 'API',
      path: '/api'
    }]
  }]

  const [hoverItem, setHoverItem] = useState(-1)
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)

  const renderMenuItem = () => {
    return menu.map(item => {
      return (
        <div className={styles.menuItem} key={item.id}>
          <a className={styles.menuItemTitle} onMouseEnter={() => setHoverItem(item.id)}>{item.name}</a>
          {hoverItem === item.id ? <ul className={styles.menuChildItemList} onMouseEnter={()=>setHoverItem(item.id)} onMouseLeave={()=>setHoverItem(-1)}>
            {item.children.map((childItem) => {
              return <li className={styles.menuChildItem} key={childItem.name}><a>{childItem.name}</a></li>
            })}
          </ul> : ''}
        </div>
      )
    })
  }

  const renderMenuItemMobile = () => {
    return menu.map(item => {
      return (
        <div className={styles.options} key={item.id}>
        <button className={styles.title}>{item.name}</button>
        <ul className={styles.listChildItem}>
          {item.children.map((childItem,key) =>  <li className={styles.childItem} key={key}>{childItem.name}</li>)}
        </ul>
      </div>
      )
    })
  }


  return (
    <div className={styles.containerFluid}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <a href="/"><Image
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            width={154}
            height={20}
            alt="logo"
          /></a>

          <div className={styles.menuContainer} onMouseLeave={()=>setHoverItem(-1)}>
           {renderMenuItem()}
          </div>

        </div>

        <div className={styles.containerMobile}>
          <button className={styles.left} onClick={()=>setIsShowMobileMenu(!isShowMobileMenu)}><Icon style={{fill:'white'}} component={MenuIcon}/></button>
          <Image src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg' width={50} height={40} alt="moviedb icon"/>
          <div className={styles.right}></div>
        </div>
      </div>

      <div className={clsx(styles.menuMobileContainer,isShowMobileMenu && styles.isActive)}>
        <div className={styles.clear}></div>
        {renderMenuItemMobile()}
      </div>
      
    </div>
  );
};

export default Header;
