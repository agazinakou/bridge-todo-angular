import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { BehaviorSubject, first } from 'rxjs';
import { CoreService } from '../../../../core/services/core/core.service';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;

  constructor(public formBuilder: FormBuilder,
    private coreService: CoreService,
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
        .login({
          ...this.loginForm.value,
          //recaptcha: 'TOKEN'
        })
        .pipe(first())
        .subscribe(
          (response: any) => {
            if(response.status === 'success'){
              localStorage.setItem('token', response.authorisation.token);
              this.coreService.currentUserSubject.next(response.user);
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

  f = (field: string) => {
    return this.loginForm.get(field);
  };
}
