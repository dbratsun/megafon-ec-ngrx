import { Application, Request, Response } from "@types/express";
import * as _ from 'lodash';
import { Abonent } from "../../shared/model/abonent";
import { dbAbonents, dbAbonentGroups, dbLocations } from "../db-data";
import { AllAbonentsData } from "../../shared/to/all-abonents-data";
import { AbonentGroup } from "shared/model/abonentgroup";
import { Location } from "../../shared/model/location";
import { AbonentTo } from "shared/to/abonent-to";
import { AbonentGroupTo } from "shared/to/abonentgroup-to";
import { LocationTo } from "shared/to/location-to";
import { mapAbonentsToAbonentsTo, mapAbonentGroupsToAbonentGroupsTo, findAbonentGroupById } from "./apiCommon";

export function apiGetAbonents(app: Application) {
    app.route('/api/abonents').get((req: Request, res: Response) => {
        const abonents: Abonent[] = _.values<Abonent>(dbAbonents); 
        const allAbonentGroups: AbonentGroup[] = _.values<AbonentGroup>(dbAbonentGroups);   
        const abonentGroups: AbonentGroup[] = _.uniq(abonents.map(abonent => findAbonentGroupById(abonent.abonentGroupId)));

        const response: AllAbonentsData = {
            abonents: mapAbonentsToAbonentsTo(abonents),
            abonentGroups: mapAbonentGroupsToAbonentGroupsTo(abonentGroups)
        }
        res.status(200).json(response);
    })    
}

