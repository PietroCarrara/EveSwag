import { Util, PaginatedCollection } from "../../util";
import { TypePrice } from "./typePrice";
import { MarketOrder, OrderType } from "./marketOrder";
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

    /**
     * Query for orders in a given region
     * 
     * @param regionID The ID of the region you want to look up
     * @param orderType Query for buying/selling/all orders. If you inform a type, this has no effect
     * @param typeID Look for orders of the informed type
     * @param page The page you want to look at
     */
    public async regionOrders(regionID: number,
                              orderType: OrderType = OrderType.any,
                              typeID?: number,
                              page: number = 1): Promise<PaginatedCollection<MarketOrder>> {

        var data: any = {
            order_type: orderType,
            type_id: typeID,
            page: page,
        };

        var res = await Util.request(`/markets/${regionID}/orders`, data);
        var items = res.data as Array<object>;

        var orders = [];

        for (var item of items) {
            orders.push(MarketOrder.fromESIObject(item));
        }

        if (!res.maximumPages) {
            throw new ExpectedMaxPagesError();
        }

        return new PaginatedCollection(orders, page, res.maximumPages, async (page) => {
            return this.regionOrders(regionID, orderType, typeID, page);
        });
    }
}