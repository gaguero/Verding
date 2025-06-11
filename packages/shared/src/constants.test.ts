import {
  API_CONFIG,
  DESIGN_SYSTEM,
  MICROGREENS,
  STATUS,
  ERROR_CODES,
  type GrowthStage,
  type TaskStatus,
  type OrderStatus,
} from './constants';

describe('Constants', () => {
  describe('API_CONFIG', () => {
    it('should have default timeout configuration', () => {
      expect(API_CONFIG.DEFAULT_TIMEOUT).toBe(30000);
      expect(API_CONFIG.MAX_RETRIES).toBe(3);
      expect(API_CONFIG.RETRY_DELAY).toBe(1000);
    });
  });

  describe('DESIGN_SYSTEM', () => {
    it('should have correct spacing system', () => {
      expect(DESIGN_SYSTEM.SPACING.DEFAULT).toBe(16);
      expect(DESIGN_SYSTEM.SPACING.SMALL).toBe(8);
      expect(DESIGN_SYSTEM.SPACING.LARGE).toBe(32);
    });

    it('should have correct color palette', () => {
      expect(DESIGN_SYSTEM.COLORS.PRIMARY_EARTH_GREEN).toBe('#2C5545');
      expect(DESIGN_SYSTEM.COLORS.ACCENT_TEAL).toBe('#00A896');
    });

    it('should have correct breakpoints', () => {
      expect(DESIGN_SYSTEM.BREAKPOINTS.MOBILE).toBe(320);
      expect(DESIGN_SYSTEM.BREAKPOINTS.TABLET).toBe(600);
      expect(DESIGN_SYSTEM.BREAKPOINTS.DESKTOP).toBe(1024);
    });
  });

  describe('MICROGREENS', () => {
    it('should have growth stages', () => {
      expect(MICROGREENS.GROWTH_STAGES).toContain('SEED');
      expect(MICROGREENS.GROWTH_STAGES).toContain('HARVEST');
      expect(MICROGREENS.GROWTH_STAGES.length).toBe(5);
    });

    it('should have growing days for common varieties', () => {
      expect(MICROGREENS.DEFAULT_GROWING_DAYS.ARUGULA).toBe(7);
      expect(MICROGREENS.DEFAULT_GROWING_DAYS.RADISH).toBe(6);
    });
  });

  describe('TYPE SAFETY', () => {
    it('should provide correct type utilities', () => {
      const growthStage: GrowthStage = 'SEED';
      const taskStatus: TaskStatus = 'PENDING';
      const orderStatus: OrderStatus = 'CONFIRMED';

      expect(MICROGREENS.GROWTH_STAGES).toContain(growthStage);
      expect(STATUS.TASK_STATUSES).toContain(taskStatus);
      expect(STATUS.ORDER_STATUSES).toContain(orderStatus);
    });
  });

  describe('ERROR_CODES', () => {
    it('should have standard error codes', () => {
      expect(ERROR_CODES.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
      expect(ERROR_CODES.NOT_FOUND).toBe('NOT_FOUND');
      expect(ERROR_CODES.UNAUTHORIZED).toBe('UNAUTHORIZED');
    });
  });
}); 
