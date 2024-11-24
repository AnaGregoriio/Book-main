import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) {}

  async changePassword() {
    const user = await this.storage.get('user');

    if (!user) {
      this.showToast('Usuário não encontrado!');
      return;
    }

    // Verificar se a senha atual está correta
    if (user.password !== this.currentPassword) {
      this.showToast('Senha atual incorreta!');
      return;
    }

    // Verificar se a nova senha e a confirmação são iguais
    if (this.newPassword !== this.confirmNewPassword) {
      this.showToast('As novas senhas não correspondem!');
      return;
    }

    // Atualizar a senha
    user.password = this.newPassword;
    await this.storage.set('user', user);
    this.showToast('Senha alterada com sucesso!');
    this.router.navigate(['/settings']);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
