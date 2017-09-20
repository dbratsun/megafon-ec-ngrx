import { NgModule } from '@angular/core';
import { UserSectionComponent } from './user/user-section/user-section.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CommonModule } from "@angular/common";

const COMPONENTS = [
    UserSectionComponent,
    UserListComponent
]

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ModulesModule { }