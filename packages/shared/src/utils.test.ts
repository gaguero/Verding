import { formatDate, generateId } from './utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format date to YYYY-MM-DD format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date);
      expect(result).toBe('2024-01-15');
    });
  });

  describe('generateId', () => {
    it('should generate a string id', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('should generate unique ids', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });
});
