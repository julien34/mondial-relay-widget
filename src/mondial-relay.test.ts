import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MondialRelay } from './mondial-relay';

describe('MondialRelay', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Create a container for the widget
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    container.remove();
    document.querySelectorAll('input[type="hidden"]').forEach(el => el.remove());
  });

  describe('normalizeOptions', () => {
    it('should require a brand code', async () => {
      await expect(
        MondialRelay.init(container, {
          brand: '',
        })
      ).rejects.toThrow('[MondialRelay] The "brand" option is required.');
    });

    it('should accept valid options', async () => {
      // Mock jQuery and dependencies
      (window as any).jQuery = vi.fn(() => ({
        MR_ParcelShopPicker: vi.fn(),
        trigger: vi.fn(),
        empty: vi.fn(),
      }));

      const instance = await MondialRelay.init(container, {
        brand: 'BDTEST  ',
        country: 'FR',
        postCode: '75001',
        deliveryMode: '24R',
      });

      expect(instance).toBeDefined();
      expect(typeof instance.search).toBe('function');
      expect(typeof instance.setParams).toBe('function');
      expect(typeof instance.rebindMap).toBe('function');
      expect(typeof instance.getSelectedId).toBe('function');
      expect(typeof instance.destroy).toBe('function');
    });
  });

  describe('WidgetInstance', () => {
    it('should have chainable methods', async () => {
      // Mock jQuery
      (window as any).jQuery = vi.fn(() => ({
        MR_ParcelShopPicker: vi.fn(),
        trigger: vi.fn(),
        empty: vi.fn(),
      }));

      const instance = await MondialRelay.init(container, {
        brand: 'BDTEST  ',
      });

      // Test chaining
      const result = instance.search('75001').setParams({ deliveryMode: '24L' }).rebindMap();
      expect(result).toBe(instance);
    });

    it('should return null when no relay is selected', async () => {
      // Mock jQuery
      (window as any).jQuery = vi.fn(() => ({
        MR_ParcelShopPicker: vi.fn(),
        trigger: vi.fn(),
        empty: vi.fn(),
      }));

      const instance = await MondialRelay.init(container, {
        brand: 'BDTEST  ',
      });

      const selectedId = instance.getSelectedId();
      expect(selectedId).toBeNull();
    });
  });
});

