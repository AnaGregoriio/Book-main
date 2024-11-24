import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.init(); // Inicializa o AuthService
    this.isLoggedIn = await this.authService.isUserLoggedIn(); // Verifica o estado de login
  }

  logout() {
    this.authService.logout(); // Chama a função de logout
    this.isLoggedIn = false; // Atualiza o estado local
  }
}
