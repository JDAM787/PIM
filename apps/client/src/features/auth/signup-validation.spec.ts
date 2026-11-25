import { validateSignup } from './signup-validation';

const valid = {
  name: 'Ana Pérez',
  email: 'ana@gmail.com',
  password: 'secreta123',
};

describe('validateSignup', () => {
  it('pide nombre, correo y contraseña cuando están vacíos', () => {
    const errors = validateSignup({ name: '', email: '', password: '' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'name', 'password']);
  });

  it('rechaza contraseñas de menos de 8 caracteres', () => {
    expect(
      validateSignup({ ...valid, password: 'corta' }).password
    ).toBeDefined();
  });

  it('acepta correos personales sin exigir dominio corporativo', () => {
    expect(validateSignup(valid)).toEqual({});
  });

  it('no exige la empresa', () => {
    expect(validateSignup({ ...valid, company: undefined })).toEqual({});
  });
});
