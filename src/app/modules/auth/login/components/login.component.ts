import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { first } from 'rxjs';
import { CoreService } from '../../../../core/services/core/core.service';
import Swal from 'sweetalert2';

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

              Swal.fire({
                title: 'Ok',
                icon: 'success',
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                toast: true
              })

              this.router.navigate(['/dashboard']);
            }
          },
          () => {
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
