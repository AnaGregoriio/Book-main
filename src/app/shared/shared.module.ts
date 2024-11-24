import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../safe-url.pipe'; // Ajuste o caminho

@NgModule({
  declarations: [SafeUrlPipe], // Declare o pipe
  exports: [SafeUrlPipe], // Exporte o pipe para outros módulos
  imports: [CommonModule],
})
export class SharedModule {}
