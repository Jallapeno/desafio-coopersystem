import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class InterceptorService implements HttpInterceptor {

  intercept( request: HttpRequest<any>, next: HttpHandler ):
    Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      return next.handle(request);
    }
}
