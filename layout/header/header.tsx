import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { Icon } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingTitle } from "@/features/SearchInfoSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { MovieInfo } from "@/features/MovieInfoSlice";
import { useRouter } from "next/router";

const Header = () => {

  const menu = [{
    id: 0,
    name: 'Movies',
    path: '/movie/popular',
    children: [{
      name: 'Popular',
      path: '/movie/popular'
    }, {
      name: 'Now Playing',
      path: '/movie/now-playing'
    }, {
      name: 'Upcoming',
      path: '/movie/upcoming'
    }, {
      name: 'Top Rated',
      path: '/movie/top-rated'
    }]
  }, {
    id: 1,
    name: 'TV Shows',
    path: '/tv/popular',
    children: [{
      name: 'Popular',
      path: '/tv/popular'
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
      path: 'https://www.themoviedb.org/person'
    }]
  }, {
    id: 3,
    name: 'More',
    path: '/more',
    children: [{
      name: 'Discussion',
      path: 'https://www.themoviedb.org/discuss'
    }, {
      name: 'Leaderboard',
      path: 'https://www.themoviedb.org/leaderboard'
    }, {
      name: 'Support',
      path: 'https://www.themoviedb.org/talk'
    }, {
      name: 'API',
      path: 'https://developer.themoviedb.org/docs'
    }]
  }]

  const router = useRouter()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const [hoverItem, setHoverItem] = useState(-1)
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)
  const [isShowSearchBar, setIsShowSearchBar] = useState(false)
  const [isFocusSearch, setIsFocusSearch] = useState(false)
  const [isClickTrendingItem, setIsClickTrendingItem] = useState(false)
  const [inputSearch,setInputSearch] = useState(router.query.query || '')
  const listTrending = useSelector<RootState, MovieInfo[] | []>(state => state.searchInfoSlice.trendingResult)
  const [listTitleActive, setListTitleActive] = useState<string[]>([])

  const handleClickMobileTitle = (title : string) => {
     const idx = listTitleActive.findIndex(item => item === title)
     const clone = [...listTitleActive]
     if(idx < 0) {
      clone.push(title)
      setListTitleActive(clone)
      return 
     }
     clone.splice(idx,1)
     setListTitleActive(clone)
  }


  const renderMenuItem = () => {
    return menu.map(item => {
      return (
        <div className={styles.menuItem} key={item.name}>
          <a className={styles.menuItemTitle} onMouseEnter={() => setHoverItem(item.id)}>{item.name}</a>
          {hoverItem === item.id ? <ul className={styles.menuChildItemList} onMouseEnter={() => setHoverItem(item.id)} onMouseLeave={() => setHoverItem(-1)}>
            {item.children.map((childItem) => {
              return <a href={childItem.path} className={styles.menuChildItem} key={childItem.name}><a>{childItem.name}</a></a>
            })}
          </ul> : ''}
        </div>
      )
    })
  }

  console.log(listTitleActive)

  const renderMenuItemMobile = () => {
    return menu.map(item => {
      return (
        <div className={styles.options} key={item.id}>
          <button onClick={() => handleClickMobileTitle(item.name)} className={styles.title}>{item.name}</button>
          {listTitleActive.includes(item.name) && <ul className={styles.listChildItem} >
            {item.children.map((childItem, key) => <a href={childItem.path} className={styles.childItem} key={key}>{childItem.name}</a>)}
          </ul>}
        </div>
      )
    })
  }

  const renderTrendingResult = () => {
    if (!isFocusSearch) return
    return listTrending.map((item, key) => {
      if (key > 7) return
      return (
        <li onClick={() => handleClickTrendingItem(item.title || item.name)} key={item.id} className={styles.trendingItem}>
          <div className={styles.trendingItemCenter}>
            <Icon className={styles.icon} component={SearchIcon} />
            <p className={styles.title}>{item.name || item.title}</p>
          </div>
        </li>
      )

    })
  }

  const handleClickTrendingItem = (params: string = '') => {
    if (!params) {
      setIsFocusSearch(false)
    }
    setIsClickTrendingItem(true)
    if (params) window.location.href = (`/search?query=${params}&page=1&type=movie`)
    setIsFocusSearch(false)
  }

  const handleChangeInputSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value)
  }

  const handleFocusInputSearch = () => {
    setIsFocusSearch(true)
    dispatch(getTrendingTitle())
  }

  const handleBlurInputSearch = () => {
    setTimeout(() => {
      if (isClickTrendingItem) return
      setIsFocusSearch(false)
    }, 150);
  }

  const handleSubmitInputSearchHeader = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(isFocusSearch) {
      window.location.href = (`/search?query=${inputSearch}&page=1&type=movie`)
    }
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

          <div className={styles.menuContainer} onMouseLeave={() => setHoverItem(-1)}>
            {renderMenuItem()}
          </div>
        </div>

        <div className={styles.rightContainer}>
          {!isShowSearchBar ? <button onClick={() => setIsShowSearchBar(!isShowSearchBar)} className={styles.searchButton}>
            <Icon className={styles.searchIcon} component={SearchIcon} />
          </button> : <button onClick={() => setIsShowSearchBar(!isShowSearchBar)} className={styles.searchButton}>
            <Icon className={styles.searchIcon} component={CloseIcon} />
          </button>}
        </div>

        <div className={styles.containerMobile}>
          <button className={styles.left} onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}><Icon style={{ fill: 'white' }} component={MenuIcon} /></button>
          <a href="/"><Image src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg' width={50} height={40} alt="moviedb icon" /></a>
          <div className={styles.right}></div>
        </div>
      </div>

      <div className={clsx(styles.menuMobileContainer, isShowMobileMenu && styles.isActive)}>
        <div className={styles.clear}></div>
        {renderMenuItemMobile()}
      </div>

      {isShowSearchBar && <div className={styles.searchContainerFluid}>
        <form className={styles.searchContainer} onSubmit={(e) => handleSubmitInputSearchHeader(e)}>
          <div className={styles.inputContainer}>
            <Icon className={styles.icon} component={SearchIcon} />
            <input onFocus={handleFocusInputSearch} onBlur={handleBlurInputSearch} className={styles.inputField} onChange={e => handleChangeInputSearch(e)} value={inputSearch} placeholder="Search for a movie, tv show, person..." />
            { inputSearch && <Icon className={styles.closeIcon} onClick={() => setInputSearch('')} component={CloseIcon}  />}
          </div>
        </form>

        {isFocusSearch && <> <div className={styles.trendingTitleFluid}>
          <div className={styles.trendingTitle}>
            <Icon className={styles.icon} component={TrendingUpIcon} />
            <p className={styles.title}>Trending</p>
          </div>
        </div>

          <div className={styles.trendingSearchFluid}>
            <ul className={styles.trendingSearch}>
              {renderTrendingResult()}
            </ul>
          </div></>}
      </div>}

    </div>
  );
};

export default Header;
