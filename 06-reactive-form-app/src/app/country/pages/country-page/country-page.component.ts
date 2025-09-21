import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.services';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal<String[]>(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required], []],
    country: ['', [Validators.required], []],
    border: ['', [Validators.required], []],
  })


  onFormChanged = effect((onCleanup) => {

    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('limpiado');

    })
  })

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]),
            this.countriesByRegion.set([])
        }),
        switchMap(region => this.countryService.getCountriesByRegion(region ?? ''))
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([])
        }),
        filter(value => value!.length > 0),
        switchMap(alphaCode => this.countryService.getCountryByAplhaCode(alphaCode ?? '')

        ),
        switchMap(country => this.countryService.getCountryBordersByCodesArray(country.borders))
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }


  // onFormChanged = effect((onCleanup) => {

  //   const formRegionChanged = this.myForm
  //     .get('region')!
  //     .valueChanges.subscribe((value) => {
  //       console.log({ value });
  //     })

  //     onCleanup(()=>{
  //       formRegionChanged.unsubscribe();
  //       console.log('limpiado');

  //     })
  // })

  // formRegionChanged = this.myForm
  //   .get('region')!
  //   .valueChanges.subscribe((value) => {
  //     console.log({ value });
  //   })

}
