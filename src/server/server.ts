import * as express from 'express';
import { Application } from 'express';
import { apiGetAbonents } from "./api/apiGetAbonents";
import { apiGetAbonentDetailData } from "./api/apiGetAbonentDetailData";
const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

apiGetAbonents(app);
apiGetAbonentDetailData(app);

app.listen(8091, () => {
    console.log('Server is now running on port 8091 ...');
});

