# 📚 Index de Documentation Complet

## Bienvenue dans le projet Mondial Relay Widget ! 🌍

Ceci est votre guide d'orientation pour trouver rapidement ce dont vous avez besoin.

---

## 🚀 Je veux... 

### **...installer et utiliser la librairie**
👉 Lire: **[README.md](./README.md)**
- Installation npm/yarn
- Quick start
- API complète
- Exemples pour chaque framework

### **...publier sur npm**
👉 Lire: **[PUBLICATION.md](./PUBLICATION.md)**
- Checklist avant publication
- Commandes npm/yarn
- Gestion des versions
- Post-publication

### **...contribuer au projet**
👉 Lire: **[CONTRIBUTING.md](./CONTRIBUTING.md)**
- Comment reporter un bug
- Comment proposer une feature
- Git workflow
- Standards de code

### **...comprendre l'architecture**
👉 Lire: **[DEVELOPMENT.md](./DEVELOPMENT.md)**
- Structure du projet
- Implémentation détaillée
- Guide debugging
- Ressources de dev

### **...voir des exemples de code**
👉 Consulter:
- **[EXAMPLES.ts](./EXAMPLES.ts)** - 5 patterns différents
- **[example.html](./example.html)** - Demo interactive
- **[examples/React.tsx](./examples/React.tsx)** - Hook React
- **[examples/Vue.vue](./examples/Vue.vue)** - Composable Vue 3

### **...vérifier l'historique des versions**
👉 Lire: **[CHANGELOG.md](./CHANGELOG.md)**
- Liste complète des changements
- Versioning scheme
- Planned features

---

## 📂 Structure du Projet

```
mondial-relay-widget/
│
├── 📖 Documentation
│   ├── README.md              ← START HERE
│   ├── DEVELOPMENT.md         ← Pour les devs
│   ├── CONTRIBUTING.md        ← Pour les contributeurs
│   ├── PUBLICATION.md         ← Pour publier
│   ├── CHANGELOG.md           ← Historique
│   └── GUIDE.md               ← Ce fichier
│
├── 💻 Code Source
│   ├── src/
│   │   ├── mondial-relay.ts   ← Lib principale (490 lignes)
│   │   └── mondial-relay.test.ts ← Tests
│   │
│   └── dist/                  ← Build output (généré)
│       ├── mondial-relay.js      (CJS)
│       ├── mondial-relay.mjs     (ESM)
│       └── mondial-relay.d.ts    (TypeScript)
│
├── 🎨 Exemples
│   ├── example.html           ← Demo interactive
│   ├── EXAMPLES.ts            ← 5 patterns
│   ├── examples/React.tsx     ← React Hook
│   └── examples/Vue.vue       ← Vue 3
│
├── ⚙️ Configuration
│   ├── package.json           ← npm metadata
│   ├── tsconfig.json          ← TypeScript config
│   ├── validate-before-publish.sh ← Validation script
│   └── .gitignore             ← Git config
│
└── 📜 Legal
    └── LICENSE                ← MIT
```

---

## 🎯 Chemins d'Utilisation Courants

### Développeur Frontend - Intégration Rapide
1. Lire les premières sections de **README.md**
2. Copier l'exemple React/Vue qui vous convient
3. Adapter le brand code
4. Done! ✅

### Développeur TypeScript - Utilisation Avancée
1. Lire **README.md** complètement
2. Consulter **EXAMPLES.ts** pour les patterns
3. Utiliser le type system TypeScript
4. Lire **DEVELOPMENT.md** si besoin d'architecture

### Mainteneur du Projet - Contributions
1. Lire **CONTRIBUTING.md**
2. Lire **DEVELOPMENT.md** pour l'architecture
3. Faire les changements
4. Lancer: `yarn lint && yarn test && yarn build`
5. Créer un PR

### Avant Publication sur npm
1. Consulter **PUBLICATION.md**
2. Lancer: `./validate-before-publish.sh`
3. Mettre à jour **CHANGELOG.md**
4. Publier: `npm publish`

---

## 📊 Informations de Référence Rapide

### Versions Supportées
- **Node.js**: 14+
- **Navigateurs**: ES2020+ (Chrome 90+, Firefox 88+, Safari 14+)
- **jQuery**: 2.2.4 (chargé automatiquement)

### Taille
- **ES Modules**: ~6KB (minifié)
- **Gzippé**: ~2KB

### APIs Principales
```typescript
// Initialisation
await MondialRelay.init(container, options)

// Méthodes de l'instance
widget.search(postCode, country)
widget.setParams(params)
widget.rebindMap()
widget.getSelectedId()
widget.destroy()
```

### Options Principales
```typescript
brand: 'BDTEST  '           // Requis
country?: 'FR'              // Défaut FR
deliveryMode?: '24R'        // Ou 24L, 24X, DRI
onSelect?: (relay) => void
onSearchSuccess?: (results) => void
onNoResult?: () => void
```

---

## 🔗 Liens Rapides

### Documentation Externe
- [Mondial Relay Widget v4.1](https://storage.mondialrelay.fr/widget-v-411.pdf)
- [JSFiddle Example](https://jsfiddle.net/MondialRelay/a9mxhow5/)

### Standards
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Outils Utilisés
- [tsup](https://tsup.egoist.dev/) - Build tool
- [Vitest](https://vitest.dev/) - Testing framework
- [TypeScript](https://www.typescriptlang.org/) - Language

---

## ✅ Checklist Avant Publication

- [ ] Lire [PUBLICATION.md](./PUBLICATION.md)
- [ ] Mettre à jour author dans package.json
- [ ] Mettre à jour repository URL
- [ ] `yarn lint` passe ✓
- [ ] `yarn test` passe ✓
- [ ] `yarn build` réussit ✓
- [ ] `./validate-before-publish.sh` passe ✓
- [ ] Mettre à jour [CHANGELOG.md](./CHANGELOG.md)
- [ ] `npm publish --dry-run` fonctionne
- [ ] `npm publish` 🚀

---

## 🆘 Besoin d'Aide ?

| Question | Aller à |
|----------|---------|
| Comment installer? | [README.md](./README.md) - Installation section |
| Quel est le code API? | [README.md](./README.md) - API Reference |
| Comment contribuer? | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Comment débugger? | [DEVELOPMENT.md](./DEVELOPMENT.md) - Debugging |
| Comment publier? | [PUBLICATION.md](./PUBLICATION.md) |
| Exemples de code? | [EXAMPLES.ts](./EXAMPLES.ts) ou examples/ |
| Quel framework? | [README.md](./README.md) - Examples section |

---

## 🎓 Apprentissage Recommandé

### Pour Débutants
1. **README.md** (10 min) - Vue d'ensemble
2. **example.html** (5 min) - Voir une démo
3. **README.md** - Quick start section (5 min)
4. Essayer avec votre framework préféré

### Pour Développeurs Expérimentés
1. **DEVELOPMENT.md** - Architecture (15 min)
2. **src/mondial-relay.ts** - Code source (20 min)
3. **EXAMPLES.ts** - Patterns avancés (10 min)

### Pour Contributeurs
1. **CONTRIBUTING.md** (10 min)
2. **DEVELOPMENT.md** - Setup (5 min)
3. Git workflow standard

---

## 💡 Tips & Tricks

### Performance
- Les dépendances sont cachées après le premier chargement
- Réutilisez une instance plutôt que d'en créer plusieurs
- Appelez `rebindMap()` seulement quand nécessaire

### Debug
- Utilisez le DevTools du navigateur
- Vérifiez la console pour les erreurs
- `widget.getSelectedId()` pour vérifier la sélection

### Intégration
- Commencez par les exemples fournis
- Adaptez au lieu de récrire
- Consultez l'API si vous êtes bloqué

---

## 📞 Questions Fréquentes

**Q: Comment je change le mode de livraison?**  
A: `widget.setParams({ deliveryMode: '24L' })`

**Q: Comment je cherche un code postal précis?**  
A: `widget.search('75001', 'FR')`

**Q: La map ne s'affiche pas.**  
A: Appelez `widget.rebindMap()` après que le container devienne visible

**Q: Je dois supporter Google Maps?**  
A: Passez `useGoogleMaps: true` et `googleMapsKey` à `init()`

**Q: Comment je récupère l'ID sélectionné?**  
A: `const id = widget.getSelectedId()`

---

## 🎉 Vous êtes Prêt !

Vous avez tous les outils pour réussir ! 

- ✅ Code production-ready
- ✅ Documentation complète  
- ✅ Exemples pour chaque framework
- ✅ Scripts de validation
- ✅ Guide de contribution

**Bonne chance avec votre projet ! 🚀**

---

*Last Updated: March 2024*  
*Version: 0.1.0*  
*Status: Production Ready ✅*

