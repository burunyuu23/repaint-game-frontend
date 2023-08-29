"use client";

import React, {useState} from 'react';
import {UserProfile} from "@/l4_entities/user/models/user";
import styles from "./content.module.scss"
import {Button} from "@mui/material";
import styled from "styled-components";
import { getImage } from '@/l5_shared/util/image';

type Props = {
    profile: UserProfile
}

const Content = ({profile}: Props) => {
    const from = (new Date(profile.createdTimestamp)).toDateString();

    const [bannerWidth, setBannerWidth] = useState<number>(0);

    // TODO: -error ReferenceError: Image is not defined
    getImage(profile.banner_image_url, (err: string | Event, img: HTMLImageElement) => {
        setBannerWidth(img.naturalWidth);
    });

    const Banner = styled.div`
      background-image: url(${profile.banner_image_url});
      border-bottom: 2px solid #ffdf3c;
      border-top: 2px solid #ffdf3c;

      animation: slider 60s linear infinite;

      @keyframes slider {
        from {
          background-position: 0 0;
        }
        to {
          background-position: ${bannerWidth}px 0;
        }
      }
    `

    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <div className={styles.mainInfo}>
                    <Banner className={styles.banner}>
                        <i>from {from}</i>
                    </Banner>

                    <b>{profile.username}</b>
                    <div style={{backgroundImage: `url(${profile.profile_image_url})`}}
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