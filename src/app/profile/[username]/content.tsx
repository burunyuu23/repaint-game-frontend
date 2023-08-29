"use client";

import React, {useEffect, useRef, useState} from 'react';
import {UserProfile} from "@/l4_entities/user/models/user";
import styles from "./content.module.scss"
import {Button} from "@mui/material";
import styled from "styled-components";
import {get_is_token_active} from "@/l5_shared/util/cookie_worker";
import {UsersPostsService} from "@/l4_entities/user/users-posts-service/service";
import {AddErrorCodeToKeys, generateErrorCodes} from "@/l5_shared/util/error_code";
import {createUseValidation} from "@/l5_shared/hooks/useValidation";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";

type Props = {
    profile: UserProfile
}

const ProfileBanner = styled.div`
  border-bottom: 2px solid #ffdf3c;
  border-top: 2px solid #ffdf3c;
`

async function getUserProfile() {
    if (!get_is_token_active())
        throw new Error();

    return await UsersPostsService.profile()
}

const Content = ({profile}: Props) => {
    const from = (new Date(profile.createdTimestamp)).toDateString();

    const userProfileMessages = {
        isAuth: "",
        isMe: "edit profile",
        isWantFriend: "accept friend",
        isNotFriend: "add friend",
        isFriend: "remove friend",
    }
    type UserProfileWithCodeKeys = AddErrorCodeToKeys<typeof userProfileMessages, number>;
    const profileCodes = generateErrorCodes(userProfileMessages) as UserProfileWithCodeKeys;

    const errorCode = useRef<number>(1)
    const useValidation = createUseValidation({
        errorCodes: profileCodes,
        errorsMessages: userProfileMessages,
        errorCode
    })

    const isAuth = useAppSelector(state => state.user__settings.isAuth)

    const [isMe, setIsMe] = useState<boolean>(false);
    getUserProfile()
        .then(resp => {
            if (resp.username === profile.username) {
                setIsMe(true)
            }
        })
        .catch(e => setIsMe(false));

    const [profileMsg, validateProfileMsg] = useValidation({
        rules: [
            {
                rule: () => !isAuth,
                errorField: userProfileMessages.isAuth
            },
            {
                rule: () => isMe,
                errorField: userProfileMessages.isMe
            },
            {
                rule: () => true,
                errorField: userProfileMessages.isNotFriend
            },
        ]
    });

    useEffect(() => {
        validateProfileMsg();
    }, [isAuth, isMe]);

    const handleProfileButton = () => {
        validateProfileMsg();
    }

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
                        {profileMsg !== userProfileMessages.isAuth &&
                            <Button className={[styles.profileButton, styles.dropShadow].join(" ")}
                                    onClick={handleProfileButton}>
                                {profileMsg}
                            </Button>
                        }
                    </div>
                    <p>{profile.first_name} {profile.last_name}</p>
                    <p>{profile.birthdate}</p>
                </div>
            </header>
        </div>
    );
};

export default Content;