import { Injectable } from '@angular/core';

export class Mapp {
    markers: Markers;
}

export class Markers {
    private list: Marker[] = [];
    constructor(map: Mapp, options?: MarkerOptions) {}
    add(marker: Marker) {
        this.list.push(marker);
    }
}

export interface MarkerOptions {
    position: number,
    title?: string
}

export class Marker {
    constructor(options?: MarkerOptions) {}
}

@Injectable()
export class MarkerWrapper {
    private _map: Promise<Mapp>;
    constructor() {
        this._map = new Promise<Mapp>((resolve: () => void) => { });
    }

    addMarker(options?: MarkerOptions): Promise<Marker> {
        return this._map.then((map: Mapp) => {
            let m = new Marker(options);
            map.markers.add(m);
            return m;
        })
    }
}
