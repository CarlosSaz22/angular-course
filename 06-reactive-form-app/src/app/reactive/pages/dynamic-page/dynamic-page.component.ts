import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb=inject(FormBuilder);

  formUtils = FormUtils;

  myForm:FormGroup= this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)],[]],
    favoriteGames: this.fb.array([
      ['Metal Gear',Validators.required,[]],
      ['Alan wake 2',Validators.required,[]]
    ],Validators.minLength(3))
  })

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  newFavoriteGame = new FormControl('',Validators.required)

  onAddToFavorites(){
    if(this.newFavoriteGame.invalid) return;
    const newGame=this.newFavoriteGame.value;
    this.favoriteGames.push(this.fb.control(newGame,Validators.required));
    this.newFavoriteGame.reset();
  }

    onDeleteToFavorites(index:number){
    this.favoriteGames.removeAt(index);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }







  // isValidFieldInArray(formArray:FormArray,index:number){
  //  return( formArray.controls[index].errors && formArray.controls[index].touched)
  // }

  //   getFieldErrorInArray(formArray: FormArray,index:number): string | null {
  //   if (formArray.controls.length===0) return null;

  //   const errors = formArray.controls[index].errors ?? {};

  //   for (const key of Object.keys(errors)) {
  //     switch (key) {
  //       case 'required':
  //         return 'Este campo es requerido';

  //       case 'minlength':
  //         return `Minimo de ${errors['minlength'].requiredLength} caracteres.`

  //       case 'min':
  //         return `Valor minimo de ${errors['min'].min}`

  //       case 'noWhitespaceValidator':
  //         return `Error, nombre vacio`
  //     }
  //   }

  //   return null;

  // }

}
