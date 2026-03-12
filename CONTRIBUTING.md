# Contributing to Mondial Relay Widget

Thank you for your interest in this project! Here's how to contribute.

## 🐛 Report a Bug

### Before creating an issue

- Check if it's not already reported
- Verify you're using the latest version
- Collect useful information:
  - Library version
  - Code that reproduces the bug
  - Exact error message
  - Browser and version

### Create an issue

Use the format:

```markdown
## Description
Brief description of the bug.

## Reproduction
```js
// Code that reproduces the bug
const widget = await MondialRelay.init('#container', { ... });
```

## Expected behavior
What should happen.

## Actual behavior
What actually happens.

## Environment
- lib version: 0.1.0
- Browser: Chrome 120
- Framework: React 18
```

---

## ✨ Suggest a Feature

Before proposing, verify:

- It's not already planned (see CHANGELOG.md)
- It's compatible with the current API
- It brings value to most users

### Suggestion format

```markdown
## Description
Clear description of the feature.

## Motivation
Why is this feature necessary?

## Example
How would it be used?

```typescript
const widget = await MondialRelay.init('#container', {
  // new option
  myNewFeature: true,
});
```
```

---

## 🔧 Development

### Setup

```bash
# Clone and setup
git clone https://github.com/yourusername/mondial-relay-widget.git
cd mondial-relay-widget
yarn install

# Check that everything works
yarn lint
yarn test
yarn build
```

### Code structure

```
src/
  ├─ mondial-relay.ts       # Main library
  │  ├─ Raw MR types
  │  ├─ Public types
  │  ├─ Loaders (loadScript, loadCss, loadDeps)
  │  ├─ Helpers (hidden inputs)
  │  ├─ normalizeOptions()
  │  └─ MondialRelay.init()
  └─ mondial-relay.test.ts  # Tests
```

### Before modifying

1. Create a branch: `git checkout -b feature/my-feature`
2. Modify the code
3. Test: `yarn test`
4. Check types: `yarn lint`
5. Build: `yarn build`

### Code Style

- TypeScript strict mode
- JSDoc comments for public API
- No `any` types
- Organized imports

### Git Workflow

```bash
# Create a descriptive branch
git checkout -b fix/jquery-loading-bug
# or
git checkout -b feat/google-maps-support

# Short and clear commits
git commit -m "fix: handle jQuery load failure gracefully"

# Push and create a PR
git push origin fix/jquery-loading-bug
```

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add new feature
fix: fix a bug
docs: update documentation
test: add tests
refactor: reorganize code
```

Examples:

```
feat: add support for custom CSS classes
fix: prevent memory leak when destroying widget
docs: add React hook example
test: increase coverage to 80%
refactor: simplify options normalization
```

---

## 📝 Modify Documentation

If you fix documentation:

1. README.md - Main guide
2. DEVELOPMENT.md - Architecture
3. EXAMPLES.ts - Code examples
4. JSDoc in the code

Make sure:
- Examples are correct and tested
- Links are valid
- Formatting is consistent

---

## 🧪 Add Tests

Tests use [Vitest](https://vitest.dev/).

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

### Principles

- One test = one responsibility
- Descriptive names
- Cover happy path + edge cases
- Mock external dependencies

### Run tests

```bash
yarn test              # All tests
yarn test --watch      # Watch mode
yarn test --coverage   # Coverage
```

---

## 🎯 Types of Accepted Contributions

✅ Bug fixes  
✅ Performance improvements  
✅ TypeScript type improvements  
✅ Better documentation  
✅ Additional examples  
✅ Accessibility improvements  
✅ Support for more browsers  

---

## ⚠️ What will not be accepted

❌ Modifications that break the API  
❌ Non-essential external dependencies  
❌ Code that reduces test coverage  
❌ Removal of existing features  

---

## 📦 Pull Request Process

1. **Update branches**: Merge master into your branch
2. **Tests**: `yarn test` must pass
3. **Types**: `yarn lint` must pass
4. **Build**: `yarn build` must succeed
5. **Description**: Clearly describe the changes
6. **Linked issue**: Reference the issue if applicable

### PR Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Related Issue
Closes #123

## Testing
How to test the change?

## Checklist
- [ ] My code follows the project style
- [ ] I have tested my code
- [ ] I have updated documentation if necessary
- [ ] Tests and types pass (`yarn test && yarn lint`)
```

---

## 📋 Maintainers Checklist

- [ ] Tests pass
- [ ] TypeScript types correct
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Code well commented
- [ ] No undocumented breaking changes

---

## 🎓 Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [Vitest Documentation](https://vitest.dev/)

---

## 📞 Questions?

- Open a **Discussion** on GitHub
- Check the [Documentation](./README.md)
- See the [Examples](./EXAMPLES.ts)

---

## ✨ Thank You!

Your contribution makes this project better for everyone! 🙏

---

*Code of Conduct: Be respectful and kind to all contributors.*

