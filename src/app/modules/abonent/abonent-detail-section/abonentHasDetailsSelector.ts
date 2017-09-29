import { ApplicationState } from "../../../core/store/application-state";
import { AbonentDetailVM } from "./abonent-detail.vm";
import * as _ from 'lodash';

export function abonentHasDetailsSelector(state: ApplicationState): boolean {
    const currentAbonentId = state.uiState.currentAbonentId;
    if (!currentAbonentId) return false;
    if (!state.storeAbonentDetailData) return false;

    const locations = _.filter(state.storeAbonentDetailData.locations, (location: any) => location.abonentId == currentAbonentId);
    const locationDates: string[] = _.uniq(locations.map(location => new Date(location.time).toLocaleDateString()));
    let result = _.size(locationDates) > 0;
    return result;
}
