#!/usr/bin/env node

/**
 * Quick start example for the Mondial Relay Widget library
 *
 * To use this example:
 * 1. npm install mondial-relay
 * 2. Create an HTML file with: <div id="mr-widget"></div>
 * 3. Import and use as shown below
 */

import { MondialRelay, RelayPoint, WidgetInstance } from 'mondial-relay';

// ─────────────────────────────────────────────────────────────────────────

// Example 1: Basic usage
async function basicExample() {
  const widget = await MondialRelay.init('#mr-widget', {
    brand: 'BDTEST  ', // Use your Mondial Relay brand code
    country: 'FR',
    postCode: '75001', // Paris - will auto-search on load
    onSelect: (relay) => {
      console.log('✅ You selected:', relay.name);
      console.log('📍 Address:', relay.address);
      console.log('📦 ID:', relay.id);
    },
  });

  return widget;
}

// ─────────────────────────────────────────────────────────────────────────

// Example 2: Advanced with all options
async function advancedExample() {
  const widget = await MondialRelay.init('#mr-widget', {
    // Required
    brand: 'MYCODE  ',

    // Search filters
    country: 'FR',
    allowedCountries: 'FR,ES,BE', // Only these countries
    deliveryMode: '24R', // Standard Point Relais
    nbResults: 15, // Show 15 results instead of 7
    weight: 5000, // 5kg parcel
    searchFar: 50, // Search within 50km

    // Map settings
    showMap: true,
    mapInfo: true,
    scrollWheel: false, // Prevent scroll-to-zoom conflicts
    responsive: true, // Mobile-friendly

    // Features
    geolocation: true, // Offer geolocation search
    useGoogleMaps: false, // Use Leaflet (default)

    // Callbacks
    onSelect: (relay: RelayPoint) => {
      saveRelayToDatabase(relay);
      updateUI(relay);
    },

    onSearchSuccess: (results) => {
      console.log(`Found ${results.length} relay points`);
      updateResultCount(results.length);
    },

    onNoResult: () => {
      console.warn('No relay points found!');
      showErrorMessage('Aucun point relais trouvé dans cette zone.');
    },
  });

  return widget;
}

// ─────────────────────────────────────────────────────────────────────────

// Example 3: Programmatic control
async function controlExample() {
  const widget = await MondialRelay.init('#mr-widget', {
    brand: 'MYCODE  ',
  });

  // Search for a different postal code
  widget.search('13000', 'FR'); // Marseille

  // Update parameters at runtime
  widget.setParams({
    deliveryMode: '24X', // Switch to XXL
    nbResults: 20,
  });

  // Force map re-render (useful for hidden modals/tabs)
  widget.rebindMap();

  // Check what's selected
  const selectedId = widget.getSelectedId();
  if (selectedId) {
    console.log('Selected relay ID:', selectedId);
  }

  // Clean up when done
  // widget.destroy();

  return widget;
}

// ─────────────────────────────────────────────────────────────────────────

// Example 4: React Hook pattern
function useMondialRelayWidget(options: Parameters<typeof MondialRelay.init>[1]) {
  const [widget, setWidget] = React.useState<WidgetInstance | null>(null);
  const [selected, setSelected] = React.useState<RelayPoint | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    MondialRelay.init(containerRef.current, {
      ...options,
      onSelect: (relay) => {
        setSelected(relay);
        options.onSelect?.(relay);
      },
    }).then(setWidget);

    return () => widget?.destroy();
  }, []);

  return { widget, selected, containerRef };
}

// ─────────────────────────────────────────────────────────────────────────

// Example 5: Vue 3 Composable pattern
function useMondialRelay(options: Parameters<typeof MondialRelay.init>[1]) {
  const containerRef = Vue.ref<HTMLElement>(null);
  const widget = Vue.ref<WidgetInstance | null>(null);
  const selectedRelay = Vue.ref<RelayPoint | null>(null);

  Vue.onMounted(async () => {
    if (containerRef.value) {
      widget.value = await MondialRelay.init(containerRef.value, {
        ...options,
        onSelect: (relay) => {
          selectedRelay.value = relay;
        },
      });
    }
  });

  Vue.onUnmounted(() => {
    widget.value?.destroy();
  });

  return { containerRef, widget, selectedRelay };
}

// ─────────────────────────────────────────────────────────────────────────

// Helper functions (example implementations)

function saveRelayToDatabase(relay: RelayPoint) {
  console.log('Saving to database:', {
    id: relay.id,
    name: relay.name,
    address: relay.address,
    postCode: relay.postCode,
    city: relay.city,
    country: relay.country,
  });

  // In real app:
  // await fetch('/api/shipment/relay', {
  //   method: 'POST',
  //   body: JSON.stringify({ relayId: relay.id }),
  // });
}

function updateUI(relay: RelayPoint) {
  const element = document.getElementById('selected-relay-info');
  if (element) {
    element.innerHTML = `
      <h3>${relay.name}</h3>
      <p>${relay.address}</p>
      <p>${relay.postCode} ${relay.city}</p>
      <p><strong>ID:</strong> ${relay.id}</p>
    `;
  }
}

function updateResultCount(count: number) {
  const element = document.getElementById('result-count');
  if (element) {
    element.textContent = `${count} relay points found`;
  }
}

function showErrorMessage(message: string) {
  const element = document.getElementById('error-message');
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
  }
}

// ─────────────────────────────────────────────────────────────────────────

// Export for use in modules
export { basicExample, advancedExample, controlExample };
export { useMondialRelayWidget, useMondialRelay };

// Or run directly in browser:
// window.MRExamples = { basicExample, advancedExample, controlExample };

