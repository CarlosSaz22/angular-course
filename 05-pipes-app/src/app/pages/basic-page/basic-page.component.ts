import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { availableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe,UpperCasePipe,TitleCasePipe,DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {

localeService=inject(LocaleService);
currentLocale=signal(inject(LOCALE_ID));


  nameLower=signal('carlos')
  nameUpper=signal('CARLOS')
  fullName=signal('cArLoS SaZ')


  customDate=signal(new Date())

  tickingDate=effect((onCleanup)=>{
      const interval=setInterval(()=>{
        this.customDate.set(new Date())
      },1000)

      onCleanup(()=>{
        clearInterval(interval);
      })
  });

  changeLocale(locale:availableLocale){
    this.localeService.changeLocale(locale);
  }
}
