import React from 'react';
import Content from "./content";
import {UsersPostsService} from "@/l4_entities/user/users-posts-service/service";

type Props = {
    params: {
        username: string
    }
}

const Page = async ({params}: Props) => {
    const profile = await UsersPostsService.userByUsername(params.username);
    return (
        <Content profile={profile}/>
    );
};

export default Page;