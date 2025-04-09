import { CREATED, OK } from "../constants/http";
import { Request,Response } from "express";
import catchErrors from "../utils/catchErrors";
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "./order.service";


export const createOrderHandler = catchErrors(async(req:Request,res:Response)=> {

    const order = await createOrder(req.body);
    res.status(CREATED).json(order);
})

export const getOrdersHandler = catchErrors(async(req:Request,res:Response) =>{
    const orders = await getAllOrders(req.query);
    res.status(OK).json(orders);
})

export const getOrderByIdHandler = catchErrors(async(req:Request,res: Response)=>{
    const order = await getOrderById(req.params.id);
    res.status(OK).json(order);
})
   
export const updateOrderHandler = catchErrors(async(req:Request,res: Response)=>{
    const order = await updateOrder(req.params.id,req.body);
    res.status(OK).json(order);
})
    
export const deleteOrderHandler = catchErrors(async(req:Request,res: Response)=>{
    const order = await deleteOrder(req.params.id);
    res.status(OK).json(order);
})
    
