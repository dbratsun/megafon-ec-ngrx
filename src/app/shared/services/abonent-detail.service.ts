import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AbonentDetailData } from "../../../shared/to/abonent-detail-data";

@Injectable()
export class AbonentDetailService {
  
  constructor(private http: Http) { }
  
      loadAbonentDetail(abonentId: number): Observable<AbonentDetailData> {
          const headers = new Headers();
          headers.append('ABONENTID', abonentId.toString());
          return this.http.get('/api/abonent', {headers}).map(res => res.json())
      }
  }
