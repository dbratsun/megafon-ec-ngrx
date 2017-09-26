import { Application, Request, Response } from "@types/express";
import * as _ from 'lodash';
import { Abonent } from "../../shared/model/abonent";
import { dbAbonents, dbAbonentGroups, dbLocations } from "../db-data";
import { AllAbonentData } from "shared/to/all-abonent-data";
import { AbonentGroup } from "shared/model/abonentgroup";
import { Location } from "../../shared/model/location";
import { AbonentTo } from "shared/to/abonent-to";
import { AbonentGroupTo } from "shared/to/abonentgroup-to";
import { LocationTo } from "shared/to/location-to";

export function apiGetAbonents(app: Application) {
    app.route('/api/abonents').get((req: Request, res: Response) => {
        const abonents: Abonent[] = _.values<Abonent>(dbAbonents); 
        const allAbonentGroups: AbonentGroup[] = _.values<AbonentGroup>(dbAbonentGroups);   
        const abonentGroups: AbonentGroup[] = _.uniq(abonents.map(abonent => findAbonentGroupById(abonent.abonentGroupId)));
        let locations: Location[] = [];

        abonents.forEach(abonent => {
            const abonentLocations: Location[] = _.filter(dbLocations, (location: any) => location.abonentId == abonent.id);
            locations = locations.concat(abonentLocations);
        })

        const response: AllAbonentData = {
            abonents: mapAbonentsToAbonentsTo(abonents),
            abonentGroups: mapAbonentGroupsToAbonentGroupsTo(abonentGroups),
            locations: mapLocationToLocationTo(locations) 
        }
        res.status(200).json(response);
    })    
}

function findDbAbonentsPerAbonentGroup(abonentGroupId: number) {
    const allAbonents: Abonent[] = _.values<Abonent>(dbAbonents);
    return _.filter(allAbonents, abonent => abonent.abonentGroupId == abonentGroupId);
}

function findAbonentGroupById(abonentGroupId: number): AbonentGroup {
    const allAbonentGroups: AbonentGroup[] = _.values<AbonentGroup>(dbAbonentGroups);
    return _.find(allAbonentGroups, function(abonentGroup) {
        return abonentGroup.id == abonentGroupId;
    });
}

function findAbonentById(abonentId: number): Abonent {
    const allAbonents: Abonent[] = _.values<Abonent>(dbAbonents);
    return _.find(allAbonents, function(abonent) {
        return abonent.id == abonentId
    });
}

function findLocationsByAbonentId(abonentId: number): Location[] {
    const allLocations: Location[] = _.values<Location>(dbLocations);
    return _.filter(allLocations, location => location.abonentId == abonentId)
}

function mapAbonentsToAbonentsTo(abonents: Abonent[]): AbonentTo[] {
    return abonents.map(abonent => { 
        return {
            id: abonent.id,
            abonentGroupId: abonent.abonentGroupId,
            abonentGroupName: findAbonentGroupById(abonent.abonentGroupId).title,
            msisdn: abonent.msisdn,
            name: abonent.name,
            iId: abonent.iId
        }
    })
}

function mapAbonentGroupsToAbonentGroupsTo(abonentGroups: AbonentGroup[]): AbonentGroupTo[] {
    return abonentGroups.map(abonentGroup => {
        return {
            id: abonentGroup.id,
            title: abonentGroup.title,
            iId: abonentGroup.iId
        }
    })
}

function mapLocationToLocationTo(locations: Location[]): LocationTo[] {
    return locations.map(location => {
        return {
            id: location.id,
            abonentId: location.abonentId,
            abonentName: findAbonentById(location.abonentId).name,
            description: location.description,
            lat: location.lat,
            lon: location.lon,
            time: location.time,
            iId: location.iId
        }
    })    
}
