import { dbAbonents, dbAbonentGroups, dbLocations } from "../db-data";
import { Abonent } from "../../shared/model/abonent";
import { AbonentGroup } from "../../shared/model/abonentgroup";
import { Location } from "../../shared/model/location";
import { AbonentTo } from "../../shared/to/abonent-to";
import { AbonentGroupTo } from "../../shared/to/abonentgroup-to";
import { LocationTo } from "../../shared/to/location-to";
import * as _ from 'lodash';

// find function

export function findDbAbonentsPerAbonentGroup(abonentGroupId: number) {
    const allAbonents: Abonent[] = _.values<Abonent>(dbAbonents);
    return _.filter(allAbonents, abonent => abonent.abonentGroupId == abonentGroupId);
}

export function findAbonentById(abonentId: number): Abonent {
    const allAbonents: Abonent[] = _.values<Abonent>(dbAbonents);
    return _.find(allAbonents, function(abonent) {
        return abonent.id == abonentId
    });
}

export function findAbonentGroupById(abonentGroupId: number): AbonentGroup {
    const allAbonentGroups: AbonentGroup[] = _.values<AbonentGroup>(dbAbonentGroups);
    return _.find(allAbonentGroups, function(abonentGroup) {
        return abonentGroup.id == abonentGroupId;
    });
}

export function findLocationsByAbonentId(abonentId: number): Location[] {
    const allLocations: Location[] = _.values<Location>(dbLocations);
    return _.filter(allLocations, location => location.abonentId == abonentId)
}


// mapping

export function mapAbonentToAbonentTo(abonent: Abonent): AbonentTo {
    return {
        id: abonent.id,
        abonentGroupId: abonent.abonentGroupId,
        abonentGroupTitle: findAbonentGroupById(abonent.abonentGroupId).title,
        msisdn: abonent.msisdn,
        name: abonent.name,
        iId: abonent.iId
    }
}

export function mapAbonentsToAbonentsTo(abonents: Abonent[]): AbonentTo[] {
    return abonents.map(abonent => mapAbonentToAbonentTo(abonent));
}

export function mapAbonentGroupToAbonentGroupTo(abonentGroup: AbonentGroup): AbonentGroup {
    return {
        id: abonentGroup.id,
        title: abonentGroup.title,
        iId: abonentGroup.iId
    }
}

export function mapAbonentGroupsToAbonentGroupsTo(abonentGroups: AbonentGroup[]): AbonentGroupTo[] {
    return abonentGroups.map(abonentGroup => mapAbonentGroupToAbonentGroupTo(abonentGroup))
}

export function mapLocationToLocationTo(location: Location): LocationTo {
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
}

export function mapLocationsToLocationsTo(locations: Location[]): LocationTo[] {
    return locations.map(location => mapLocationToLocationTo(location));    
}

