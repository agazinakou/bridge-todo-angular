import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  todoForm!: FormGroup;
  loading = false;

  constructor(public formBuilder: FormBuilder,
    private todosService: TodosService
  ) {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(2), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(2), Validators.maxLength(255)]],
    });
  }

  submit = () => {
    if(this.todoForm.valid){
      this.loading = true;
      this.todosService
        .add(this.todoForm.value)
        .pipe(first())
        .subscribe(
          (response: any) => {
            if(response.status === 'success'){
              alert('OK');
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
    return this.todoForm.get(field);
  };
}
