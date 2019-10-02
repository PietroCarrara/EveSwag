export class TypePrice {
    public readonly adjustedPrice: number;
    public readonly averagePrice: number;
    public readonly typeID: number;

    private constructor(obj: any) {
        this.adjustedPrice = obj.adjusted_price;
        this.averagePrice = obj.average_price;
        this.typeID = obj.type_id;        
    }

    public static fromESIObject(obj: any): TypePrice {
        return new TypePrice(obj);
    }
}