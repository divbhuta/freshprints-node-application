import express from 'express';
import updateData from '../controller/updateData.handler';
import updateDataBulk from '../controller/updateDataBulk.handler';
import order from '../controller/order.handler';
import price from '../controller/price.handler';

const router = express.Router();

router.post('/sku/update', updateData);
router.post('/sku/update/bulk', updateDataBulk);
router.post('/order', order);
router.post('/price', price);

const appRouter = (app) => {
   app.use('/api/v1', router);
}

export default appRouter;