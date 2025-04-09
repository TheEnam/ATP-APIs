import { FilterQuery } from "mongoose";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http";
import appAssert from "../utils/appAssert";
import OrderModel, { IOrder } from "./order.model";

interface OrderFilters {
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
}

export const createOrder = async(data: Partial<IOrder>) => {
    // Validate required fields
    appAssert(data.dateOfService, BAD_REQUEST, 'Date of service is required');
    
   
    appAssert(
        new Date(data.dateOfService) > new Date(),
        BAD_REQUEST,
        'Service date must be in the future'
    );

    const order = await OrderModel.create(data);
    appAssert(order, INTERNAL_SERVER_ERROR, 'Failed to create order of service');
    
    return order;
};

export const getAllOrders = async (filters: OrderFilters = {}) => {
    const query: FilterQuery<IOrder> = {};

    // Date range filtering
    if (filters.startDate || filters.endDate) {
        query.dateOfService = {};
        if (filters.startDate) query.dateOfService.$gte = filters.startDate;
        if (filters.endDate) query.dateOfService.$lte = filters.endDate;
    }

    // Text search across multiple fields
    if (filters.searchTerm) {
        const searchRegex = new RegExp(filters.searchTerm, 'i');
        query.$or = [
            { sermon: searchRegex },
            { scriptureReading: searchRegex },
            { openingHymn: searchRegex },
            { closingHymn: searchRegex }
        ];
    }

    const orders = await OrderModel.find(query)
        .sort({ dateOfService: 1 })
        .lean();

    return orders;
};

export const getOrderById = async (id: string) => {
   

    const order = await OrderModel.findById(id).lean();
    appAssert(order, NOT_FOUND, 'Order of service not found');

    return order;
};

export const updateOrder = async (
    id: string,
    updates: Partial<IOrder>
) => {
    
    if (updates.dateOfService) {
        appAssert(
            new Date(updates.dateOfService) > new Date(),
            BAD_REQUEST,
            'Service date must be in the future'
        );
    }

    const order = await OrderModel.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
    ).lean();

    appAssert(order, NOT_FOUND, 'Order of service not found');
    return order;
};

export const deleteOrder = async (id: string) => {
   

    const order = await OrderModel.findByIdAndDelete(id).lean();
    appAssert(order, NOT_FOUND, 'Order of service not found');

    return order;
};


// export const getUpcomingServices = async (limit: number = 5) => {
//     const orders = await OrderModel.find({
//         dateOfService: { $gt: new Date() }
//     })
//     .sort({ dateOfService: 1 })
//     .limit(limit)
//     .lean();

//     return orders;
// };