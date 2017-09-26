import { Abonent } from "shared/model/abonent";
import { AbonentGroup } from "shared/model/abonentgroup";
import { Location } from "shared/model/location";

export interface StoreAbonentData {
    abonents: { [key: number]: Abonent }
    abonentGroups: { [key: number]: AbonentGroup }
    locations: { [key: number]: Location }
}

export const INITIAL_STORE_ABONENT_DATA: StoreAbonentData = {
    abonents: {},
    abonentGroups: {},
    locations: {}
}
