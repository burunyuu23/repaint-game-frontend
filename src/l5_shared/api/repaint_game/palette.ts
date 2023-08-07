import {repaintGameUrl} from "@/l5_shared/api/repaint_game/repaintGame";

const requestMapping = "/palette"

const paletteId = (id: number) => `/${id}`

export const getPaletteById = (id:number) => `${repaintGameUrl}${requestMapping}${paletteId(id)}`