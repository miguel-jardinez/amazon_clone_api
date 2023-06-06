## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

```bash
nvm use
```

it should configure your node version to **v16.16.0**

### Migrations

If in your PR you added new features to schema in database, run migration to enable it in production
follow these instructions to add migrations.

```bash
npx typeorm-ts-node-esm migration:generate ./src/migrations/<NAME_OF_YOUR_MIGRATION> -d src/core/database/migration.config.ts
```

and when your migration was created it's available to deploy to production.



### Test structure

if you would like contribute it, please follow the requirements to add new features, and follow this test specification.

```typescript
describe('[Name of service, controller or function]', () => {
  let user: { email: string }

  beforeEach(() => {
    // ALL REQUIREMENTS YOU NEED FOR TEST
    user = {
      email: ''
    }
  })

  it('should [...] when success', async () => {
    // CONFIGURATION

    // CALL FUNCTIONS

    // ASSERTIONS
  })

  it('should [...] when fails', async () => {
    // CONFIGURATION

    // CALL FUNCTIONS

    // ASSERTIONS
  })
});
```