# AGENTS

## AntV Agent 可读性原则

- 每个公开文档、API 和示例地址应能直接获取有意义的内容。正文、示例源码、依赖和必要说明不能仅在执行客户端 JavaScript、点击、展开或 iframe 消息注入后才可用。
- 页面应在初始 HTML 中提供可读取的正文与完整示例源码，页面级 Markdown 保留相同内容并提供可发现入口。llms.txt 等索引是补充，不能代替目标页面本身的可读性。没有独立分享或下载需求时，不为内嵌 Demo 新增独立页面、导出路由或重复依赖展示。
- 图表的 Canvas、SVG 或 iframe 预览不能成为唯一内容载体。使用 iframe 时，父页面仍须提供完整示例源码与说明，公开示例链接须支持独立访问。
- 内容与 Demo 相关改动应定向验证直接 HTTP 获取、机器可读导出和浏览器展示，避免出现浏览器看起来正常但 Agent 只能获取空壳的情况。

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
