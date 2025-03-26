import express, { Request, Response } from 'express';
import "dotenv/config";
import connectToDatabase from "./config/db"
import cors from "cors"
import { APP_ORIGIN, NODE_ENV,PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import errorHandler from "./middleware/errorHandler";
import catchErrors from './utils/catchErrors';
import { OK } from './constants/http';
import {AuthRoutes }from './auth/routes/auth.route';
import authenticate  from './middleware/authenticate';
import { userRoutes } from './users/user.route';
import { AnnouncementRoutes } from './announcement/announcement.routes';
import { thanksGivingRoutes } from './thanksgiving/thanksgiving.routes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import { TransferRoutes } from './transfer/transfer.routes';



const app = express();

// ...existing code...
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/",
   (req:Request, res:Response,next) => {

    res.status(OK).json({
        status: "healthy",
    });
});

app.use("/auth",AuthRoutes);

//protected routes
app.use("/user", authenticate, userRoutes)
app.use("/announcement", authenticate, AnnouncementRoutes);
app.use("/thanksgiving", authenticate, thanksGivingRoutes);
app.use("/transfer", authenticate, TransferRoutes);

app.use(errorHandler);

app.listen( PORT, async()=>{
        console.log(`Server is running on port ${PORT} in the ${NODE_ENV} environment`);
        await connectToDatabase();
    }
);

