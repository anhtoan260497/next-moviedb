import { Icon, Tooltip } from '@mui/material';
import React from 'react';
import styles from './SocialLink.module.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ExternalIds } from '@/features/MovieInfoSlice';

function SocialLink() {

    const externalIds = useSelector<RootState, ExternalIds>(state => state.movieInfoSlice.externalIds)
    return (
        <div className={styles.container}>
            {externalIds?.facebook_id && <a href={`https://www.facebook.com/${externalIds.facebook_id}`} target="_blank"><Tooltip title="Facebook" placement='top-start'><Icon className={styles.icon} component={FacebookIcon} /></Tooltip></a>}
            {externalIds?.twitter_id && <a href={`https://twitter.com/${externalIds.twitter_id}`} target="_blank"><Tooltip title="Twitter" placement='top-start'><Icon className={styles.icon} component={TwitterIcon} /></Tooltip></a>}
            {externalIds?.instagram_id && <a href={`https://www.instagram.com/${externalIds.instagram_id}`} target="_blank"><Tooltip title="Instagram" placement='top-start'><Icon className={styles.icon} component={InstagramIcon} /></Tooltip></a>}
            {(externalIds.wikidata_id || externalIds.imdb_id) && (externalIds.facebook_id || externalIds.twitter_id || externalIds.instagram_id) && <div className={styles.slash}></div>}
            {externalIds?.imdb_id && <a href={`https://www.imdb.com/title/${externalIds.imdb_id}`} target="_blank"><Tooltip title="Visit Homepage" placement='top-start'><Icon className={styles.icon} component={LinkIcon} /></Tooltip></a>}
            {externalIds?.wikidata_id && <a href={`https://www.wikidata.org/wiki/${externalIds.wikidata_id}`} target="_blank"><Tooltip title="Wikipedia" placement='top-start'><Icon className={styles.icon} component={ImportContactsIcon} /></Tooltip></a>}
        </div >
    );
}

export default SocialLink;