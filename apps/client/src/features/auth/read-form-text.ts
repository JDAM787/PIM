/** Lee un campo de texto de un `FormData`; devuelve `''` si falta o es un archivo. */
export function readFormText(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === 'string' ? value : '';
}
