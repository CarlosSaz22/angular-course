import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-pages',
  imports: [GifListComponent],
  templateUrl: './trending-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPagesComponent implements AfterViewInit{

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef= viewChild<ElementRef<HTMLDivElement>>('groupDiv')


  ngAfterViewInit(): void {
    const scrollDiv=this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

     scrollDiv.scrollTop=this.scrollStateService.trendingScrollState();

  }

  onScroll(event:Event){
    const scrollDiv=this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop=scrollDiv.scrollTop;
    const clientHeight =scrollDiv.clientHeight;
    const scrollHeight =scrollDiv.scrollHeight;
    console.log(scrollTop,clientHeight,scrollHeight)
    const isAtBotton=scrollTop+clientHeight+300>=scrollHeight;
    console.log(isAtBotton);
    this.scrollStateService.trendingScrollState.set(scrollTop);
    if(isAtBotton){
      this.gifService.loadTrendingGifs();
    }
  }


}
