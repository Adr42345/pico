import { describe, expect, it } from 'vitest';
import { addBinary, convert, formatBinary, formatHex, parseValue, randomInteger } from './conversions';

describe('number-system conversions', () => {
  it('converts denary and binary with fixed widths', () => {
    expect(formatBinary(0, 8)).toBe('00000000');
    expect(formatBinary(173, 8)).toBe('10101101');
    expect(formatBinary(255, 8)).toBe('11111111');
    expect(convert('10101101', 'binary', 'denary')).toBe('173');
  });
  it('converts between binary and hexadecimal', () => {
    expect(convert('10101101', 'binary', 'hexadecimal')).toBe('AD');
    expect(convert('AD', 'hexadecimal', 'denary')).toBe('173');
    expect(convert('7B', 'hexadecimal', 'denary')).toBe('123');
    expect(convert('7B', 'hexadecimal', 'binary', { width: 8 })).toBe('01111011');
    expect(formatHex(173)).toBe('AD');
  });
  it('rejects malformed inputs', () => {
    expect(parseValue('102', 'binary')).toBeNull();
    expect(parseValue('G1', 'hexadecimal')).toBeNull();
    expect(parseValue('-1', 'denary')).toBeNull();
  });
  it('preserves binary addition overflow', () => {
    expect(addBinary('00001111', '00000001', 8)).toEqual({ result: '00010000', overflow: false, fullResult: '10000' });
    expect(addBinary('11111111', '00000001', 8)).toEqual({ result: '00000000', overflow: true, fullResult: '100000000' });
  });
  it('uses an exclusive random upper bound', () => {
    for (let i = 0; i < 100; i++) { const n = randomInteger(0, 16); expect(n).toBeGreaterThanOrEqual(0); expect(n).toBeLessThan(16); }
  });
});
