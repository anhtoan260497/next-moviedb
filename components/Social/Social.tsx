import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './Social.module.scss'
import StarIcon from '@mui/icons-material/Star';
import { Icon } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ReviewInterface } from '@/features/MovieInfoSlice';

function Social() {

    const reviews = useSelector<RootState, ReviewInterface[]>(state => state.movieInfoSlice.reviews)
    const [showFullContent, setShowFullContent] = useState(false)
    const [reviewChoosing, setReviewChoosing] = useState<ReviewInterface>({
        author: '',
        author_details: { name: '', username: '', avatar_path: null, rating: 0 },
        content: "",
        created_at: "",
        id: "",
        updated_at: "",
        url: ""
    })
    const [profilePath, setProfilePath] = useState('')

    const chooseReview = () => {
        return reviews[Math.floor(Math.random() * reviews.length)]
    }

    useEffect(() => {
        setReviewChoosing(chooseReview())
        setProfilePath(`https://www.themoviedb.org/t/p/w128_and_h128_face${reviewChoosing.author_details.avatar_path}`)
    }, [reviews?.[0]?.id])

    return (
        <>
            {reviewChoosing ? <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Social</h3>
                    <button className={clsx(styles.option, styles.active)}>Review</button>
                    <button className={clsx(styles.option)}>Discussion</button>
                </div>

                <div className={styles.content}>
                    <div className={styles.avatarContainer}>
                        {reviewChoosing.author_details.avatar_path ? <Image className={styles.avatar} src={profilePath} width={64} height={64} alt='socialAvatar'
                            onError={() => setProfilePath('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg')}
                        /> : <div className={styles.nonAvatar}>{reviewChoosing.author_details.username[0]}</div>}
                    </div>
                    <div className={styles.contentReview}>
                        <div className={styles.titleContainer}>
                            <h3 className={styles.title}>A review by {reviewChoosing.author_details.username}</h3>
                            <div className={styles.score}>
                                <Icon className={styles.icon} component={StarIcon} />
                                <p className={styles.scoreRating}>{reviewChoosing.author_details.rating}.0</p>
                            </div>
                        </div>
                        <p className={styles.writtenBy}>Written by <span className={styles.writtenByName}>{reviewChoosing.author_details.username}</span> on March 10, 2023</p>
                        {!showFullContent && reviewChoosing.content.length > 100 ? <p className={styles.paragraph}>{reviewChoosing.content.slice(0, 100)}...<button className={styles.readMore} onClick={() => setShowFullContent(true)}>Read More</button></p> : <p className={styles.paragraph}>{reviewChoosing.content}</p>}
                    </div>
                </div>
            </div> : ''}
        </>

    );
}

export default Social;