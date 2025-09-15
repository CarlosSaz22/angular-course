import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Region } from '../../interfaces/region.type';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  ActivatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);



  //query = signal<string>('');

countryNameResource = rxResource({
  params: () => ({ query: this.query() }),
  stream: ({ params }) => {
    if (!params.query) {
      return of([]);  // <-- Retornar observable vacío correctamente
    }
          this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query,
        }
      })

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
