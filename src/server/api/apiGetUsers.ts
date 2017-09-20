import { Application, Request, Response } from "@types/express";
import * as _ from 'lodash';
import { User } from "shared/model/user";
import { dbUsers } from "../db-data";
import { AllUserData } from "shared/to/all-user-data";

export function apiGetUsers(app: Application) {
    app.route('/api/users').get((req: Request, res: Response) => {
        const users: User[] = _.values<User>(dbUsers);    
        const response: AllUserData = {
            users: users
        }
        res.status(200).json(response);
    })
    
}

