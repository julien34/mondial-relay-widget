<template>
  <div class="mondial-relay-container">
    <div ref="containerRef" class="widget-mount-point" />

    <div v-if="selectedRelay" class="selected-relay-info">
      <h3>✅ Relay Point Selected</h3>
      <p>
        <strong>{{ selectedRelay.name }}</strong>
        <br />
        {{ selectedRelay.address }}
        <br />
        {{ selectedRelay.postCode }} {{ selectedRelay.city }}, {{ selectedRelay.country }}
      </p>
      <small>ID: {{ selectedRelay.id }}</small>
    </div>

    <div class="widget-controls">
      <button @click="search('75001')">Search Paris</button>
      <button @click="search('13000')">Search Marseille</button>
      <button @click="rebindMap">Rebind Map</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { MondialRelay, WidgetInstance, RelayPoint } from 'mondial-relay';

const containerRef = ref<HTMLDivElement>(null);
let widget: WidgetInstance | null = null;
const selectedRelay = ref<RelayPoint | null>(null);

onMounted(async () => {
  if (!containerRef.value) return;

  try {
    widget = await MondialRelay.init(containerRef.value, {
      brand: 'BDTEST  ', // Use your brand code here
      country: 'FR',
      postCode: '75001',
      deliveryMode: '24R',
      nbResults: 7,
      showMap: true,
      mapInfo: true,

      onSelect: (relay) => {
        selectedRelay.value = relay;
        console.log('Relay point selected:', relay);
      },

      onSearchSuccess: (results) => {
        console.log(`Found ${results.length} relay points`);
      },

      onNoResult: () => {
        console.log('No relay points found');
        selectedRelay.value = null;
      },
    });
  } catch (error) {
    console.error('Failed to initialize widget:', error);
  }
});

onUnmounted(() => {
  widget?.destroy();
  widget = null;
});

const search = (postCode: string) => {
  widget?.search(postCode, 'FR');
};

const rebindMap = () => {
  widget?.rebindMap();
};
</script>

<style scoped>
.mondial-relay-container {
  padding: 20px;
}

.widget-mount-point {
  min-height: 400px;
  margin-bottom: 20px;
  border: 2px dashed #667eea;
  border-radius: 8px;
  padding: 20px;
}

.selected-relay-info {
  background: #f0fff4;
  border-left: 4px solid #48bb78;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.widget-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

button:hover {
  background: #764ba2;
  transform: translateY(-2px);
}
</style>

