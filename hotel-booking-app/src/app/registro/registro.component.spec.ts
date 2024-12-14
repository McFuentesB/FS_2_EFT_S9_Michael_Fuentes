import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { Router } from '@angular/router';

// Mock del servicio Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    router = new MockRouter();

    // Configuración del TestBed sin NgModule, solo el componente
    await TestBed.configureTestingModule({
      providers: [
        RegistroComponent,  // Directamente el componente que queremos probar
        { provide: Router, useValue: router },  // Mock del router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado correctamente
  });



  it('debería mostrar una alerta si el correo electrónico no es válido', () => {
    // Simula los datos del formulario con un correo electrónico incorrecto
    component.username = 'testUser';
    component.email = 'invalid-email';
    component.password = 'Password1';
    component.confirmPassword = 'Password1';
    component.birthdate = '2000-01-01';

    spyOn(window, 'alert');  // Espía sobre la función alert

    // Llamamos al método onRegister
    component.onRegister();

    expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa un correo electrónico válido.');
  });

  it('debería mostrar una alerta si las contraseñas no coinciden', () => {
    // Simula datos del formulario con contraseñas no coincidentes
    component.username = 'testUser';
    component.email = 'test@example.com';
    component.password = 'Password1';
    component.confirmPassword = 'Password2';
    component.birthdate = '2000-01-01';

    spyOn(window, 'alert');  // Espía sobre la función alert

    // Llamamos al método onRegister
    component.onRegister();

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden.');
  });

  


  it('debería limpiar el formulario correctamente', () => {
    // Simula que se llenaron los campos
    component.username = 'testUser';
    component.email = 'test@example.com';
    component.password = 'Password1';
    component.confirmPassword = 'Password1';
    component.birthdate = '2000-01-01';

    component.clearForm();  // Llamamos al método clearForm

    expect(component.username).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
    expect(component.birthdate).toBe('');
  });

  it('debería redirigir al login cuando se haga clic en el botón "¿Ya tienes cuenta? Inicia sesión"', () => {
    component.goToLogin();  // Llamamos al método goToLogin

    expect(router.navigate).toHaveBeenCalledWith(['/login']);  // Verifica que la navegación ocurra
  });

  it('debería almacenar los valores del formulario en las propiedades del componente al escribir en los campos', () => {
    // Simula la escritura en los campos
    const usernameInput = fixture.nativeElement.querySelector('#username');
    usernameInput.value = 'testUser';
    usernameInput.dispatchEvent(new Event('input'));

    const emailInput = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    const passwordInput = fixture.nativeElement.querySelector('#password');
    passwordInput.value = 'Password1';
    passwordInput.dispatchEvent(new Event('input'));

    const confirmPasswordInput = fixture.nativeElement.querySelector('#confirmPassword');
    confirmPasswordInput.value = 'Password1';
    confirmPasswordInput.dispatchEvent(new Event('input'));

    const birthdateInput = fixture.nativeElement.querySelector('#birthdate');
    birthdateInput.value = '2000-01-01';
    birthdateInput.dispatchEvent(new Event('input'));

    expect(component.username).toBe('testUser');
    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('Password1');
    expect(component.confirmPassword).toBe('Password1');
    expect(component.birthdate).toBe('2000-01-01');
  });
});
 