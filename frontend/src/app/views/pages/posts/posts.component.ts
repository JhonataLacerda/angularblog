import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/guard/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],

})
export class PostsComponent implements OnInit {
  private url: string = 'http://localhost:8080';

  htmlContent = '';
  form: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    texto: new FormControl(''),
  });
  msgError: any;

  ckeditorContent = ""

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    uploadUrl: 'http://localhost:8080/images/blog/',
    uploadWithCredentials: false,
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };



  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private http: HttpClient, private router: Router) { }





  ngOnInit(): void {


  }



  selectFile!: File;

  selectImage(event: any) {

    this.selectFile = event.target.files[0];


  }






  public onsubmit() {

    const formData = new FormData();
    formData.append('titulo', this.form.value.titulo);
    formData.append('texto', this.form.value.texto);
    formData.append('images', this.selectFile);


    if (this.form.valid) {


      this.http.post<{ token: string }>(`${this.url}/blog/postar`, formData).pipe(
        map((res) => {

          alert("Postagem realizada com sucesso!")
          return this.router.navigate(['dashboard']);
        }),
        catchError((e) => {
          if (e.error.message) return throwError(() => e.error.message);

          return throwError(
            () =>
              'Problema com o sistema de postagem, tente novamente mais tarde!'
          );
        })
      ).subscribe({
        next: (res) => res,
        error: (e) => (this.msgError = e),
      });
    }
  }





}