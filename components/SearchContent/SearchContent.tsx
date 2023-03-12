import React from 'react';
import Pagination from '../Pagination/Pagination';
import SearchFilter from '../SearchFilter/SearchFilter';
import SearchResult from '../SearchResult/SearchResult';
import styles from './SearchContent.module.scss'

function SearchContent() {
    return (<>
        <div className={styles.container}>
            <SearchFilter />
            <SearchResult />
        </div>
        <Pagination />
    </>
    );
}

export default SearchContent;