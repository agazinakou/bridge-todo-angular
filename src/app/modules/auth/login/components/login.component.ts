import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;

  constructor(public formBuilder: FormBuilder,
    private router: Router, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
    });
  }

  submit = () => {
    if(this.loginForm.valid){
      this.loading = true;
      this.loginService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          (response: any) => {
            console.log("response component", response);
            if(response.status === 'success'){
              localStorage.setItem('token', response.authorisation.token);
              this.router.navigate(['/dashboard']);
            }
          },
          (error: any) => {
            this.loading = false;
          }
        );
    } else {
      alert('Formulaire invalide');
    }
  };
}
