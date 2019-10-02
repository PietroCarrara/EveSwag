export class Type {
    public readonly capacity: number|undefined;
    public readonly description!: string;
    public readonly dogmaAttributes: {attributeID: number, value: number}[] = [];
    public readonly dogmaEffects: {effectID: number, isDefault: boolean}[] = [];
    public readonly graphicID: number|undefined;
    public readonly groupID!: number;
    public readonly iconID: number|undefined;
    public readonly marketGroupID: number|undefined;
    public readonly mass: number|undefined;
    public readonly name!: string;
    public readonly packagedVolume: number|undefined;
    public readonly portionSize: number|undefined;
    public readonly published!: boolean;
    public readonly radius: number|undefined;
    public readonly typeID!: number;
    public readonly volume: number|undefined;

    private constructor(obj: any) {
        this.capacity = obj.capacity;
        this.description = obj.description;
        if (obj.dogma_attributes) {
            this.dogmaAttributes = obj.dogma_attributes
            .map((att: any) => ({
                attributeID: att.attribute_id,
                value: att.value
            }));
        }
        if (obj.dogma_effects) {
            this.dogmaEffects = obj.dogma_effects
            .map((att: any) => ({
                effectID: att.effect_id,
                isDefault: att.is_default
            }));
        }
        this.graphicID = obj.graphic_id;
        this.groupID = obj.group_id;
        this.iconID = obj.icon_id;
        this.marketGroupID = obj.market_group_id;
        this.mass = obj.mass;
        this.name = obj.name;
        this.packagedVolume = obj.packaged_volume;
        this.portionSize = obj.portion_size;
        this.published = obj.published;
        this.radius = obj.radius;
        this.typeID = obj.type_id;
        this.volume = obj.volume;
    }

    public static fromESIObject(obj: object) {
        return new Type(obj);
    }
}