import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }
  updateTheme(theme: 'light' | 'night') {
    let themeLink = document.getElementById( "theme-style" ) as HTMLLinkElement
    themeLink.href = `${themeLink.href.slice(0, themeLink.href.length - 23)}showbiz-${theme}-theme.css`
  }
}
