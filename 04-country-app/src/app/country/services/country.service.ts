import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import type{ Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';


const API_URL='https://restcountries.com/v3.1';

@Injectable({providedIn: 'root'})
export class CountryService {

private http=inject(HttpClient)

  searchByCapital(query: string):Observable<Country[]>{
    query=query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(data => CountryMapper.mapCountryRestItemsToCountryArray(data)),
      catchError(error => {
          console.log('Error fetching',error);
          return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`))
      })
    );
  }


  searchByCountryName(query: string):Observable<Country[]>{
    query=query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      delay(2000),
      map(data => CountryMapper.mapCountryRestItemsToCountryArray(data)),
      catchError(error => {
          console.log('Error fetching',error);
          return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`))
      })
    );
  }

    searchCountryByCode(code: string){

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map(resp => CountryMapper.mapCountryRestItemsToCountryArray(resp)),
      map(countries => countries.at(0)),
      catchError(error => {
          console.log('Error fetching',error);
          return throwError(()=> new Error(`No se pudo obtener paises con ese codigo ${code}`))
      })
    );
  }

}
