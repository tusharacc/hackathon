import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,Subject,of } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseline = "http://digihackerapi.azurewebsites.net/api/cosmosdb/Documents/latest/2"
  //base_url = 'http://localhost:5000/';
  constructor(private http: HttpClient) {
    
   }

  

  getData(frequency=null):Observable<any>{
    //this.getDataFromCosmos();
    console.log('I am in service');
    if (frequency === null || frequency === 'hourly'){
      let endpoint = "../assets/db.json";
      return this.http.get(endpoint);
    } else if (frequency === 'weekly') {
      let endpoint = "../assets/db.json";
      return this.http.get(endpoint);
    } else if (frequency === 'monthly'){
      let endpoint = "../assets/db.json";
      return this.http.get(endpoint);
    }
    
  }
}
