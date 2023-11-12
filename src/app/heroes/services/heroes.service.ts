import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Array<Hero>> {
    return this.http.get<Array<Hero>>(`${this.baseUrl}/heroes`);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(err => of(undefined))
      );
  }

  public getSuggestions(query: string): Observable<Array<Hero>> {
    let parameters = new HttpParams()
      .set('q', query)
      .set('_limit', 6);

    return this.http.get<Array<Hero>>(`${this.baseUrl}/heroes?${parameters.toString()}`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<boolean> {
    return this.http
      .delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false))
      )
  }
}
