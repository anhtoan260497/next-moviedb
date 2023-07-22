import React, { useEffect, useState } from 'react';
import styles from './FilterPageType.module.scss'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Icon, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import clsx from 'clsx';

function FilterPageType({ handleSetIsFocusSort, isFocusSort }: any) {

    const filterList = [{
        title: 'Popularity Descending',
        typeFilter: 'popularDescending'
    },
    {
        title: 'Popularity Ascending',
        typeFilter: 'popularAscending'
    },
    {
        title: 'Rating Descending',
        typeFilter: 'ratingDescending'
    },
    {
        title: 'Rating Ascending',
        typeFilter: 'ratingAscending'
    },
    {
        title: 'Release Date Descending',
        typeFilter: 'dateDescending'
    },
    {
        title: 'Release Date Ascending',
        typeFilter: 'dateAscending'
    },
    {
        title: 'Title (A-Z)',
        typeFilter: 'title'
    }]

    const [selectedOption, setSelectedOption] = useState(filterList[0])
    const [isShowSort, setIsShowSort] = useState(false)


    const renderOptionsSort = () => {
        return filterList.map((item) => {
            return <p key={item.typeFilter} onClick={() => handleClickOption(item.typeFilter)} className={styles.sortOptionsItem}>
                {item.title}
            </p>
        })
    }

    const handleClickOption = (type: string) => {
        const selectedFilter = filterList.filter(item => item.typeFilter === type)
        setSelectedOption(selectedFilter[0])
    }

    const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

    return (
        <div className={styles.container}>
            <div className={styles.sortFilterContainer}>
                <div className={styles.sortTitle} onClick={() => setIsShowSort(!isShowSort)}>
                    <p className={styles.title}>Sort</p>
                    {!isShowSort ? <Icon className={styles.icon} component={KeyboardArrowRightIcon} /> : <Icon className={styles.icon} component={KeyboardArrowDownIcon} />}
                </div>
                <div className={styles.clear}></div>
                <div className={clsx(styles.sortContent, isShowSort && styles.active)}>
                    <p className={styles.title}>Sort result by</p>
                    {/* <div className={styles.sortContainer}>
                        <div className={styles.sortSelect} onClick={() => handleSetIsFocusSort(!isFocusSort)}>
                            <p className={styles.sortSelectTitle}>{selectedOption.title}</p>
                            <Icon className={styles.icon} component={KeyboardArrowDownIcon} />
                        </div>
                        {isFocusSort && <div className={styles.sortOptions}>
                            {renderOptionsSort()}
                        </div>}
                    </div> */}
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-select-small-label">Sort</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label={'sort'}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default FilterPageType;