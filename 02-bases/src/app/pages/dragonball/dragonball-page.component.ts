import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';



interface Character {
  id: number,
  name: string,
  power: number
}

@Component({
  selector: 'app-dragonball-super-page.component',
  imports: [
    //    NgClass
  ],
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {

  name=signal('');
  power=signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 4, name: 'Yamcha', power: 500 },
    // { id: 3, name: 'Piccolo', power: 3000 }
  ]);

  addCharacter(){
    if(!this.name() || !this.power() || this.power()<=0){
      return;
    }

    const newCharacter:Character ={
      id:this.characters.length+1,
      name:this.name(),
      power:this.power()
    };
    //No es recomendado
    //this.characters().push(newCharacter);

    this.characters.update(
      (list) => [... list,newCharacter]
    )
    this.resetFields();
    console.log('name',this.name(),'power',this.power())
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }

  // powerClasses = computed(() =>{
  //   return{
  //     'text-danger' : true
  //   };
  // });
}
