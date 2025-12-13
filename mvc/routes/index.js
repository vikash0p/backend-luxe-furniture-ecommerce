import express from "express";

import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import reviewRouter from "./reviewRouter.js";
import cartRouter from "./cartRouter.js";
import wishlistRouter from "./wishlistRouter.js";
import salesRouter from "./salesRouter.js";
import addressRouter from "./addressRouter.js";
import orderRouter from "./orderRouter.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/furniture", productRouter);
router.use("/reviews", reviewRouter);
router.use("/cart", cartRouter);
router.use("/wishlist", wishlistRouter);
router.use("/sales", salesRouter);
router.use("/address", addressRouter);
router.use("/order", orderRouter);

export default router;
