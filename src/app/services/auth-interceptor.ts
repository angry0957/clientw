import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
  HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';

import {  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    if(req.url.includes('login'))
    {
        const authRequest = req.clone({
        });
        return next.handle(authRequest);
    }
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });


    const cloneReq = req.clone({headers});
    return next.handle(cloneReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event
                }
            }),
            catchError((error: any) => {
                if(error.status == 401){
                  localStorage.setItem('token','')
                  localStorage.setItem('data','')
                  this.router.navigate(['/'])
                  return throwError(error);
                }
                return throwError(error);
            }));
  }
}
