import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: "root" })
export class LanguageService {
  public constructor(public translate: TranslateService) {
    if (!JSON.parse(JSON.stringify(localStorage.getItem("lang"))))
      localStorage.setItem("lang", "ar");
    const lang = JSON.parse(JSON.stringify(localStorage.getItem("lang"))) ?? "ar";
    translate.use(lang);
    document.getElementsByTagName("html")[0].setAttribute("dir", lang == "ar" ? "rtl" : "ltr");
    this.lang = lang;
  }

  public languages: string[] = ["en", "ar"];
  public lang: string = "ar";

  public setLanguage(lang: string): void {
    if (localStorage.getItem("lang") !== lang) {
      location.reload();
      this.translate.use(lang);
      localStorage.setItem("lang", lang);
    }
  }
}
