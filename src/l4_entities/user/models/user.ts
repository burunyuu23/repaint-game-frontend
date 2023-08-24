type UserFullInfo = {
    username: string,
    email: string,
    email_verified: boolean,
    password: string,
    first_name: string,
    last_name: string,
    created_timestamp: Date,
    birthdate: Date,

    image_url: string,

    posts_count: number,
    comments_count: number,

    palettes_count: number,

    repaint_game_non_rating_count: GamesCount,
    repaint_game_rating_count: GamesCount,
    repaint_game_rating: number,

    friends_count: number,
    friends_request_to_count: number,
    friends_request_from_count: number,
}

export type UserLogin = Pick<UserFullInfo, 'username' | 'email' | 'password'>

export const UserLoginEmpty: UserLogin = {
    username:"",
    email:"",
    password:""
}

export type UserRegister = UserLogin & Pick<UserFullInfo, 'first_name' | 'last_name' | 'birthdate'>

export const UserRegisterEmpty: UserRegister = {
    username:"",
    email:"",
    password:"",
    first_name: "",
    last_name: "",
    birthdate: new Date()
}

export type UserProfile = Omit<UserFullInfo, 'password'>