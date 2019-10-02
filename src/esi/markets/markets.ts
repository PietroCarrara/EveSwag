import { Util, PaginatedCollection } from "../../util";
import { TypePrice } from "./typePrice";
import { MarketOrder } from "./marketOrder";
import { ExpectedMaxPagesError } from "../../errors";

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

        if (!res.maximumPages) {
            throw new ExpectedMaxPagesError();
        }

        return new PaginatedCollection(orders, page, res.maximumPages, async (page) => {
            return this.regionOrders(regionID, page);
        });
    }
}