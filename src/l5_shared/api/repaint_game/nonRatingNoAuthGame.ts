import {repaintGameUrl} from "@/l5_shared/api/repaint_game/repaintGame";

const requestMapping = "/no-auth"

const start = "/start"
const step = "/step"

export const startUrl = `${repaintGameUrl}${requestMapping}${start}`
export const stepUrl = `${repaintGameUrl}${requestMapping}${step}`