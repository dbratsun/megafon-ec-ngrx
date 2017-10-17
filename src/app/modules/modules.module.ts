import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AbonentSectionComponent } from './abonent/abonent-section/abonent-section.component';
import { AbonentListComponent } from "./abonent/abonent-list/abonent-list.component";
import { AbonentDetailSectionComponent } from './abonent/abonent-detail-section/abonent-detail-section.component';
import { AbonentDetailViewComponent } from './abonent/abonent-detail-view/abonent-detail-view.component';
import { YandexMapModule } from '../core/yandex-map/yandex-map.module';
import { CheckboxGroupComponent } from '../shared/components/checkbox-group/checkbox-group.component';
import { CoreModule } from '../core/core.module';

const COMPONENTS = [
    AbonentSectionComponent,
    AbonentListComponent,
    AbonentDetailSectionComponent,
    AbonentDetailViewComponent,
    CheckboxGroupComponent
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        YandexMapModule.forRoot(),
        CoreModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ModulesModule { }
