import { Util } from "../../util";
import { SearchResult } from "./searchResult";

export async function search(query: string, categories: SearchCategory[], strict = false): Promise<SearchResult> {
    
    var res = await Util.request('/search/', {
        search: query,
        categories: categories.join(','),
        strict: strict
    });

    return SearchResult.fromESIObject(res.data);
}

export enum SearchCategory {
    agent = 'agent',
    alliance = 'alliance',
    character = 'character',
    constellation = 'constellation',
    corporation = 'corporation',
    faction = 'faction',
    inventoryType = 'inventory_type',
    region = 'region',
    solarSystem = 'solar_system',
    station = 'station'
}