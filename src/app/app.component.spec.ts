import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [AppComponent],
      providers: [TranslateService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should use the language from localStorage if available', () => {
    const language = { code: 'en' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(language));
    spyOn(translateService, 'use').and.callThrough();

    // Re-créer le composant pour que le constructeur soit appelé avec les mocks de localStorage et translateService
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(translateService.use).toHaveBeenCalledWith(language.code);
  });

  it('should not set language if not available in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(translateService, 'use').and.callThrough();

    // Re-créer le composant pour que le constructeur soit appelé avec les mocks de localStorage et translateService
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(translateService.use).not.toHaveBeenCalled();
  });
});
