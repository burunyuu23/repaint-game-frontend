"use client";

import React, {useEffect} from 'react';
import {get_is_token_active} from "@/l5_shared/util/cookie_worker";
import {UsersPostsService} from "@/l4_entities/user/users-posts-service/service";
import { useRouter } from 'next/navigation';

async function getUserProfile() {
    if (!get_is_token_active())
        throw new Error()

    return await UsersPostsService.profile()
}

const Page = () => {
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await getUserProfile();
                router.push(`/profile/${profile.username}`);
            } catch (e) {
                router.push("/login");
            }
        }

        fetchData();
    }, []);
    return (
            <div style={{display: "flex", width:"100dvw", justifyContent: "center", alignItems: "center"}}>
                Loading...
            </div>
    );
};

export default Page;