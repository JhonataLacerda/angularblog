import { AuthService } from 'src/app/core/guard/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
  });
  msgError: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(60),
          ],
        ],
        confirmpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(60),
          ],
        ],
      },
      {}
    );
  }

  public onsubmit() {
    if (this.form.valid) {
      this.authService
        .signUp({
          name: this.form.value.name,
          email: this.form.value.email,
          password: this.form.value.password,
          confirmpassword: this.form.value.confirmpassword,
        })
        .subscribe({
          next: (res) => res,
          error: (e) => (this.msgError = e),
        });
    }
  }
}
