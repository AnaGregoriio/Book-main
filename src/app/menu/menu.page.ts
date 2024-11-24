import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController // Controle do menu
  ) {}

  async ngOnInit() {
    await this.authService.init(); // Inicializa o serviço de autenticação
    this.isLoggedIn = await this.authService.isUserLoggedIn(); // Verifica se o usuário está logado
  }

  async navigateTo(route: string) {
    await this.router.navigateByUrl(route); // Navega para a rota especificada
    this.closeMenu(); // Fecha o menu após navegar
  }

  closeMenu() {
    this.menuCtrl.close(); // Fecha o menu lateral
  }

  async logout() {
    await this.authService.logout(); // Realiza o logout
    this.isLoggedIn = false;
    await this.navigateTo('/login'); // Redireciona para a página de login
  }
}
