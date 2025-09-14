import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-pages',
  imports: [GifListComponent],
  templateUrl: './search-pages.component.html',
})
export default class SearchPagesComponent {

  gifService = inject(GifService);

  gifs = signal<Gif[]>([]);

  onsearch(query:string){
    this.gifService.searchGifs(query).subscribe((resp) =>{
      console.log(`search : `,resp)
      this.gifs.set(resp);
    })
  }



}
