/**
 * Genera un slug SEO-friendly a partir de un texto
 * @param text - El texto del cual generar el slug (puede ser título, nombre, etc.)
 * @returns El slug generado en formato kebab-case
 *
 * @example
 * generateSlug('Camiseta Roja XL') // 'camiseta-roja-xl'
 * generateSlug('Pantalón Azul 2024') // 'pantalon-azul-2024'
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-'); // Elimina guiones duplicados
}
