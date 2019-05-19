import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable,Subject,of, throwError } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseline = "http://digihackerapi.azurewebsites.net/"
  //base_url = 'http://localhost:5000/';
  constructor(private http: HttpClient) {
    
   }

  getSensorHealth():Observable<any>{
    let endpoint = "api/health/documents/sensor1";
    return this.http.get(this.baseline + endpoint)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCosmosData(frequency='hourly'):Observable<any>{
    let number;
    if (frequency == 'hourly'){
      number = 100
    } else if(frequency == 'weekly'){
      number = 2419200
    }
    let endpoint = `api/cosmosdb/Documents/latest/${number}`
    return this.http.get(this.baseline + endpoint)
    .pipe(
      catchError(this.handleError)
    );

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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
