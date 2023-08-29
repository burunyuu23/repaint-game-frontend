"use client";

import React from 'react';
import {UserProfile} from "@/l4_entities/user/models/user";
import styles from "./content.module.scss"
import {Button} from "@mui/material";
import styled from "styled-components";

type Props = {
    profile: UserProfile
}

const ProfileBanner = styled.div`
  border-bottom: 2px solid #ffdf3c;
  border-top: 2px solid #ffdf3c;
`

const Content = ({profile}: Props) => {
    const from = (new Date(profile.createdTimestamp)).toDateString();

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <div className={styles.mainInfo}>
                    <ProfileBanner className={styles.profileBanner}
                                   style={{backgroundImage: `url(${profile.banner_image_url})`}}>
                        <i>from {from}</i>
                    </ProfileBanner>

                    <b className={styles.username}>{profile.username}</b>
                    <div style={{backgroundImage: `url(${profile.profile_image_url})`}}
                         className={[styles.profileImage, styles.dropShadow].join(' ')}>
                        <Button className={[styles.editButton, styles.dropShadow].join(" ")}>
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