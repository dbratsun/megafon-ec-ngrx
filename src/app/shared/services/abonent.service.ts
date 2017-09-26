import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { AllAbonentData } from '../../../shared/to/all-abonent-data';

@Injectable()
export class AbonentService {

    constructor(private http: Http) { }

    loadAbonents(): Observable<AllAbonentData> {
        return this.http.get('/api/abonents').map(res => res.json())
    }

}
