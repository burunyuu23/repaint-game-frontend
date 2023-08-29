import React from 'react';
import Content from "./content";
import {UsersPostsService} from "@/l4_entities/user/users-posts-service/service";

type Props = {
    params: {
        username: string
    }
}
export async function generateMetadata({ params }: Props) {
    return {
        title: `${params.username} / Profile`,
        description: `${params.username} profile`,
    }
}

const Page = async ({params}: Props) => {
    const profile = await UsersPostsService.userByUsername(params.username);
    return (
        <Content profile={profile}/>
    );
};

export default Page;