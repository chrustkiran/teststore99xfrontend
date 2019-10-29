import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpCLient: HttpClient) {

  }

  getData(page: number): any {
    return this.httpCLient.get('http://localhost:8080/getitem', {
      headers: {},
      params: {page: page.toString()}
    });
  }

  getItemCount(): any {
    return this.httpCLient.get('http://localhost:8080/getItemCount');
  }
  save(): any{
    return this.httpCLient.get('http://localhost:8080/save');
  }

  calculate(value: any): any {
    const valueString = JSON.stringify(value);
    console.log(valueString);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.httpCLient.post('http://localhost:8080/calculate', valueString, {
      headers: httpHeaders
    });
  }
}
