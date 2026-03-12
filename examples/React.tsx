import { useEffect, useRef, useState } from 'react';
import { MondialRelay, WidgetInstance, RelayPoint } from 'mondial-relay';

export function MondialRelayWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<WidgetInstance | null>(null);
  const [selectedRelay, setSelectedRelay] = useState<RelayPoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    setIsLoading(true);

    MondialRelay.init(containerRef.current, {
      brand: 'BDTEST  ', // Use your brand code here
      country: 'FR',
      postCode: '75001', // Optional: auto-search on load
      deliveryMode: '24R',
      nbResults: 7,
      showMap: true,
      mapInfo: true,

      onSelect: (relay) => {
        setSelectedRelay(relay);
        console.log('Relay point selected:', relay);
      },

      onSearchSuccess: (results) => {
        console.log(`Found ${results.length} relay points`);
      },

      onNoResult: () => {
        console.log('No relay points found');
        setSelectedRelay(null);
      },
    })
      .then((instance) => {
        widgetRef.current = instance;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to initialize widget:', error);
        setIsLoading(false);
      });

    // Cleanup on unmount
    return () => {
      widgetRef.current?.destroy();
      widgetRef.current = null;
    };
  }, []);

  const handleSearch = (postCode: string) => {
    widgetRef.current?.search(postCode, 'FR');
  };

  const handleRebindMap = () => {
    widgetRef.current?.rebindMap();
  };

  if (isLoading) {
    return <div className="loading">Loading widget...</div>;
  }

  return (
    <div className="worldwide-relay-container">
      <div ref={containerRef} className="widget-mount-point" />

      {selectedRelay && (
        <div className="selected-relay-info">
          <h3>✅ Relay Point Selected</h3>
          <p>
            <strong>{selectedRelay.name}</strong>
            <br />
            {selectedRelay.address}
            <br />
            {selectedRelay.postCode} {selectedRelay.city}, {selectedRelay.country}
          </p>
          <small>ID: {selectedRelay.id}</small>
        </div>
      )}

      <div className="widget-controls">
        <button onClick={() => handleSearch('75001')}>Search Paris</button>
        <button onClick={() => handleSearch('13000')}>Search Marseille</button>
        <button onClick={handleRebindMap}>Rebind Map</button>
      </div>
    </div>
  );
}

