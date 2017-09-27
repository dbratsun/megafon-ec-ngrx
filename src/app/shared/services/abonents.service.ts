import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { AllAbonentsData } from '../../../shared/to/all-abonents-data';

@Injectable()
export class AbonentsService {

    constructor(private http: Http) { }

    loadAbonents(): Observable<AllAbonentsData> {
        return this.http.get('/api/abonents').map(res => res.json())
    }

}
