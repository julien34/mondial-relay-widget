# Development Guide

## Setup

```bash
# Install dependencies
yarn install

# Build the library
yarn build

# Run tests
yarn test

# Type check
yarn lint
```

## Project Structure

```
mondial-relay-widget/
├── src/
│   └── mondial-relay.ts          # Main library code
├── examples/
│   ├── React.tsx                 # React hook example
│   ├── Vue.vue                   # Vue 3 composition API example
│   └── index.html                # Vanilla JS example
├── dist/                         # Compiled output (generated)
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## Commands

### `yarn build`
Compiles TypeScript to JavaScript (CJS + ESM) with type definitions.
Output goes to the `dist/` directory.

### `yarn lint`
Runs TypeScript compiler in check-only mode. Validates all types.

### `yarn test`
Runs the Vitest test suite (add tests in `src/**/*.test.ts`).

## Publishing to npm

### Prepare

1. Update `version` in `package.json`
2. Update `CHANGELOG.md` (if you have one)
3. Ensure all tests pass: `yarn test`
4. Ensure types check: `yarn lint`

### Publish

```bash
# Build before publishing
yarn build

# Login to npm (one time)
npm login

# Publish
npm publish
```

Or use yarn:

```bash
yarn npm publish
```

## Architecture

### Type Definitions

The library exports several key types:

- **`MondialRelayOptions`** - Configuration for `init()`
- **`WidgetInstance`** - The returned object with methods to control the widget
- **`RelayPoint`** - Normalized data for a selected relay point

### Dependency Injection

The library automatically loads:

1. **jQuery 2.2.4** - Required by the MR widget plugin
2. **Leaflet.js** - For the map (or Google Maps if enabled)
3. **Mondial Relay Widget Plugin** - The actual picker UI

These are loaded via script tags in `loadDeps()`.

### Plugin Communication

The library communicates with the MR widget via:

- **jQuery element methods**: `$(el).MR_ParcelShopPicker(options)`
- **jQuery events**: `.trigger('MR_DoSearch', ...)`, `.trigger('MR_SetParams', ...)`
- **Hidden input fields**: Store selected relay ID

## Key Implementation Details

### Options Normalization

`normalizeOptions()` transforms the friendly JavaScript API to the MR plugin's camelCase/PascalCase format:

- `deliveryMode` → `ColLivMod`
- `nbResults` → `NbResults`
- `useGoogleMaps` → `EnableGmap`
- etc.

### Callback Wrapping

Raw MR callbacks are wrapped to return normalized `RelayPoint` objects instead of raw MR data:

```typescript
raw.OnParcelShopSelected = (data: MRRawRelay) => {
  o.onSelect!({
    id: data.ID,
    name: data.Nom,
    // ... other transformations
    _raw: data, // Include original for power users
  });
};
```

### Lifecycle Management

- `init()` creates hidden input fields and mounts the widget
- `destroy()` removes the widget DOM and hidden inputs
- The instance captures `$el` and `opts` in closure for later use

## Browser Compatibility

- Requires ES2020 (JavaScript 2020)
- Uses DOM APIs: `document.querySelector`, `document.createElement`, etc.
- Depends on jQuery (loaded automatically)

For IE11 support, you would need:
- Different jQuery version (1.x)
- Babel transpilation target
- Not recommended - ES2020+ is the standard now

## Debugging

### Enable Browser DevTools

The library logs errors to `console.error()`. Check the browser console for:

- Failed script loads
- jQuery not found
- Widget not initialized errors

### Common Issues

**"jQuery is required but was not loaded"**
- Check network tab to ensure jQuery loaded successfully
- May be blocked by CORS or ad blocker

**"Container not found"**
- Ensure the selector/element exists in the DOM before calling `init()`

**Map not showing**
- Call `rebindMap()` if the container was hidden when initialized

**Styles missing**
- Check if `customCss: true` is set (disables built-in styles)

## Contributing

When adding features:

1. Update the `MondialRelayOptions` interface first
2. Add the option transformation in `normalizeOptions()`
3. Update the README with examples
4. Add tests in `src/*.test.ts`
5. Run `yarn lint` and `yarn test` before submitting PR

## Resources

- [Mondial Relay Widget v4.1 PDF](https://storage.mondialrelay.fr/widget-v-411.pdf)
- [JSFiddle Example](https://jsfiddle.net/MondialRelay/a9mxhow5/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

