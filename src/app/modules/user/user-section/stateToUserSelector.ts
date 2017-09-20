import { UserVM } from "app/modules/user/user-section/user.vm";
import { ApplicationState } from "app/core/store/application-state";
import * as _ from 'lodash';
import { User } from "shared/model/user";

export function stateToUserSelector(state: ApplicationState): UserVM[] {
    if (!state.storeData) {
        return [];
    }
    const users = _.values<User>(state.storeData.users);
    const usersVM =  users.map(_.partial(mapUserToUserVM));
    return usersVM;
}

function mapUserToUserVM(user: User): UserVM {
    return {
        id: user.id,
        userName: user.userName
    }
}