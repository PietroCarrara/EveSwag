export class MarketOrder {
    public readonly durationInDays: number;
    public readonly orderType: OrderType.buy | OrderType.sell;
    public readonly issuedOn: Date;
    public readonly locationID: number;
    public readonly minVolume: number;
    public readonly orderID: number;
    public readonly price: number;
    public readonly range: OrderRange;
    public readonly systemID: number;
    public readonly typeID: number;
    public readonly volumeRemaining: number;
    public readonly volumeTotal: number;

    private constructor(obj: any) {
        this.durationInDays = obj.duration;
        this.orderType = obj.is_buy_order ? OrderType.buy : OrderType.sell;
        this.issuedOn = new Date(obj.issued);
        this.locationID = obj.location_id;
        this.minVolume = obj.min_volume;
        this.orderID = obj.order_id;
        this.price = obj.price;
        this.range = obj.range;
        this.systemID = obj.system_id;
        this.typeID = obj.type_id;
        this.volumeRemaining = obj.volume_remain;
        this.volumeTotal = obj.volume_total;
    }

    public static fromESIObject(obj: any) {
        return new MarketOrder(obj);
    }
}

export enum OrderType {
    buy = 'buy',
    sell = 'sell',
    any = 'all'
}

export enum OrderRange {
    station = 'station',
    region = 'region',
    solarsystem = 'solarsystem',
    one = '1',
    two = '2',
    three = '3',
    four = '4',
    five = '5',
    ten = '10',
    twenty = '20',
    thirty = '30',
    fourty = '40'
}