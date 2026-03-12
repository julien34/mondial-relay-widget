# 🌍 Mondial Relay Widget - TypeScript/JavaScript Library

A lightweight, fully typed TypeScript/JavaScript wrapper for the [Mondial Relay](https://www.mondialrelay.com) parcel shop picker widget (v4.1). Works with any framework: React, Vue, Angular, Svelte, etc.

## ✨ Features

- 🎯 **Framework agnostic** - Works with React, Vue, Angular, Svelte, or vanilla JS
- 📦 **Automatic dependency loading** - Loads jQuery, Leaflet, and the MR widget automatically
- 🎨 **Full TypeScript support** - Fully typed, zero `any` types
- 🗺️ **Multiple map engines** - Leaflet (default) or Google Maps
- ⚡ **Lightweight** - Only ~6KB minified
- 🧹 **Clean API** - Simple, intuitive interface

## 📦 Installation

```bash
npm install mondial-relay
# or
yarn add mondial-relay
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { MondialRelay } from 'mondial-relay';

const widget = await MondialRelay.init('#container', {
  brand: 'BDTEST  ', // Your 8-char Mondial Relay code (padded with spaces)
  onSelect: (relay) => {
    console.log('Selected:', relay.id, relay.name, relay.address);
  },
});
```

### React Example

```tsx
import { useEffect, useRef } from 'react';
import { MondialRelay, WidgetInstance } from 'mondial-relay';

export function ShipmentWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<WidgetInstance | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    MondialRelay.init(containerRef.current, {
      brand: 'MYCODE  ',
      postCode: '75001',
      onSelect: (relay) => {
        console.log('Selected relay:', relay.name);
        // Save to your state/store
      },
      onSearchSuccess: (results) => {
        console.log('Found', results.length, 'relay points');
      },
      onNoResult: () => {
        console.log('No relay points found');
      },
    }).then((instance) => {
      widgetRef.current = instance;
    });

    return () => {
      widgetRef.current?.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
}
```

### Vue Example

```vue
<template>
  <div ref="container" />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { MondialRelay } from 'mondial-relay';

const container = ref(null);
let widget = null;

onMounted(async () => {
  widget = await MondialRelay.init(container.value, {
    brand: 'MYCODE  ',
    onSelect: (relay) => {
      console.log('Relay selected:', relay.name);
    },
  });
});

onUnmounted(() => {
  widget?.destroy();
});
</script>
```

## 📋 API Reference

### `MondialRelay.init(container, options)`

Initializes the widget in the given container.

**Parameters:**
- `container: string | HTMLElement` - CSS selector or DOM element
- `options: MondialRelayOptions` - Configuration object

**Returns:** `Promise<WidgetInstance>`

### Options

```typescript
interface MondialRelayOptions {
  // Required
  brand: string;                    // 8-char brand code (e.g. 'BDTEST  ')

  // Search filters
  country?: string;                 // ISO 2-letter code, default: 'FR'
  postCode?: string;                // Auto-search on load
  allowedCountries?: string;        // Comma-separated codes, e.g. 'FR,ES,BE'
  deliveryMode?: DeliveryMode;      // '24R' | '24L' | '24X' | 'DRI', default: '24R'
  nbResults?: number;               // Max results to show, default: 7
  weight?: number;                  // Parcel weight in grams
  searchDelay?: number;             // Days until drop-off
  searchFar?: number;               // Max search radius in km

  // Map settings
  showMap?: boolean;                // Show map, default: true
  mapInfo?: boolean;                // Show info on map select, default: true
  scrollWheel?: boolean;            // Scroll-to-zoom, default: false
  responsive?: boolean;             // Responsive layout, default: false

  // Features
  geolocation?: boolean;            // Offer browser geolocation, default: false
  customCss?: boolean;              // Disable built-in CSS, default: false
  useGoogleMaps?: boolean;          // Use Google Maps instead of Leaflet
  googleMapsKey?: string;           // Google Maps API key

  // Callbacks
  onSelect?: (relay: RelayPoint) => void;
  onSearchSuccess?: (results: RelayPoint[]) => void;
  onNoResult?: () => void;
}
```

### WidgetInstance API

```typescript
interface WidgetInstance {
  // Search for relay points by postal code
  search(postCode: string, country?: string): this;

  // Update parameters at runtime
  setParams(params: RuntimeParams): this;

  // Force map re-render (useful for modals/tabs)
  rebindMap(): this;

  // Get currently selected relay point ID
  getSelectedId(): string | null;

  // Destroy widget and clean up DOM
  destroy(): void;
}
```

### RelayPoint

```typescript
interface RelayPoint {
  id: string;           // Mondial Relay ID (e.g. '066974')
  name: string;         // Relay point name
  address: string;      // Full address
  postCode: string;     // Postal code
  city: string;         // City
  country: string;      // ISO 2-letter country code
  lat: string;          // Latitude
  lng: string;          // Longitude
  photo: string | null; // Photo URL if available
  hours: string;        // Opening hours (HTML table)
  _raw: MRRawRelay;     // Original unmodified MR data
}
```

## 💡 Examples

### Chainable API

```typescript
const widget = await MondialRelay.init('#picker', { brand: 'MYCODE  ' });

// Chain operations
widget
  .search('75001', 'FR')
  .setParams({ deliveryMode: '24L' })
  .rebindMap();

const selectedId = widget.getSelectedId();
console.log('Selected:', selectedId);
```

### Dynamic Parameter Changes

```typescript
widget.setParams({
  deliveryMode: '24X',        // Use friendly key
  weight: 5000,               // Update weight filter
  NbResults: '15',            // Or raw MR key
  CustomParam: 'value',       // Any raw MR parameter
});
```

### Google Maps

```typescript
const widget = await MondialRelay.init('#picker', {
  brand: 'MYCODE  ',
  useGoogleMaps: true,
  googleMapsKey: 'YOUR_GOOGLE_MAPS_API_KEY',
});
```

### Modal/Tab Handling

```typescript
// After modal opens or tab becomes visible
widget.rebindMap();
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern browsers with ES2020 support

## 📝 Notes

- Your brand code must be exactly 8 characters. Pad with trailing spaces if needed.
- Test brand code: `'BDTEST  '` (with 2 spaces)
- The widget automatically loads jQuery 2.2.4 and either Leaflet or Google Maps
- For production, consider caching these dependencies if loading multiple instances

## 🔗 Resources

- [Mondial Relay Widget Documentation](https://storage.mondialrelay.fr/widget-v-411.pdf)
- [JSFiddle Example](https://jsfiddle.net/MondialRelay/a9mxhow5/)

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to open issues and PRs.

