---
name: G2 Unit Testing Skills
description: Guidelines and best practices for writing unit tests in the G2 visualization library, covering directory structure, testing patterns, and implementation guidelines. Use when need to generate test.
---

## Document Information

**Document Title:** G2 Unit Testing Skill Specification
**Version:** 1.0
**Author:** G2 Development Team
**Purpose:** Guide for writing effective unit tests in the G2 visualization library

## Overview

This skill specification provides comprehensive guidelines for writing unit tests in the G2 visualization library. It covers directory structure, testing patterns, best practices, and implementation guidelines to ensure consistent and maintainable test code.

## Prerequisites

Before writing unit tests for G2, ensure you have:
- Understanding of TypeScript and Jest testing framework
- Familiarity with G2's codebase structure
- Knowledge of the specific module you are testing

## Test Directory Structure

G2 organizes tests into two main categories:

### Unit Tests (`__tests__/unit/`)
Unit tests are for testing pure data modules or functions. They are located in `__tests__/unit/` and organized by module:
- `api/` - Chart API related tests
- `data/` - Data transformation tests
- `scale/` - Scale related tests
- `encode/` - Encoding related tests
- `component/` - Component related tests
- `utils/` - Utility function tests
- And more...

### Integration Tests (`__tests__/plots/`)
Integration tests test the rendering results of the entire visualization chart by comparing screenshots. Located in `__tests__/plots/`, these are organized by focus areas:
- `static/` - Static drawing related cases
- `animation/` - Animation related cases
- `api/` - Chart API related cases
- `interaction/` - Interaction related cases
- `tooltip/` - Tooltip related cases
- `legend/` - Legend related cases
- `bugfix/` - Bug fix related cases

## Unit Test Implementation Guidelines

### Test Structure
Follow the standard Jest testing structure:

```typescript
import { YourFunction } from '../../../src/your-module';

describe('YourFunction', () => {
  it('should perform expected behavior', () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

## Integration Test Guidelines

### Chart Configuration Tests
Integration tests typically export chart configurations:

```typescript
import { G2Spec } from '../../../src';

export function alphabetInterval(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
  };
}
```

### Export Convention
- Export each test case as a function that returns a `G2Spec`
- Name the export function descriptively
- Add the export to the appropriate `index.ts` file to make it visible in the preview environment

## Testing Workflow

### Running Tests
To run all tests locally:
```bash
npm run test
```

To run tests on demand (specific test files or directories):
```bash
# Run specific test file
npm run test -- path/to/your/test-file.test.ts

# Run tests matching a pattern
npm run test -- --testNamePattern="legend"
```

This ensures your changes pass all existing tests before submitting a pull request.

### 9.2 Adding New Tests
- Determine the appropriate directory for your test
- Follow existing patterns in the same directory
- Export your test case in the corresponding index.ts file

## 10. Troubleshooting

Common issues and solutions:
- If tests fail due to missing dependencies, ensure all imports are correct
- For async test issues, verify proper use of async/await or Promises
- If tests are slow, check for unnecessary computations or network requests

## 11. References

- Review existing tests in the codebase for examples
- Follow the existing patterns and conventions
- When in doubt, refer to similar tests in the same module