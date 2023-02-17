import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BidirectionallyService } from './bidirectionally.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public constructor(
    private readonly _translate: TranslateService,
    public readonly _bidirectionallyService: BidirectionallyService
  ) {
    if (!JSON.parse(JSON.stringify(localStorage.getItem('lang'))))
      localStorage.setItem('lang', 'en');

    const lang =
      JSON.parse(JSON.stringify(localStorage.getItem('lang'))) ?? 'ar';

    this.setLanguage(lang);
  }

  public languages: string[] = ['en', 'ar'];

  public lang: string = 'en';

  public setLanguage(lang: string): void {
    if (localStorage.getItem('lang') !== lang) {
      this.lang = lang;

      this._bidirectionallyService.setDirection(lang === 'en' ? 'ltr' : 'rtl');

      document
        .getElementsByTagName('html')[0]
        .setAttribute('dir', lang == 'ar' ? 'rtl' : 'ltr');

      this._translate.use(lang);

      localStorage.setItem('lang', lang);
    }
  }
}
