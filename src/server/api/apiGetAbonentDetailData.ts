import { Application, Request, Response } from "@types/express";
import * as _ from 'lodash';
import { Abonent } from "../../shared/model/abonent";
import { dbAbonents, dbAbonentGroups, dbLocations } from "../db-data";
import { AbonentGroup } from "shared/model/abonentgroup";
import { Location } from "../../shared/model/location";
import { AbonentTo } from "shared/to/abonent-to";
import { AbonentGroupTo } from "shared/to/abonentgroup-to";
import { LocationTo } from "shared/to/location-to";
import { AbonentDetailData } from "shared/to/abonent-detail-data";
import { mapAbonentToAbonentTo, mapLocationToLocationTo, mapLocationsToLocationsTo, findAbonentById } from './apiCommon';

export function apiGetAbonentDetailData(app: Application) {
    app.route('/api/abonent').get((req: Request, res: Response) => {
        const abonentId = parseInt(req.headers['abonentid']);
        console.log(abonentId);
        const abonent = findAbonentById(abonentId);
        console.log(abonent);
        let locations: Location[] = _.filter(dbLocations, (location: any) => location.abonentId == abonentId);
        console.log(locations);

        const response: AbonentDetailData = {
            abonent: mapAbonentToAbonentTo(abonent),
            locations: mapLocationsToLocationsTo(locations)
        }
        res.status(200).json(response);
    })    
}



