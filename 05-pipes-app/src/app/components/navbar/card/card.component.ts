import { Component, input } from '@angular/core';

const client1={
  name:'Carlos',
  gender:'male',
  age: 25,
  address:'San Salvador'
}

const client2={
  name:'Mayra',
  gender:'female',
  age: 21,
  address:'Puebla'
}
@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {

  title=input.required();
 }
