import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]
      ],
    });
  }

  submit = () => {
    if(this.loginForm.valid){
      this.router.navigate(['/dashboard']);
    } else {
      alert('Formulaire invalide');
    }
  };
}
