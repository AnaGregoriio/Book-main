import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service'; // Importe o AuthService
import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    // Criar um stub para o AuthService
    authServiceStub = {
      init: async () => {},
      isUserLoggedIn: async () => true, // Simula que o usuário está logado
      logout: async () => {},
    };

    await TestBed.configureTestingModule({
      declarations: [TabsPage],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if user is logged in on init', async () => {
    await component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue(); // Verifica se o usuário está logado
  });
});
