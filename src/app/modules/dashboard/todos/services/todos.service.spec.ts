import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { environment } from '../../../../../environments/environment.development';
import { Todo } from '../../../../core/models/todo';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    });
    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all todos', () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: '',
        description: '',
        done: false,
        author: {
          id: '',
          name: '',
          email: '',
          password: '',
          email_verified_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        }
      },
    ];

    service.getAll().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a new todo', () => {
    const newTodo: Todo =       {
      id: '1',
      title: '',
      description: '',
      done: false,
      author: {
        id: '',
        name: '',
        email: '',
        password: '',
        email_verified_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      }
    };
    const mockResponse = { success: true, data: newTodo };

    service.add(newTodo).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/todo`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(mockResponse);
  });
});
