import express from 'express';
import router from './router';
import handleError from './middleware/handleError';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

router(app);
handleError(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});