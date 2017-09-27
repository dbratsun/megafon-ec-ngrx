import { AbonentVM } from "app/modules/abonent/abonent-section/abonent.vm";
import { ApplicationState } from "app/core/store/application-state";
import * as _ from 'lodash';
import { Abonent } from "shared/model/abonent";

export function stateToAbonentSelector(state: ApplicationState): AbonentVM[] {
    if (!state.storeAbonentsData) {
        return [];
    }
    const abonents = _.values<Abonent>(state.storeAbonentsData.abonents);
    const abonentsVM =  abonents.map(_.partial(mapAbonentToAbonentVM));
    return abonentsVM;
}

function mapAbonentToAbonentVM(abonent: Abonent): AbonentVM {
    return {
        id: abonent.id,
        msisdn: abonent.msisdn,
        name: abonent.name,
        iId: abonent.iId
    }
}