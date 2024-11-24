import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redireciona para a página de carregamento ao iniciar
  { path: '', redirectTo: 'loading', pathMatch: 'full' },

  // Página de carregamento
  {
    path: 'loading',
    loadChildren: () =>
      import('./loading/loading.module').then((m) => m.LoadingPageModule),
  },

  // Login
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  // Registro
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },

  // Configurações
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },

  // Editar Perfil
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./edit-profile/edit-profile.module').then(
        (m) => m.EditProfilePageModule
      ),
  },

  // Trocar Senha
  {
    path: 'change-password',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },

  // Tabs principais
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },

  // Redireciona para a aba principal no caso de rotas inválidas
  {
    path: '**',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
