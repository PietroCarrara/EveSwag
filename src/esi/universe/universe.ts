import { Util } from "../../util";
import { Type } from "./type";

export class Universe {

    /**
     * Get info on a type
     * 
     * @param id The type id
     */
    public async type(id: number) {
       var res = await Util.request(`/universe/types/${id}`); 

        return Type.fromESIObject(res.data);
    }
}