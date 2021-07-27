import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;

  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth!}
  }

  constructor(private _http:HttpClient) { }

  validateAuthentication():Observable<boolean>{
    if ( !localStorage.getItem('id') ) {
      return of(false);
    }
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
    .pipe(
      map( auth => {
        this._auth = auth;
        return true;
      })
    )
  }

  login():Observable<Auth>{
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`)
    .pipe(
      tap( auth => this._auth = auth),
      tap( auth => localStorage.setItem('id',auth.id))
    )
  }

  logout():void{
    this._auth = undefined;
  }
}
