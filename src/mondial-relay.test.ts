import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MondialRelay } from './mondial-relay';

describe('MondialRelay', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Create a container for the widget
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);

    // Mock jQuery BEFORE each test
    (window as any).jQuery = vi.fn(() => ({
      MR_ParcelShopPicker: vi.fn(),
      trigger: vi.fn(),
      empty: vi.fn(),
    }));

    // Mock Leaflet to prevent script loading
    (window as any).L = {
      map: vi.fn(),
      tileLayer: vi.fn(),
    };

    // Mock the loadScript to resolve immediately
    const originalQuerySelector = document.querySelector.bind(document);
    vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      // Always return null for script checks to prevent waiting for real script loads
      if (typeof selector === 'string' && selector.includes('script[src=')) {
        return null;
      }
      return originalQuerySelector(selector) as any;
    });

    // Mock document.head.appendChild to prevent actual script loading
    const originalAppendChild = document.head.appendChild.bind(document.head);
    vi.spyOn(document.head, 'appendChild').mockImplementation((node: any) => {
      // Skip appending scripts to prevent actual network requests
      if (node.tagName === 'SCRIPT') {
        // Simulate script load
        setTimeout(() => {
          if (node.onload) {
            node.onload();
          }
        }, 0);
        return node;
      }
      return originalAppendChild(node);
    });
  });

  afterEach(() => {
    // Clean up
    container.remove();
    document.querySelectorAll('input[type="hidden"]').forEach(el => el.remove());
    delete (window as any).jQuery;
    delete (window as any).L;
    vi.clearAllMocks();
    vi.restoreAllMocks();
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
      const instance = await MondialRelay.init(container, {
        brand: 'BDTEST  ',
      });

      // Test chaining
      const result = instance.search('75001').setParams({ deliveryMode: '24L' }).rebindMap();
      expect(result).toBe(instance);
    });

    it('should return null when no relay is selected', async () => {

      const instance = await MondialRelay.init(container, {
        brand: 'BDTEST  ',
      });

      const selectedId = instance.getSelectedId();
      expect(selectedId).toBeNull();
    });
  });
});

