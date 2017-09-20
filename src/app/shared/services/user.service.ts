import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { AllUserData } from '../../../shared/to/all-user-data';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    loadUsers(): Observable<AllUserData> {
        return this.http.get('/api/users').map(res => res.json())
    }

}
