import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { CoreService } from '../../../../core/services/core/core.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRegisterService: jasmine.SpyObj<RegisterService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCoreService: jasmine.SpyObj<CoreService>;

  beforeEach(async () => {
    mockRegisterService = jasmine.createSpyObj('RegisterService', ['register']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCoreService = jasmine.createSpyObj('CoreService', ['currentUserSubject']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: RegisterService, useValue: mockRegisterService },
        { provide: Router, useValue: mockRouter },
        { provide: CoreService, useValue: mockCoreService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled', () => {
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should have an invalid form when fields are empty', () => {
    component.registerForm.setValue({
      name: '',
      email: '',
      password: ''
    });
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should call register method on submit with valid form', () => {
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    mockRegisterService.register.and.returnValue(of({ status: 'success', authorisation: { token: 'test-token' }, user: {} }));

    component.submit();
    expect(mockRegisterService.register).toHaveBeenCalledWith(component.registerForm.value);
  });

  it('should handle error during registration', () => {
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    mockRegisterService.register.and.returnValue(throwError({ error: 'error' }));

    component.submit();
    expect(component.loading).toBeFalse();
  });

  it('should navigate to dashboard on successful registration', () => {
    component.registerForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    const mockResponse = { status: 'success', authorisation: { token: 'test-token' }, user: component.registerForm.value };
    mockRegisterService.register.and.returnValue(of(mockResponse));
    mockCoreService.currentUserSubject = new BehaviorSubject(component.registerForm.value);

    component.submit();
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(mockCoreService.currentUserSubject.next).toHaveBeenCalledWith(mockResponse.user);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should alert invalid form on submit with invalid form', () => {
    spyOn(window, 'alert');
    component.registerForm.setValue({
      name: '',
      email: '',
      password: ''
    });
    component.submit();
    expect(window.alert).toHaveBeenCalledWith('Formulaire invalide');
  });
});
