import { NgModule } from '@angular/core';
import { UserSectionComponent } from './user/user-section/user-section.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CommonModule } from "@angular/common";
import { AbonentSectionComponent } from './abonent/abonent-section/abonent-section.component';
import { AbonentListComponent } from "./abonent/abonent-list/abonent-list.component";

const COMPONENTS = [
    UserSectionComponent,
    UserListComponent,
    AbonentSectionComponent,
    AbonentListComponent
]

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ModulesModule { }