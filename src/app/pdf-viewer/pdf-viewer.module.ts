import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PdfViewerPageRoutingModule } from './pdf-viewer-routing.module'; // Roteamento da página
import { PdfViewerPage } from './pdf-viewer.page';
import { SharedModule } from '../shared/shared.module'; // Se você precisar de um módulo compartilhado

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfViewerPageRoutingModule, // Inclui o roteamento específico da página
    SharedModule, // Inclua apenas se necessário
  ],
  declarations: [PdfViewerPage], // Declaração do componente PdfViewerPage
})
export class PdfViewerPageModule {}
