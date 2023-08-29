"use client";

import React from 'react';
import {UserProfile} from "@/l4_entities/user/models/user";
import styles from "./content.module.scss"
import {Button} from "@mui/material";

type Props = {
    profile: UserProfile
}

const Content = ({profile}: Props) => {
    console.log(profile)
    const from = (new Date(profile.createdTimestamp)).toDateString();

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <div className={styles.mainInfo}>
                    <div style={{backgroundImage: `url(${profile.image_url})`}}
                         className={styles.banner}>
                        <i>from {from}</i>
                    </div>

                    <b>{profile.username}</b>
                    <div style={{backgroundImage: `url(${profile.image_url})`}}
                         className={styles.profileImage}>
                        <Button className={styles.editButton}>
                            edit profile
                        </Button>
                    </div>
                    <p>{profile.first_name} {profile.last_name}</p>
                    <p>{profile.birthdate}</p>
                </div>
            </header>
        </div>
    );
};

export default Content;