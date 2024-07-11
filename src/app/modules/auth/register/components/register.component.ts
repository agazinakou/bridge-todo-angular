import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { BehaviorSubject, first } from 'rxjs';
import { CoreService } from '../../../../core/services/core/core.service';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  loading = false;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private coreService: CoreService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
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
    if(this.registerForm.valid){
      this.loading = true;
      this.registerService
        .register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          (response: any) => {
            if(response.status === 'success'){
              localStorage.setItem('token', response.authorisation.token);
              this.coreService.currentUserSubject = new BehaviorSubject<User>(response.user);
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
    return this.registerForm.get(field);
  };
}
