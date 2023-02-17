import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateLoginGuard } from './core/guards/activate-login.guard';
import { AdminGuardGuard } from './core/guards/admin-guard.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutContainerComponent } from './layout/layout-container/layout-container.component';
import { LayoutHeaderComponent } from './layout/layout-header/layout-header.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './pages/forbidden.component';
import { NotFoundComponent } from './pages/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ActivateLoginGuard],
    title: 'Login',
  },
  {
    path: 'store',
    component: LayoutContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'board',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        title: 'Dashboard',
        canActivate: [AdminGuardGuard],
      },
    ],
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    title: 'Access forbidden',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not found page',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public static Components = [
    LoginComponent,
    LayoutContainerComponent,
    LayoutHeaderComponent,
  ];
}
