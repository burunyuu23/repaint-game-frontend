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
import ProfileWindows from "@/l2_widgets/profile_windows/profileWindows";

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

    const style = `    
    // .content_profileBanner__rB5sN {
    //     border-top: 2px solid green;
    //     border-bottom: 2px solid green;
    // }
    //
    // .content_profileImage__zx_Ht {
    //
    // &:hover{
    //     filter: blur(20px);
    //     }
    // }
    `

    const Wrapper = styled.div`
      ${style}
    `

    return (
        <Wrapper className={[styles.main, "profile"].join(" ")}>
            <header className={[styles.header, "profile--header"].join(" ")}>
                <div className={[styles.mainInfo, "profile--main-info"].join(" ")}>
                    <ProfileBanner className={[styles.profileBanner, "profile--banner"].join(" ")}
                                   style={{backgroundImage: `url(${profile.banner_image_url})`}}>
                        <i className="profile--banner--from-text">from {from}</i>
                    </ProfileBanner>

                    <b className={[styles.username, "profile--username"].join(" ")}>
                        {profile.username}
                    </b>
                    <div style={{backgroundImage: `url(${profile.profile_image_url})`}}
                         className={[styles.profileImage, styles.dropShadow, "profile--image"].join(' ')}>
                        {profileMsg !== userProfileMessages.isAuth &&
                            <Button className={[styles.profileButton, styles.dropShadow, "profile--action-button"].join(" ")}
                                    onClick={handleProfileButton}>
                                {profileMsg}
                            </Button>
                        }
                    </div>
                    <p className={["profile--name"].join(' ')}>
                                {profile.first_name} {profile.last_name}
                    </p>
                    <p className={["profile--birthdate"].join(' ')}>
                        {profile.birthdate}
                    </p>
                </div>
            </header>

            <div className={styles.windows}>
                <ProfileWindows userId={profile.id} />
            </div>
        </Wrapper>
    );
};

export default Content;