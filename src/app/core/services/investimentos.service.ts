import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Investimentos } from '../../shared/models/investimentos';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InvestimentosService {

  constructor(private httpClient: HttpClient) { }

  public getAllInvestimentos(): Observable<Investimentos[]> {
    return this.httpClient.get<Investimentos[]>(`${environment.apiUrl}/5e76797e2f0000f057986099`)
    .pipe(
      catchError(this.errorHandler),
      // @ts-ignore
      map(e => e.response.data.listaInvestimentos)
    );
  }

  errorHandler(error): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
