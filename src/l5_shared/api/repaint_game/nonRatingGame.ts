import {repaintGameUrl} from "@/l5_shared/api/repaint_game/repaintGame";

const requestMapping = "/game"

const startMapping = "/start"
const stepMapping = "/step"
const getGameUrl = (gameId: string) => `/${gameId}`

export const startUrl = `${repaintGameUrl}${requestMapping}${startMapping}`
export const stepUrl = `${repaintGameUrl}${requestMapping}${stepMapping}`