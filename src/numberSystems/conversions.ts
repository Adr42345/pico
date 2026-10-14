export type NumberBase = 'binary' | 'denary' | 'hexadecimal';

export function parseBinary(value: string): number | null {
  const clean = value.trim();
  return /^[01]+$/.test(clean) ? Number.parseInt(clean, 2) : null;
}

export function parseHex(value: string): number | null {
  const clean = value.trim().replace(/^0x/i, '');
  return /^[0-9a-f]+$/i.test(clean) ? Number.parseInt(clean, 16) : null;
}

export function formatBinary(value: number, width?: number): string {
  if (!Number.isInteger(value) || value < 0) throw new Error('Binary values must be non-negative integers.');
  const result = value.toString(2);
  return width ? result.padStart(width, '0') : result;
}

export function formatHex(value: number, uppercase = true): string {
  if (!Number.isInteger(value) || value < 0) throw new Error('Hexadecimal values must be non-negative integers.');
  const result = value.toString(16);
  return uppercase ? result.toUpperCase() : result.toLowerCase();
}

export function parseValue(value: string, base: NumberBase): number | null {
  if (base === 'binary') return parseBinary(value);
  if (base === 'hexadecimal') return parseHex(value);
  const clean = value.trim();
  if (!/^\d+$/.test(clean)) return null;
  const parsed = Number(clean);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export function convert(value: string, from: NumberBase, to: NumberBase, options: { width?: number; uppercase?: boolean } = {}): string | null {
  const number = parseValue(value, from);
  if (number === null) return null;
  if (to === 'binary') return formatBinary(number, options.width);
  if (to === 'hexadecimal') return formatHex(number, options.uppercase ?? true);
  return String(number);
}

export function addBinary(left: string, right: string, width?: number): { result: string; overflow: boolean; fullResult: string } | null {
  const a = parseBinary(left), b = parseBinary(right);
  if (a === null || b === null) return null;
  const fullResult = formatBinary(a + b);
  const result = formatBinary(a + b, width);
  return { result: width ? result.slice(-width) : result, overflow: Boolean(width && fullResult.length > width), fullResult };
}

export function randomInteger(min: number, exclusiveMax: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(exclusiveMax) || min < 0 || exclusiveMax <= min) throw new Error('Enter a valid range with a non-negative minimum and an exclusive maximum above it.');
  return min + Math.floor(Math.random() * (exclusiveMax - min));
}

export function randomBinary(width: number, min = 0, exclusiveMax = 2 ** width): string {
  return formatBinary(randomInteger(min, Math.min(exclusiveMax, 2 ** width)), width);
}
