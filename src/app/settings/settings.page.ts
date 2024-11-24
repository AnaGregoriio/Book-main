import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  username: string = 'Usuário';
  email: string = 'usuario@email.com';

  constructor(
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.loadUserDetails();
  }

  async loadUserDetails() {
    // Busca os detalhes do usuário no armazenamento local
    const user = await this.storage.get('user');
    if (user) {
      this.username = user.username || 'Usuário';
      this.email = user.email || 'usuario@email.com';
    } else {
      this.username = 'Usuário Padrão';
      this.email = 'padrao@email.com';
    }
  }

  editProfile() {
    // Navega para a página de edição de perfil
    this.router.navigate(['/edit-profile']);
  }

  async logout() {
    // Exibe uma confirmação antes de fazer o logout
    const alert = await this.alertController.create({
      header: 'Sair',
      message: 'Tem certeza de que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sair',
          handler: async () => {
            await this.storage.remove('user'); // Remove os dados do usuário
            this.router.navigate(['/login']); // Redireciona para a página de login
            this.showToast('Você saiu do aplicativo.');
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteAccount() {
    // Exibe uma confirmação antes de excluir a conta
    const alert = await this.alertController.create({
      header: 'Excluir Conta',
      message: 'Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: async () => {
            await this.storage.clear(); // Limpa todos os dados do armazenamento
            this.router.navigate(['/login']); // Redireciona para a página de login
            this.showToast('Conta excluída com sucesso.');
          },
        },
      ],
    });
    await alert.present();
  }

  private async showToast(message: string) {
    // Exibe uma mensagem de notificação
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
