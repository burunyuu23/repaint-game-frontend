import api from "@/l5_shared/api/axios";
import {GetPaletteResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/getPaletteResponseDTO";
import {getPaletteById} from "@/l5_shared/api/repaint_game/palette";

export class PaletteService {

    static getBasePalette = async (): Promise<GetPaletteResponseDTO> => {
        const response: GetPaletteResponseDTO = await api.get(`${getPaletteById(0)}`)
            .then(resp => resp.data)
        return response;
    }
}