import { AuthGuard } from './../../core/guard/auth.guard';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostagemComponent } from './postagem/postagem.component';






@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    PostsComponent,
    PostagemComponent,
    
  ],
  providers: [AuthGuard],

  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    CKEditorModule

    

  ]
})
export class PagesModule {
}
