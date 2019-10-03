import { Markets } from "./esi/markets/markets";
import { Universe } from "./esi/universe/universe";
import { search } from "./esi/search/search";

var esi = {
    markets: new Markets(),
    universe: new Universe(),
    search: search
};

export { esi };