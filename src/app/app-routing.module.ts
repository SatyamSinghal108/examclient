import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './components/services/admin.guard';
import { NormalGuard } from './components/services/normal.guard';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ExamComponent } from './pages/normal/exam/exam.component';
import { LoadQuizComponent } from './pages/normal/load-quiz/load-quiz.component';
import { NormalDashboardComponent } from './pages/normal/normal-dashboard/normal-dashboard.component';
import { StartInstructionsComponent } from './pages/normal/start-instructions/start-instructions.component';
import { WelcomeUserComponent } from './pages/normal/welcome-user/welcome-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [

  {
    path:'signup',
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate : [AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'categories',
        component:ViewCategoriesComponent
      },
      {
        path:'add-category',
        component:AddCategoriesComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'questions/:qid/:title',
        component:ViewQuizQuestionsComponent
      },
      {
        path:'question/:qid/:title',
        component:AddQuestionsComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:NormalDashboardComponent,
    canActivate : [NormalGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'',
        component:WelcomeUserComponent
      },
      {
        path:':catId',
        component:LoadQuizComponent
      },
      
    ]
  },
  {
    path:':qId/instructions',
    component:StartInstructionsComponent
  },
  {
    path:':quizId/start',
    component:ExamComponent,
    canActivate : [NormalGuard],  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
