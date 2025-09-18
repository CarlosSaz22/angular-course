
import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { Hero } from '../../interfaces/hero.interface';
import { heroes } from '../../data/hero.data';
import { CanFlyPipe } from '../../pipes/canfly.pipe';
import { HeroColorPipe } from '../../pipes/heroColor.pipe';
import { HeroTextColorPipe } from '../../pipes/HeroTextColor.pipe';
import { CreatorPipe } from '../../pipes/creator.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { PropertiesSpanishPipe } from '../../pipes/propertiesSpanish.pipe';
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe,CanFlyPipe,HeroColorPipe,HeroTextColorPipe,CreatorPipe,HeroSortByPipe,PropertiesSpanishPipe,HeroFilterPipe],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
  name=signal('Carlos Saz')

  upperCase=signal(true)

  heroes =signal<Hero[]>(heroes);

  sortBy= signal<keyof Hero | null>(null);

  searchQuery=signal('');

 }
