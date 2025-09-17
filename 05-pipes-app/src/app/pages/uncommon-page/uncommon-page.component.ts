import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/navbar/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Carlos',
  gender: 'male',
  age: 25,
  address: 'San Salvador'
}

const client2 = {
  name: 'Mayra',
  gender: 'female',
  age: 21,
  address: 'Puebla'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe,JsonPipe,KeyValuePipe,UpperCasePipe,TitleCasePipe,AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  // i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2)
      return;
    }

    this.client.set(client1)
  }

  // i18n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando',
  });

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Andrea',
    'Juan',
    'Carlos',
  ]);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }

  // KeyValue Pipe
  profile = {
    name: 'Carlos',
    gender: 'male',
    age: 25,
    address: 'San Salvador'
  };

  //Async pipe
  promiseValue: Promise<string>= new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject('Tenemos un error en la data')
        //resolve('Tenemos data en la promesa.');
        console.log('Promesa finalizada');
    }, 3500);
  })

  //async pipe observable
  myObservableTimer=interval(2009).pipe(
    map((value)=> value+1,
    tap((value)=>console.log('tap:',value)))
  );
}
