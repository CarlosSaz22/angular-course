
import { Component, computed, inject} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";


@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  query = toSignal(
    inject(ActivatedRoute).params
    .pipe(
    map(params => params['query'])
    )
  );

  gifService = inject(GifService);

  gifsByKey = computed(() =>{
    return this.gifService.getHistoryGifs(this.query())
  });

  // query = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log(params['query']);
  // });
}


