import { ErrorComponent } from './error/error.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGaurd } from './common/routegaurd/logingaurd';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { AuthGuard } from './AuthGuard';
import { LinkExpiredComponent } from './link-expired/link-expired.component';
import { CandidateReferenceComponent } from './candidate-reference/candidate-reference.component';
const routes: Routes = [
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule',canActivate:[AuthGuard] },
    { path: '', loadChildren: './login/login.module#LoginModule',/*canActivate:[LoginGaurd]*/ },
    { path: 'subscribe', loadChildren: './subscribe/subscribe.module#SubscribeModule' },
    { path: 'signup', component: SignupUserComponent, },
    { path: 'link-expired', component: LinkExpiredComponent, },
    { path: 'candidate-reference', component: CandidateReferenceComponent, },
    { path: '**', component: ErrorComponent, }    
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

