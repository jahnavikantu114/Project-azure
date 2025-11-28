import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { AdminaddroomComponent } from './components/adminaddroom/adminaddroom.component';
import { AdminviewroomComponent } from './components/adminviewroom/adminviewroom.component';
import { AdmineditroomComponent } from './components/admineditroom/admineditroom.component';
import { AdminviewrequestedbookingComponent } from './components/adminviewrequestedbooking/adminviewrequestedbooking.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddbookingComponent } from './components/useraddbooking/useraddbooking.component';
import { UserviewroomComponent } from './components/userviewroom/userviewroom.component';
import { UserviewmybookingComponent } from './components/userviewmybooking/userviewmybooking.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'adminaddroom', component: AdminaddroomComponent, canActivate: [AuthGuard]},
  {path: 'adminviewroom', component: AdminviewroomComponent, canActivate: [AuthGuard]},
  {path: 'admineditroom/:id', component: AdmineditroomComponent, canActivate: [AuthGuard]},
  {path: 'adminviewrequestedbooking', component: AdminviewrequestedbookingComponent, canActivate: [AuthGuard]},
  {path: 'adminviewfeedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'useraddbooking/:id', component: UseraddbookingComponent, canActivate: [AuthGuard]},
  {path: 'userviewroom', component: UserviewroomComponent, canActivate: [AuthGuard]},
  {path: 'userviewmybooking', component: UserviewmybookingComponent, canActivate: [AuthGuard]},
  {path: 'useraddfeedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'userviewfeedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'footer' , component: FooterComponent},
  {path: 'mainpage', component: MainpageComponent}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

