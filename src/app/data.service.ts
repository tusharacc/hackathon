import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  base_url = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    let endpoint = this.base_url + 'fetch'
    return this.http.get(endpoint);
  }
}
