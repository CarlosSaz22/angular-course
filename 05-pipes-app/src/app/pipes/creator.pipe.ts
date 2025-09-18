import { Pipe, type PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'CreatorPipe',
})
export class CreatorPipe implements PipeTransform {

  transform(value: number): string {
    return Creator[value];
  }

}
