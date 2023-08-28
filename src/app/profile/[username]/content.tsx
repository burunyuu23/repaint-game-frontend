"use client";

import React from 'react';
import {UserProfile} from "@/l4_entities/user/models/user";

type Props = {
    profile: UserProfile
}

const Content = ({profile}: Props) => {

    return (
                <div>{profile.username}</div>
    );
};

export default Content;