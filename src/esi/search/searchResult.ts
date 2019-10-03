export class SearchResult {
    /**
     * List of agent IDs
     */
    public readonly agents?: number[];

    /**
     * List of alliance IDs
     */
    public readonly alliances?: number[];

    /**
     * List of character IDs
     */
    public readonly characters?: number[];

    /**
     * List of constellation IDs
     */
    public readonly constellations?: number[];

    /**
     * List of corporation IDs
     */
    public readonly corporations?: number[];

    /**
     * List of faction IDs
     */
    public readonly factions?: number[];

    /**
     * List of inventory type IDs
     */
    public readonly inventoryTypes?: number[];

    /**
     * List of region IDs
     */
    public readonly regions?: number[];

    /**
     * List of solar system IDs
     */
    public readonly solarSystems?: number[];

    /**
     * List of station IDs
     */
    public readonly stations?: number[];

    private constructor(obj: any) {
        this.agents = obj.agent;
        this.alliances = obj.alliance;
        this.characters = obj.character;
        this.constellations = obj.constellation;
        this.corporations = obj.corporation;
        this.factions = obj.faction;
        this.inventoryTypes = obj.inventory_type;
        this.regions = obj.region;
        this.solarSystems = obj.solar_system;
        this.stations = obj.station;
    }

    public static fromESIObject(obj: object) {
        return new SearchResult(obj);
    }
}
