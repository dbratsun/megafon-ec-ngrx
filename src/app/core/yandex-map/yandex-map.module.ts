import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';

import { YaMap } from './directives/map';
import { YandexMapsApiLoader } from "app/core/yandex-map/services/maps-api-loader/yandex-maps-api-loader";
import { YandexMapsAPIWrapper } from './services/yandex-maps-api-wrapper';
import { MapsAPILoader } from "app/core/yandex-map/services/maps-api-loader/maps-api-loader";

import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';

import { YaPlacemark } from './directives/placemark';
import { YaPolyline } from './directives/polyline';
import { YaRectangle } from './directives/rectangle';
import { YaPolygon } from "./directives/polygon";
import { YaCircle } from "./directives/circle";

export function coreDirectives() {
    return [ 
        YaMap, 
        YaPlacemark,
        YaPolyline,
        YaRectangle,
        YaPolygon,
        YaCircle 
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
            ]
        }
    }
}
