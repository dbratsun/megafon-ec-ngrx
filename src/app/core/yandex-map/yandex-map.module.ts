import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';

import { YaMap } from './directives/map';
import { YandexMapsApiLoader } from "app/core/yandex-map/services/maps-api-loader/yandex-maps-api-loader";
import { YandexMapsAPIWrapper } from './services/yandex-maps-api-wrapper';
import { MapsAPILoader } from "app/core/yandex-map/services/maps-api-loader/maps-api-loader";

import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';

// import { YaGeoObject } from './directives/geoobject';
import { YaPlacemark } from './directives/placemark';
// import { GeoObjectManager } from './services/managers/geoobject-manager';

export function coreDirectives() {
    return [ 
        YaMap, 
        // YaGeoObject, 
        // YaPlacemark,
        YaPlacemark 
    ];
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
                { provide: MapsAPILoader, useClass: YandexMapsApiLoader }
                // { provide: 'geoManager', useClass: GeoObjectManager }
                // { provide: 'wrapper', useClass: YandexMapsAPIWrapper }
            ]
        }
    }
}
