import { Markets } from "./esi/markets/markets";
import { Universe } from "./esi/universe/universe";

var esi = {
    markets: new Markets(),
    universe: new Universe(),
};

export { esi };