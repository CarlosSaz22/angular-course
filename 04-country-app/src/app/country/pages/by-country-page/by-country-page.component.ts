import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);




  query = signal<string>('');

countryNameResource = rxResource({
  params: () => ({ query: this.query() }),
  stream: ({ params }) => {
    if (!params.query) {
      return of([]);  // <-- Retornar observable vacío correctamente
    }
    return this.countryService.searchByCountryName(params.query);  // Observable esperado
  }
});


  // countryNameResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {

  //     if (!params.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCountryName(params.query));
  //   },
  // });


}
