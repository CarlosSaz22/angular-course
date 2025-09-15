import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { NotFoundComponent } from "../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './countryPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  countryService = inject(CountryService);

  //countryCode=inject(ActivatedRoute).snapshot.params['code'];
  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code');

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }), // changed request to params and made it a function
    stream: ({ params }) => {
      if (!params.code) {
        return of(null); // Return empty observable if code is null
      }
      return this.countryService.searchCountryByCode(params.code);
    },
  });
}

