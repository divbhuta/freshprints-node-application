import { fetchJSONData, writeJSONData } from '../services/appreal';
import { fetchParticularSKUDataWithIndex } from '../utills/common';

async function logic(req) {
    try {
      const data = req.body;
      const jsonData = await fetchJSONData();
      data.map((skuItem) => {
        const { sku, price, quantity, size } = skuItem;
        const { item, itemIndex } = fetchParticularSKUDataWithIndex(jsonData, 'sku', sku);
        const itemCopy = {...item};
        if (itemIndex !== -1) {
          const { item: sizeElement, itemIndex: sizeElementIndex } =  fetchParticularSKUDataWithIndex(item['sizes'], 'size', size);
          if (sizeElementIndex !== -1) {
            itemCopy['sizes'][sizeElementIndex] = {...sizeElement, ...{
                'quantity': quantity,
                'price': price
              }}
              jsonData[itemIndex] = itemCopy;
          }
        }
      })
      await writeJSONData(jsonData);
      return {
          message: 'Operation succeed'
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
  