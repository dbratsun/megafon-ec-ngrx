import { AbonentTo } from "shared/to/abonent-to";
import { AbonentGroupTo } from "shared/to/abonentgroup-to";
import { LocationTo } from "shared/to/location-to";

export interface AllAbonentsData {
    abonents: AbonentTo[];    
    abonentGroups: AbonentGroupTo[]; 
    // locations: LocationTo[];
}

