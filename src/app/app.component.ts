import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './auth.service'; // Importação do AuthService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false; // Status de login

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController // Controle do menu
  ) {}

closeMenu() {
  this.menuCtrl.close(); // Fecha o menu lateral
}

  async ngOnInit() {
    try {
      // Verifica se o usuário está logado
      this.isLoggedIn = await this.authService.isUserLoggedIn();
    } catch (error) {
      console.error('Erro ao verificar o login:', error);
      this.router.navigate(['/login']); // Redirecionar em caso de erro
    }
  }

  // Alterna entre abrir e fechar o menu
  async toggleMenu() {
    const isOpen = await this.menuCtrl.isOpen();
    if (isOpen) {
      this.menuCtrl.close();
    } else {
      this.menuCtrl.open();
    }
  }

  // Métodos de navegação
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  // Função de logout
  async logout() {
    try {
      await this.authService.logout(); // Desconectar o usuário
      this.isLoggedIn = false; // Atualizar o status de login
      this.router.navigate(['/login']); // Redirecionar para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
