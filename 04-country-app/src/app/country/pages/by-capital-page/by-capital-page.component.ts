import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {


  countryService = inject(CountryService);

  ActivatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  queryParam = this.ActivatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) {
        return of([]);  // <-- Retornar observable vacío correctamente
      }

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query,
        }
      })
      return this.countryService.searchByCapital(params.query);  // Observable esperado
    }
  });


  //  countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({params }) => {

  //     if(!params.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCapital(params.query));
  //   },
  // });





  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([])

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);


  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //         console.log(countries);
  //       },
  //       error:(err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err);
  //       },
  //     }
  //     )
  // }
}
