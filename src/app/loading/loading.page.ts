import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage {
  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.init(); // Inicializa o AuthService

    setTimeout(async () => {
      const isLoggedIn = await this.authService.isUserLoggedIn(); // Verifica o estado de login
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 2000);
  }
}
