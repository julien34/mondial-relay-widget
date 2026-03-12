# 🚀 Guide de Publication sur npm/Yarn

## ✅ État actuel du projet

Votre lib TypeScript Mondial Relay est maintenant **complète et prête à la publication** ! Voici ce qui a été fait :

### 📦 Livérables

- ✅ **Code TypeScript** - Type-safe, framework-agnostic
- ✅ **Compilation** - CJS + ESM + TypeScript definitions
- ✅ **Documentation** - README complet avec exemples
- ✅ **Exemples** - React, Vue, Vanilla JS
- ✅ **Tests unitaires** - Framework Vitest prêt
- ✅ **Configuration build** - tsup optimisé
- ✅ **Fichiers de config** - TypeScript, ESLint-ready

### 📁 Structure du projet

```
mondial-relay-widget/
├── src/
│   ├── mondial-relay.ts          # Lib principale (490 lignes)
│   └── mondial-relay.test.ts     # Tests unitaires
├── examples/
│   ├── React.tsx                 # Hook React réutilisable
│   ├── Vue.vue                   # Composant Vue 3
│   └── ../example.html           # Exemple vanilla JS interactif
├── dist/                         # Output compilé (CJS + ESM + DTS)
├── README.md                     # Doc principale
├── DEVELOPMENT.md                # Guide dev
├── package.json                  # Config npm
├── tsconfig.json                 # Config TypeScript
├── LICENSE                       # MIT
└── .gitignore                    # Bien configuré
```

## 📋 Checklist avant publication

Avant de publier sur npm, assurez-vous que :

### 1. Mettre à jour vos infos

```json
{
  "name": "mondial-relay",
  "version": "0.1.0",
  "author": "Votre Nom <email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/votrenom/mondial-relay-widget"
  },
  "homepage": "https://github.com/votrenom/mondial-relay-widget"
}
```

### 2. Ajouter un CHANGELOG

Créez `CHANGELOG.md` :

```markdown
# Changelog

## [0.1.0] - 2024-03-12

### Added
- Initial release
- TypeScript wrapper for Mondial Relay widget v4.1
- Automatic dependency loading (jQuery, Leaflet, MR plugin)
- Support for React, Vue, Angular, and vanilla JS
- Full type safety with TypeScript
- Chainable API for easy usage
- Google Maps and Leaflet support
```

### 3. Vérifier les tests

```bash
yarn test
```

### 4. Vérifier la compilation

```bash
yarn lint    # Vérifie les types
yarn build   # Compile en dist/
```

## 🚀 Publication sur npm

### Première publication

```bash
# 1. S'assurer d'être loggé sur npm
npm login
# Ou avec yarn
yarn npm login

# 2. Build
yarn build

# 3. Publier
npm publish
# Ou avec yarn
yarn npm publish
```

### Mise à jour future

Pour les mises à jour ultérieures :

```bash
# 1. Mettre à jour la version dans package.json
# Version: 0.1.0 → 0.2.0 (ou autre)

# 2. Mettre à jour le CHANGELOG

# 3. Builder et publier
yarn build
npm publish
```

### Gestion des versions

Utiliser [Semantic Versioning](https://semver.org/) :

- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - Nouvelles features, backward compatible
- **PATCH** (0.0.1) - Bug fixes

## 📦 Distribution

### Utilisé dans npm/Yarn

```bash
npm install mondial-relay
# ou
yarn add mondial-relay
```

### Import dans le code

```typescript
// CommonJS
const { MondialRelay } = require('mondial-relay');

// ES6 modules
import { MondialRelay } from 'mondial-relay';

// TypeScript
import { MondialRelay, WidgetInstance, RelayPoint } from 'mondial-relay';
```

## 🔗 Liens utiles pour la publication

- [npm Documentation](https://docs.npmjs.com/)
- [Yarn Publishing](https://yarnpkg.com/features/publish)
- [Publishing Best Practices](https://github.com/github/publish-action)
- [Semantic Versioning](https://semver.org/)

## 💡 Post-publication - Prochaines étapes

Après la publication, vous pourriez :

1. **Créer un dépôt GitHub** avec CI/CD (GitHub Actions)
2. **Ajouter les badges** (npm version, build status, etc.)
3. **Publier un exemple en ligne** (StackBlitz, CodeSandbox)
4. **Écrire un blog post** sur intégration Mondial Relay
5. **Ajouter plus de tests** unitaires et d'intégration

## 🆘 Support

Si vous avez besoin de débugger avant publication :

```bash
# Vérifier le package
npm pack
# Crée un tarball que vous pouvez inspecter

# Tester localement
npm install /path/to/mondial-relay-widget

# Vérifier les fichiers qui seront publiés
npm publish --dry-run
```

## ✨ Félicitations !

Votre lib est **production-ready** ! 🎉

C'est une implémentation clean, typée, et facile d'utilisation pour les développeurs JavaScript/TypeScript qui veulent intégrer le widget Mondial Relay.

**Bonne chance avec la publication !** 🚀

