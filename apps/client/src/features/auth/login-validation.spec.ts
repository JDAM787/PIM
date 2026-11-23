import { validateLogin } from './login-validation';

describe('validateLogin', () => {
  it('pide correo y contraseña cuando están vacíos', () => {
    const errors = validateLogin({ email: '', password: '' });
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });

  it('rechaza un correo con formato inválido', () => {
    expect(
      validateLogin({ email: 'juan@', password: 'x' }).email
    ).toBeDefined();
  });

  it('no devuelve errores con datos válidos', () => {
    expect(
      validateLogin({ email: 'juan@pim.dev', password: 'secreta' })
    ).toEqual({});
  });
});
