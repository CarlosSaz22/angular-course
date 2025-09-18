import { Pipe, type PipeTransform } from '@angular/core';
import { Hero, propertiesSpanish } from '../interfaces/hero.interface';

@Pipe({
  name: 'PropertiesSpanish',
})
export class PropertiesSpanishPipe implements PipeTransform {

transform(value: keyof Hero | null, ...args: unknown[]): string {
  if (value === null) {
    return '';
  }
  if (value in propertiesSpanish) {
    return propertiesSpanish[value as keyof typeof propertiesSpanish];
  }
  return value;
}

}
