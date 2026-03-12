# Contributing to Mondial Relay Widget

Merci pour votre intérêt dans ce projet ! Voici comment contribuer.

## 🐛 Report a Bug

### Avant de créer un issue

- Vérifiez qu'il ne soit pas déjà reporté
- Vérifiez que vous utilisez la dernière version
- Collectez les informations utiles:
  - Version de la lib
  - Code qui reproduit le bug
  - Message d'erreur exact
  - Navigateur et version

### Créer un issue

Utilisez le format:

```markdown
## Description
Courte description du bug.

## Reproduction
```js
// Code qui reproduit le bug
const widget = await MondialRelay.init('#container', { ... });
```

## Expected behavior
Ce qui devrait se passer.

## Actual behavior
Ce qui se passe réellement.

## Environment
- lib version: 0.1.0
- Browser: Chrome 120
- Framework: React 18
```

---

## ✨ Suggérer une Feature

Avant de proposer, vérifiez:

- Ce n'est pas déjà planifié (voir CHANGELOG.md)
- C'est compatible avec l'API actuelle
- Ça apporte de la valeur à la majorité des utilisateurs

### Format de suggestion

```markdown
## Description
Description claire de la feature.

## Motivation
Pourquoi cette feature est nécessaire ?

## Example
Comment ça serait utilisé ?

```typescript
const widget = await MondialRelay.init('#container', {
  // nouvelle option
  myNewFeature: true,
});
```
```

---

## 🔧 Développement

### Setup

```bash
# Clone et setup
git clone https://github.com/yourusername/mondial-relay-widget.git
cd mondial-relay-widget
yarn install

# Vérifier que tout fonctionne
yarn lint
yarn test
yarn build
```

### Structure du code

```
src/
  ├─ mondial-relay.ts       # Lib principale
  │  ├─ Types MR bruts
  │  ├─ Types publics
  │  ├─ Loaders (loadScript, loadCss, loadDeps)
  │  ├─ Helpers (hidden inputs)
  │  ├─ normalizeOptions()
  │  └─ MondialRelay.init()
  └─ mondial-relay.test.ts  # Tests
```

### Avant de modifier

1. Créez une branche: `git checkout -b feature/ma-feature`
2. Modifiez le code
3. Testez: `yarn test`
4. Vérifiez les types: `yarn lint`
5. Buildez: `yarn build`

### Code Style

- TypeScript strict mode
- Commentaires JSDoc pour l'API publique
- Pas de `any` types
- Imports organizés

### Git Workflow

```bash
# Créer une branche descriptive
git checkout -b fix/jquery-loading-bug
# ou
git checkout -b feat/google-maps-support

# Commits courts et clairs
git commit -m "fix: handle jQuery load failure gracefully"

# Push et créer un PR
git push origin fix/jquery-loading-bug
```

### Commit messages

Utiliser le format [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature (feature nouvelle)
fix: fix bug (correction de bug)
docs: update documentation (doc)
test: add tests (ajout de tests)
refactor: reorganize code (refactoring)
```

Exemples:

```
feat: add support for custom CSS classes
fix: prevent memory leak when destroying widget
docs: add React hook example
test: increase coverage to 80%
refactor: simplify options normalization
```

---

## 📝 Modifier la Documentation

Si vous corrigez la doc:

1. README.md - Guide principal
2. DEVELOPMENT.md - Architecture
3. EXAMPLES.ts - Exemples de code
4. JSDoc dans le code

Assurez-vous que:
- Les exemples sont corrects et testés
- Les liens sont valides
- Le formatage est cohérent

---

## 🧪 Ajouter des Tests

Les tests utilisent [Vitest](https://vitest.dev/).

### Format

```typescript
import { describe, it, expect } from 'vitest';

describe('Feature name', () => {
  it('should do something', () => {
    const result = myFunction();
    expect(result).toBe(expected);
  });
});
```

### Principes

- Un test = une responsabilité
- Noms descriptifs
- Couvrir happy path + edge cases
- Mock les dépendances externes

### Lancer les tests

```bash
yarn test              # Tous les tests
yarn test --watch      # Mode watch
yarn test --coverage   # Couverture
```

---

## 🎯 Types de Contributions Acceptées

✅ Bug fixes  
✅ Améliorations de performance  
✅ Amélioration des types TypeScript  
✅ Meilleure documentation  
✅ Exemples supplémentaires  
✅ Amélioration de l'accessibilité  
✅ Support pour plus de navigateurs  

---

## ⚠️ Ce qui ne sera pas accepté

❌ Modifications qui cassent l'API  
❌ Dépendances externes non essentielles  
❌ Code qui diminue la couverture de tests  
❌ Suppression de fonctionnalités existantes  

---

## 📦 Pull Request Process

1. **Update branches**: Mergez master dans votre branche
2. **Tests**: `yarn test` doit passer
3. **Types**: `yarn lint` doit passer
4. **Build**: `yarn build` doit réussir
5. **Description**: Décrivez clairement les changements
6. **Linked issue**: Référencez l'issue si applicable

### Template PR

```markdown
## Description
Brève description des changements.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Related Issue
Closes #123

## Testing
Comment tester le changement ?

## Checklist
- [ ] Mon code suit le style du projet
- [ ] J'ai testé mon code
- [ ] J'ai mis à jour la documentation si nécessaire
- [ ] Tests and types pass (`yarn test && yarn lint`)
```

---

## 📋 Checklist pour les Mainteneurs

- [ ] Tests passent
- [ ] Types TypeScript corrects
- [ ] Documentation à jour
- [ ] CHANGELOG.md mis à jour
- [ ] Code bien commenté
- [ ] Pas de breaking changes non documentés

---

## 🎓 Ressources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [Vitest Documentation](https://vitest.dev/)

---

## 📞 Questions ?

- Ouvrez une **Discussion** sur GitHub
- Consultez la [Documentation](./README.md)
- Vérifiez les [Examples](./EXAMPLES.ts)

---

## ✨ Merci !

Votre contribution rend ce projet meilleur pour tout le monde ! 🙏

---

*Code of Conduct: Soyez respectueux et bienveillant envers tous les contributeurs.*

