import { Util, PaginatedCollection } from "../util";
import { TypePrice } from "./typePrice";
import { MarketOrder } from "./marketOrder";

export class Markets {
    
    public async prices(): Promise<TypePrice[]> {
        var res = await Util.request('/markets/prices/');
        var items = res.data as Array<object>;

        var prices = [];

        for (var item of items) {
            prices.push(TypePrice.fromESIObject(item));
        }

        return prices;
    }

    public async regionOrders(regionID: number, page: number = 1): Promise<PaginatedCollection<MarketOrder>> {
        var res = await Util.request(`/markets/${regionID}/orders`);
        var items = res.data as Array<object>;

        var orders = [];

        for (var item of items) {
            orders.push(MarketOrder.fromESIObject(item));
        }

        return new PaginatedCollection(orders, async () => {
            return this.regionOrders(regionID, page + 1);
        });
    }
}