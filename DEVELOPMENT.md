# N'HAP Agency - Git Branching Strategy

## Active Branches

### `main`
- **Purpose**: Production-ready code
- **Protection**: Requires pull requests and code review
- **Deployment**: Auto-deploy to production on merge
- **Status**: Currently points to initial commit

### `dev`
- **Purpose**: Development and integration branch
- **Target**: Primary branch for feature development
- **Deployment**: Deploy to staging on merge
- **Status**: Active - all feature branches created from here

## Branching Workflow

```
main (production)
  ↑
  └── [Pull Request]
      ↑
dev (staging/integration)
  ↑
  ├── feature/admin-auth
  ├── feature/email-notifications
  ├── feature/portfolio-section
  └── bugfix/form-validation
```

## Creating Feature Branches

```bash
# Update dev branch
git checkout dev
git pull origin dev

# Create feature branch from dev
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request: feature/your-feature-name → dev
```

## Pull Request Process

1. **Create**: Branch → dev
2. **Review**: Code review required
3. **Test**: Automated tests pass
4. **Merge**: Squash commit if desired
5. **Deploy**: Auto-deploy to staging

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic changes)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/updates
- `chore`: Build/dependency updates

**Example**:
```
feat(admin): add authentication to admin dashboard

- Implement login form with validation
- Add session management with localStorage
- Protect admin routes from unauthorized access

Closes #42
```

## Release Process

When ready to release to production:

1. Create release branch from dev:
   ```bash
   git checkout -b release/v1.0.0
   ```

2. Update version numbers and changelog

3. Create pull request: release/v1.0.0 → main

4. After merge to main:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

5. Deploy to production

6. Merge main back to dev to keep in sync

## Current Features in Progress

### On `dev`:
- ✅ Landing page (complete)
- ✅ Admin dashboard (complete)
- ✅ Backend API setup (ready)
- 🔜 Admin authentication
- 🔜 Email notifications
- 🔜 Portfolio section

## Local Development Setup

```bash
# Clone repository
git clone <repo-url>
cd nhap-agency

# Create local dev tracking branch
git checkout --track origin/dev

# Create feature branch
git checkout -b feature/your-feature

# Make changes
# ... edit files ...

# Stage and commit
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature
```

## Useful Git Commands

```bash
# View all branches
git branch -a

# Switch to branch
git checkout branch-name

# Create and switch
git checkout -b new-branch

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# View commit history
git log --oneline --graph --all

# See what changed
git diff main dev

# Rebase latest changes
git fetch origin
git rebase origin/dev
```

## Troubleshooting

### Branch behind main?
```bash
git checkout dev
git pull origin main
git push origin dev
```

### Merge conflicts?
```bash
git status  # See conflicts
# Fix files manually
git add .
git commit -m "fix: resolve merge conflicts"
git push origin feature/branch
```

### Accidentally committed to wrong branch?
```bash
git log  # Find commit hash
git reset --soft HEAD~1  # Undo last commit
git stash  # Save changes
git checkout correct-branch
git stash pop  # Apply changes
git commit
```

## Code Review Guidelines

- **For Reviewers**: 
  - Check code quality and consistency
  - Verify tests are included
  - Ensure documentation is updated
  - Provide constructive feedback

- **For PR Authors**:
  - Write clear commit messages
  - Include tests for new features
  - Update documentation
  - Request review when ready
  - Respond to feedback promptly

---

**Last Updated**: 2025-11-07  
**Repository Structure**: Complete with main and dev branches  
**Ready for**: Feature branch development and CI/CD integration
