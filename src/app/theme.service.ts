import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDark: boolean = false;

  constructor(private storage: Storage) {
    this.init(); // Inicializa o armazenamento
  }

  async init() {
    await this.storage.create();
    this.isDark = (await this.storage.get('darkMode')) === 'true';
    this.setTheme(this.isDark);
  }

  setTheme(isDark: boolean) {
    this.isDark = isDark;
    const theme = isDark ? 'dark' : 'light';
    document.body.classList.toggle('dark', isDark);
    this.storage.set('darkMode', isDark.toString());
  }

  toggleTheme() {
    this.setTheme(!this.isDark);
  }
}
