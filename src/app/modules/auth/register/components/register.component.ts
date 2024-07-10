import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
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
    if(this.registerForm.valid){
      this.router.navigate(['/dashboard']);
    } else {
      alert('Formulaire invalide');
    }
  };
}
