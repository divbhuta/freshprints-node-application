import Boom from '@hapi/boom';

import { fetchJSONData, writeJSONData } from '../services/appreal';
import { fetchParticularSKUDataWithIndex } from '../utills/common';

async function logic(req) {
    try {
      const data = req.body;
      const jsonData = await fetchJSONData();
      let fulfillOrder = true;
      let totalPrice = 0;
      data.every((skuItem) => {
        const { sku, quantity, size } = skuItem;
        const { item, itemIndex } = fetchParticularSKUDataWithIndex(jsonData, 'sku', sku);
        const itemCopy = {...item};
        if (itemIndex !== -1) {
          const { item: sizeElement, itemIndex: sizeElementIndex } =  fetchParticularSKUDataWithIndex(item['sizes'], 'size', size);
          if (sizeElementIndex !== -1) {
            const availableQty = sizeElement['quantity'];
            if (quantity > availableQty) {
                fulfillOrder = false;
                return false;
            }
            totalPrice+= (sizeElement['price'] * quantity);
            return true;
          } else {
            fulfillOrder = false;
            return false;
          }
        } else {
            fulfillOrder = false;
            return false;
        }
      })
      if (!fulfillOrder) {
        throw Boom.badRequest('We cannot fulfill order');
      }
      return {
          message: 'we can fullfill your order',
          totalPrice: totalPrice
      }
    } catch (e) {
      throw e;
    }
}

function handler(req, res, next) {
    logic(req).then((data) => {
      res.send({
        success: true,
        data,
      });
    }).catch(err => {
      next(err)
    });
}

export default handler;
  