import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public url = 'https://localhost:44309/v1';

    constructor(private http: HttpClient) { }

    authenticate(data: any) {
        return this.http.post(`${this.url}/users`, data);
    }
}