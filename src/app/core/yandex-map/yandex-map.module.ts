import { ModuleWithProviders, NgModule } from '@angular/core';

import { YaMapNew } from './directives/map-new';
import { YandexMapsApiLoader } from "app/core/yandex-map/services/maps-api-loader/yandex-maps-api-loader";
import { MapsAPILoader } from "app/core/yandex-map/services/maps-api-loader/maps-api-loader";

import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';

export function coreDirectives() {
    return [ YaMapNew ];
}

@NgModule({
    declarations: coreDirectives(), 
    exports: coreDirectives()
})
export class YandexMapModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: YandexMapModule,
            providers: [
                ...BROWSER_GLOBALS_PROVIDERS,
                { provide: MapsAPILoader, useClass: YandexMapsApiLoader}
            ]
        }
    }
}