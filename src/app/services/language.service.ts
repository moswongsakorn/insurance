import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  language: string;
  constructor() {
    console.log("init land");
   
    
  }

  setLanguage(language) {
    localStorage.setItem("language", language);
    this.language = language;
  }

  getLanguage() {
    const lang = localStorage.getItem("language");
    console.log('lang', lang)
    return lang ? lang : "th";
  }
}
