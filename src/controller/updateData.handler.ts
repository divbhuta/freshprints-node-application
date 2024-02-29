import Boom from '@hapi/boom';

import { fetchJSONData, writeJSONData } from '../services/appreal';
import { fetchParticularSKUDataWithIndex } from '../utills/common';

async function logic(req) {
    try {
      const {
        quantity,
        sku,
        size,
        price
      } = req.body;
      
      const data = await fetchJSONData();
      const { item, itemIndex } = fetchParticularSKUDataWithIndex(data, 'sku', sku);
      const itemCopy = {...item};
      if (itemIndex !== -1) {
        const { item: sizeElement, itemIndex: sizeElementIndex } =  fetchParticularSKUDataWithIndex(item['sizes'], 'size', size);
        if (sizeElementIndex !== -1) {
          itemCopy['sizes'][sizeElementIndex] = {...sizeElement, ...{
            'quantity': quantity,
            'price': price
          }}
          data[itemIndex] = itemCopy;
          await writeJSONData(data);
          return {
            message: 'Operation succeed'
          }
        } else {
          throw Boom.badRequest('size not present in system');
        }
      } else {
        throw Boom.badRequest('sku not present in system');
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
  