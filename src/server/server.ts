import * as express from 'express';
import { Application } from 'express';
import { apiGetUsers } from "./api/apiGetUsers";
const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

apiGetUsers(app);

app.listen(8091, () => {
    console.log('Server is now running on port 8091 ...');
});

