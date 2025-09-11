
import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { DragonballCharacterAddComponent } from "../../components/dragonball/dragonball-character-add/dragonball-character-add.component";
import { DragonballService } from '../../services/dragonball.service';




interface Character {
  id: number,
  name: string,
  power: number
}

@Component({
  selector: 'app-dragonball-page.component',
  templateUrl: './dragonball-super-page.component.html',
  imports: [CharacterListComponent, DragonballCharacterAddComponent],
})
export class DragonballSuperPageComponent {

  // constructor(
  //   public DragonballService: DragonballService
  // ){}


  public DragonballService = inject(DragonballService);


}
