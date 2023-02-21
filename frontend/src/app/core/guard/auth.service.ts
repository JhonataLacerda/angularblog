import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/users/login`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
        return this.router.navigate(['dashboard']);
      }),
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

  signUp(payload: { name:string, email: string; password: string,
    confirmpassword:string }):  Observable<any> {
      return this.http.post<{ token: string }>(`${this.url}/users/cadastro`, payload).pipe(
        map((res) => {
          alert("Cadastro realizado com sucesso!")
          return this.router.navigate(['register']);
        }),
        catchError((e) => {
          if (e.error.message) return throwError(() => e.error.message);

          return throwError(
            () =>
              'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
          );
        })
      );
    }




   fetchUsers():Observable<any>{

    return this.http.get<any>(`${this.url}/users/usuarios`);
   }

   fetchPosts():Observable<any>{

    return this.http.get<any>(`${this.url}/blog/myposts`);

   }


   singlePage(id:string):Observable<any>{
  
    return this.http.get<any>(this.url+'/blog/'+id);
  
  }

    }

