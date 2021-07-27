import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes`);
  }

  getHero(id:string):Observable<Hero>{
    return this.http.get<Hero>(`${this._baseUrl}/heroes/${id}`);
  }

  getSuggestion(id:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes?q=${id}&limit=6`);
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this._baseUrl}/heroes`, hero);
  }

  updateHero(hero:Hero):Observable<Hero>{
    return this.http.put<Hero>(`${this._baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(id:string):Observable<any>{
    return this.http.delete<any>(`${this._baseUrl}/heroes/${id}`);
  }
}
