import {repaintGameUrl} from "@/l5_shared/api/repaint_game/repaintGame";

const requestMapping = "/game"

const startMapping = "/start"
const stepMapping = "/step"
const userGamesMapping = "/user"
const getGameUrl = (gameId: string) => `/${gameId}`
const getUserGamesUrl = (userId: string) => `${userGamesMapping}/${userId}`

export const startUrl = `${repaintGameUrl}${requestMapping}${startMapping}`
export const stepUrl = `${repaintGameUrl}${requestMapping}${stepMapping}`

export const userGamesUrl = (userId: string) => `${repaintGameUrl}${requestMapping}${getUserGamesUrl(userId)}`