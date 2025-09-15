import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper{
  static mapCountryRestToCountry(restCountry:RESTCountry):Country{
    return{
      cca2:restCountry.cca2,
      flag:restCountry.flag,
      flagSvg:restCountry.flags.svg,
      name:restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital:restCountry.capital.join(','),
      population:restCountry.population,
      region:restCountry.region,
      subregion:restCountry.subregion
    }
  }

    static mapCountryRestItemsToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapCountryRestToCountry);
    }
}
