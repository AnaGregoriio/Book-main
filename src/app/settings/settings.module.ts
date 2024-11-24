import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule, // Módulo Angular para funcionalidades básicas
    FormsModule, // Módulo para suporte a formulários
    IonicModule, // Componentes do Ionic
    SettingsPageRoutingModule, // Configuração de rotas
  ],
  declarations: [
    SettingsPage, // Declaração da página de configurações
  ],
})
export class SettingsPageModule {}
