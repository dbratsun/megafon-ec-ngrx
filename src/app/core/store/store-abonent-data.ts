import { Abonent } from "shared/model/abonent";
import { AbonentGroup } from "shared/model/abonentgroup";
import { Location } from "shared/model/location";

export interface StoreAbonentsData {
    abonents: { [key: number]: Abonent }
    abonentGroups: { [key: number]: AbonentGroup }
}

export const INITIAL_STORE_ABONENTS_DATA: StoreAbonentsData = {
    abonents: {},
    abonentGroups: {}
}

export interface StoreAbonentDetailData {
    abonent: Abonent;
    locations: { [key: number]: Location }
}

export const INITIAL_STORE_ABONENT_DETAIL_DATA: StoreAbonentDetailData = {
    abonent: undefined,
    locations: {}
}
