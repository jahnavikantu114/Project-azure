import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CookingImpComponent } from './components/cooking-imp/cooking-imp.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminaddclassComponent } from './components/adminaddclass/adminaddclass.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdmineditclassComponent } from './components/admineditclass/admineditclass.component';
import { AdminviewclassComponent } from './components/adminviewclass/adminviewclass.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewclassComponent } from './components/userviewclass/userviewclass.component';
import { UserviewappliedrequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
// import { LandingComponent } from './landing/landing.component';
 
 
const routes: Routes = [
  // {path:'landing', component:LandingComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegistrationComponent},
  {path: 'home', component:HomeComponent},
  {path: 'cooking-imp', component:CookingImpComponent, canActivate:[AuthGuard], data: {role: 'User'}},
  {path: 'error', component:ErrorComponent},
  {path:'adminviewfeedback', component:AdminviewfeedbackComponent, canActivate:[AuthGuard], data: {role : 'Admin'}},
  {path:'adminnav', component:AdminnavComponent,canActivate:[AuthGuard], data:{role : 'Admin'}},
  {path:'adminaddclass', component:AdminaddclassComponent, canActivate:[AuthGuard], data: {role: 'Admin'}},
  {path:'usernav', component:UsernavComponent, canActivate:[AuthGuard], data: {role: 'User'}},
  {path:'admineditclass/:id', component:AdmineditclassComponent, canActivate:[AuthGuard], data:{role: 'Admin'}},
  {path:'adminviewclass', component:AdminviewclassComponent, canActivate:[AuthGuard], data:{role : 'Admin'}},
  {path:'adminviewappliedrequest', component:AdminviewappliedrequestComponent, canActivate:[AuthGuard], data:{role:'Admin'}},
  {path:'cooking-imp', component:CookingImpComponent, canActivate:[AuthGuard], data:{role: 'User'}},
  {path:'adminviewfeedback', component:AdminviewfeedbackComponent, canActivate:[AuthGuard], data:{role:'Admin'}},
  {path:'userviewfeedback', component:UserviewfeedbackComponent, canActivate:[AuthGuard], data:{role:'User'}},
  {path:'useraddfeedback', component:UseraddfeedbackComponent, canActivate:[AuthGuard], data:{role:'User'}},
  {path:'userviewclass', component:UserviewclassComponent, canActivate:[AuthGuard], data:{role:'User'}},
  {path:'userviewappliedrequest', component:UserviewappliedrequestComponent, canActivate:[AuthGuard], data:{role:'User'}},
  {path:'useraddrequest', component:UseraddrequestComponent, canActivate:[AuthGuard], data:{role:'User'}},
  {path:'', redirectTo:'/home', pathMatch:'full'}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 