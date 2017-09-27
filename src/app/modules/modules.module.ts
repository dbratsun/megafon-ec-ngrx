import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AbonentSectionComponent } from './abonent/abonent-section/abonent-section.component';
import { AbonentListComponent } from "./abonent/abonent-list/abonent-list.component";
import { AbonentDetailSectionComponent } from './abonent/abonent-detail-section/abonent-detail-section.component';
import { AbonentDetailViewComponent } from './abonent/abonent-detail-view/abonent-detail-view.component';

const COMPONENTS = [
    AbonentSectionComponent,
    AbonentListComponent,
    AbonentDetailSectionComponent,
    AbonentDetailViewComponent
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