import { AbonentGroupTo } from "shared/to/abonentgroup-to";
import { AbonentTo } from "shared/to/abonent-to";
import { LocationTo } from "shared/to/location-to";

export interface AllAbonentGroupData {
    abonentGroup: AbonentGroupTo;
    abonents: AbonentTo[];
    locations: LocationTo[];
}