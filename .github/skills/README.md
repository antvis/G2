# G2 Skills for Claude

This directory contains Skills files that help Claude (and other AI assistants) better understand and work with the G2 visualization library codebase.

## What are Skills?

Skills are knowledge documents that provide structured information about a codebase, enabling AI assistants to:
- Understand the architecture and design patterns
- Navigate the codebase more effectively
- Make appropriate code changes and suggestions
- Follow project conventions and best practices

## Skills in this Directory

### 1. [g2-overview.md](./g2-overview.md)
**Purpose**: Provides a comprehensive overview of the G2 library architecture

**Contents**:
- Core architecture and components
- Library system (litelib, corelib, plotlib, etc.)
- File structure and organization
- Key concepts and patterns
- Common patterns for creating charts
- Build commands and testing structure

**When to use**: When you need to understand the overall structure of G2 or find where specific functionality is implemented.

### 2. [working-with-marks.md](./working-with-marks.md)
**Purpose**: Detailed guide to G2's mark system (geometric shapes)

**Contents**:
- All mark types (basic, statistical, hierarchical, graph)
- Mark structure and implementation patterns
- Common operations (creating, encoding, styling, etc.)
- Visual channels and shape options
- Performance tips and testing guidelines

**When to use**: When working with visual marks, creating new mark types, or debugging mark rendering issues.

### 3. [transforms-and-data.md](./transforms-and-data.md)
**Purpose**: Guide to data transformations and mark transforms

**Contents**:
- Data transforms (loading, manipulation, statistical)
- Mark transforms (layout, aggregation, statistical, etc.)
- Transform pipeline and chaining
- Common transform patterns
- Performance considerations

**When to use**: When working with data processing, implementing new transforms, or optimizing data pipelines.

### 4. [scales-coordinates-encoding.md](./scales-coordinates-encoding.md)
**Purpose**: Guide to scales, coordinate systems, and visual encoding

**Contents**:
- All scale types (quantitative, categorical, special)
- Scale configuration and options
- Coordinate systems and transformations
- Visual encoding patterns
- Scale inference and customization

**When to use**: When working with data-to-visual mappings, coordinate transformations, or scale implementations.

### 5. [interactions-animations.md](./interactions-animations.md)
**Purpose**: Guide to user interactions and animations

**Contents**:
- All interaction types (highlight, select, filter, brush, etc.)
- Animation types (enter, exit, update)
- Interaction and animation configuration
- Event handling
- Common interaction patterns

**When to use**: When implementing interactive features, animations, or custom interaction behaviors.

### 6. [api-usage-extension.md](./api-usage-extension.md)
**Purpose**: Guide to using and extending the G2 API

**Contents**:
- API styles (fluent vs specification)
- Core API classes (Chart, Mark, Composition)
- Extension system and registration
- Library system
- Common patterns and best practices
- Performance optimization

**When to use**: When using the G2 API, creating custom extensions, or building applications with G2.

### 7. [components-compositions-themes.md](./components-compositions-themes.md)
**Purpose**: Guide to UI components, compositions, and theming

**Contents**:
- All component types (axes, legends, sliders, etc.)
- Composition patterns (layering, faceting, etc.)
- Theme system and customization
- Color palettes
- Layout patterns

**When to use**: When working with UI components, creating complex layouts, or customizing visual appearance.

## How to Use These Skills

### For AI Assistants
When working with the G2 codebase:
1. Start with `g2-overview.md` to understand the overall architecture
2. Refer to specific skills based on the task at hand
3. Use the patterns and examples as templates for new code
4. Follow the conventions and best practices outlined in each skill

### For Developers
These skills can also serve as:
- Quick reference documentation
- Onboarding materials for new contributors
- Design pattern catalog for the G2 architecture
- API usage examples and best practices

## Maintaining These Skills

When updating these skills:
1. Keep examples current with the latest API
2. Add new patterns as they emerge
3. Update when major architectural changes occur
4. Ensure consistency across skill files
5. Test code examples to ensure they work

## Contributing

If you notice outdated information or missing patterns, please:
1. Update the relevant skill file
2. Test any code examples
3. Ensure consistency with other skills
4. Submit a pull request with clear description

## Related Resources

- [G2 Documentation](https://g2.antv.antgroup.com/)
- [G2 GitHub Repository](https://github.com/antvis/G2)
- [G2 Examples](https://g2.antv.antgroup.com/examples)
- [AntV Community](https://github.com/antvis)

## Version Information

These skills are maintained for G2 v5.x. If you're working with a different version, some information may not apply.

---

*Last updated: 2025-12-31*
