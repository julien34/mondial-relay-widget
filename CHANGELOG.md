# Changelog

Tous les changements notables de ce projet sont documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2024-03-12

### Added

- **Initial release** 🎉
- TypeScript wrapper for Mondial Relay widget v4.1
- Automatic dependency loading (jQuery 2.2.4, Leaflet, MR plugin)
- Framework-agnostic design - works with React, Vue, Angular, Svelte, etc.
- Fully typed TypeScript definitions with JSDoc
- Chainable API for intuitive usage
- Support for both Leaflet (default) and Google Maps
- Normalization of Mondial Relay plugin options to friendly API
- Event callbacks: `onSelect`, `onSearchSuccess`, `onNoResult`
- Programmatic control methods:
  - `search(postCode, country)` - Trigger search by postal code
  - `setParams(params)` - Update widget parameters at runtime
  - `rebindMap()` - Force map re-render (useful for hidden containers)
  - `getSelectedId()` - Get currently selected relay ID
  - `destroy()` - Clean up widget and DOM
- Multiple map engines: Leaflet (OpenStreetMap) and Google Maps
- Configurable options:
  - Country and postal code filters
  - Allowed countries list
  - Delivery modes (24R, 24L, 24X, DRI)
  - Number of results to display
  - Parcel weight filtering
  - Search radius
  - Responsive layout
  - Geolocation support
  - Custom CSS option
- Complete documentation with examples
- Examples for React, Vue 3, and vanilla JavaScript
- Unit tests with Vitest
- MIT License
- Build pipeline with tsup (CJS + ESM + TypeScript definitions)
- GitHub-ready (LICENSE, .gitignore, etc.)

### Documentation

- Comprehensive README with installation, quick start, API reference
- Development guide with architecture explanation
- Publication guide for npm/yarn
- Multiple code examples (React, Vue, HTML)
- JSDoc comments throughout the code

---

## Version Management

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new features (backward compatible)
- **PATCH** version for bug fixes

### Planned Features for Future Releases

- [ ] Event emitter pattern for finer-grained control
- [ ] Caching of loaded dependencies
- [ ] Support for multiple widgets on same page
- [ ] Accessibility improvements (ARIA labels)
- [ ] Offline mode detection
- [ ] Custom styling templates
- [ ] Advanced filtering options
- [ ] Integration with popular form libraries (React Hook Form, Formik)

### Known Limitations

- Requires jQuery 2.2.4 (loaded automatically)
- Leaflet or Google Maps required for map functionality
- Browser geolocation feature requires HTTPS in production
- Not compatible with IE11 without transpilation

---

## Contributing

See [DEVELOPMENT.md](./DEVELOPMENT.md) for guidelines on contributing to this project.

---

## Releases

### How to Release a New Version

1. Update the version in `package.json`
2. Update this `CHANGELOG.md` file with changes
3. Build the project: `yarn build`
4. Publish to npm: `npm publish`

Example for patch release:
```json
"version": "0.1.0" → "0.1.1"
```

Example for minor release:
```json
"version": "0.1.0" → "0.2.0"
```

Example for major release:
```json
"version": "0.1.0" → "1.0.0"
```

