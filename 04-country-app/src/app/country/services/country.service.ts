import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import type { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>(); //{}

  private queryCacheCountry = new Map<string, Country[]>(); //{}

  private queryCacheRegion = new Map<string, Country[]>(); //{}



  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(data => CountryMapper.mapCountryRestItemsToCountryArray(data)),
        tap(data => this.queryCacheCapital.set(query, data)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}`))
        })
      );
  }


  searchByCountryName(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    console.log(`Llegando al servidor por ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        delay(2000),
        map(data => CountryMapper.mapCountryRestItemsToCountryArray(data)),
        tap(data => this.queryCacheCountry.set(query, data)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}`))
        })
      );
  }

  searchCountryByCode(code: string) {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(resp => CountryMapper.mapCountryRestItemsToCountryArray(resp)),
        map(countries => countries.at(0)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener paises con ese codigo ${code}`))
        })
      );
  }

  searchCountryByRegion(region: string): Observable<Country[]> {


    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }
    console.log(`Llegando al servidor por ${region}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(data => CountryMapper.mapCountryRestItemsToCountryArray(data)),
        tap(data => this.queryCacheRegion.set(region, data)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener paises con ese query ${region}`))
        })
      );
  }

}
