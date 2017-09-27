import { ApplicationState } from "../../../core/store/application-state";
import { AbonentDetailVM } from "./abonent-detail.vm";
import * as _ from 'lodash';

export function abonentDetailsSelector(state: ApplicationState): AbonentDetailVM[] {
    const currentAbonentId = state.uiState.currentAbonentId;
    if (!currentAbonentId) return [];
    if (!state.storeAbonentDetailData) return [];

    const locations = _.filter(state.storeAbonentDetailData.locations, (location: any) => location.abonentId == currentAbonentId);
    const locationDates: string[] = _.uniq(locations.map(location => new Date(location.time).toLocaleDateString()));
    return locationDates.map(_.partial(mapLocationDatesToAbonentDetailVM, state));
}

function mapLocationDatesToAbonentDetailVM(state: ApplicationState, locationDate: string): AbonentDetailVM {
    return {
       date: new Date(locationDate),
       city: '',
       description: 'only for example'
    }
}