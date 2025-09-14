import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

//primero importaciones de angular
//paquetes de tercero
//propias implementaciones

const GIF_KEY='gifs';

const loadFromLocalStorage=()=>{
  const gifsFromLocalStorage= localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string,Gif[]>
  const gifs= JSON.parse(gifsFromLocalStorage);
  console.log(gifs);
  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage= effect(()=>{
    //Se hace cuando la signal cambia
    const historyString= JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs',historyString)
  });


  searchHistory=signal<Record<string,Gif[]>>(loadFromLocalStorage());

  searchHistoryKey= computed(()=> Object.keys(this.searchHistory()));

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log({ gifs });
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 20,
        },
      }).pipe(
        map(({data}) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap((items)=> {
          this.searchHistory.update(history => ({
            ...history,[query.toLowerCase()]:items,
          }))
        })
      );
  };
  // .subscribe((resp) => {
  //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
  //   console.log({search: gifs });
  //   return gifs;
  // });

    getHistoryGifs(query: string):Gif[] {
    return this.searchHistory()[query] ?? [];
  };


}
