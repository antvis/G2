# AGENTS

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: Bash("openskills read <skill-name>")
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>g2-legend-expert</name>
<description>Expert skill for G2 legend development - provides comprehensive knowledge about legend rendering implementation, component architecture, layout algorithms, and interaction handling. Use when implementing, customizing, or debugging legend functionality in G2 visualizations.</description>
<location>project</location>
</skill>

<skill>
<name>g2-testing</name>
<description>Guidelines and best practices for writing unit tests in the G2 visualization library, covering directory structure, testing patterns, and implementation guidelines. Use when need to generate test.</description>
<location>project</location>
</skill>

<skill>
<name>g2-translation</name>
<description>Guidelines for translating G2 documentation, including terminology consistency, hyperlink adjustments, and file naming conventions for multilingual documentation. Use when need to translate documents.</description>
<location>project</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>
