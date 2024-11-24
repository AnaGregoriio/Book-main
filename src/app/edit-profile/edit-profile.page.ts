import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  newUsername: string = '';
  newPassword: string = '';

  constructor(
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) {}

  async saveProfile() {
    if (!this.newUsername || !this.newPassword) {
      this.showToast('Preencha todos os campos.');
      return;
    }

    // Obter dados do usuário atual
    const user = await this.storage.get('user');

    if (!user) {
      this.showToast('Usuário não encontrado.');
      return;
    }

    // Atualizar informações do perfil
    user.username = this.newUsername;
    user.password = this.newPassword;

    await this.storage.set('user', user);
    this.showToast('Perfil atualizado com sucesso!');
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
