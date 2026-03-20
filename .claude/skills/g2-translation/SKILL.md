---
name: G2 Translation Guidelines
description: Guidelines for translating G2 documentation, including terminology consistency, hyperlink adjustments, and file naming conventions for multilingual documentation. Use when need to translate documents.
---

# G2 Translation Guidelines

These guidelines provide comprehensive instructions for translating G2 documentation files, particularly those under the `site/docs` directory.

## 1. Consistency in Terminology

Ensure that terminology is consistent throughout the document. Use the glossary below to maintain uniformity in terms:

### Glossary:
- 图表 (Chart)
- 标记 (Mark)
- 数据 (Data)
- 比例尺 (Scale)
- 转换 (Transform)
- 坐标系 (Coordinate)
- 动画 (Animate)
- 交互 (Interaction)
- 复合 (Composition)
- 主题 (Theme)
- 示例 (Examples)
- 文档 (Manual/Docs)
- API 文档 (API)
- 基础图表 (General)
- 数据分析 (Analysis)
- 关系图 (Graph)
- 地理 (Geo)
- 数据标注 (Annotation)
- 组件 (Component)
- 布局 (Layout)
- 可视化叙事 (Storytelling)
- 单元可视化 (Unit)
- 3D 图表 (3D Charts)
- 风格/样式 (Style)
- 渲染器 (Renderer)
- 无障碍 (Accessible)
- Spec 函数表达式 (Spec Function Expression)
- 编码 (Encode)
- 通道 (Channel)
- 提示信息 (Tooltip)
- 图例 (Legend)
- 坐标轴 (Axis)
- 网格 (Grid)
- 标签 (Label)
- 插件 (Plugin)
- 画布 (Canvas)
- 配置项 (Options)
- 属性 (Property)
- 事件 (Events)
- 回调函数 (Callback)
- 描述 (Description)
- 类型 (Type)
- 默认值 (Default Value)
- 必选 (Required)

## 2. Adjust Hyperlinks

Review and adjust hyperlinks to ensure they point to the correct translated sections or documents. Verify that all links are functional and correctly formatted.

### Internal Links:
In the English version, all internal links should have a `/en` prefix, while the Chinese version should not have any prefix. Ensure this prefix is added to all internal links in English documents to avoid any oversight.

### Anchor Points:
For anchor points following a `#`, if they contain Chinese characters, they should be adjusted to match the corresponding title in the English version rather than being directly translated.

### External Links:
Convert external links appropriately to ensure they align with the language and context of the document.

## 3. Direct Writing to Translated Documents

Translations should be stored in corresponding `.en.md` or `.zh.md` files within the same directory. Ensure that the translated content is placed in the correct location within the document.

- When translating from Chinese to English, create or update the `.en.md` file in the same directory.
- When translating from English to Chinese, create or update the `.zh.md` file in the same directory.

## 4. Support for Partial Content Translation

Allow for the selection and translation of specific sections of content. Translated sections should be inserted into the appropriate location within the document, maintaining the logical flow and structure.

### Full Document Translation:
If the entire document is selected for translation, replace the entire content with the translated version.

### Partial Content Translation:
If only specific sections are selected, find the appropriate place to replace or insert the translated content, ensuring the document's logical flow and structure are maintained.

## 5. Contextual Translation

Avoid literal translations. Ensure that the translation fits the English context and conveys the intended meaning accurately.

## 6. Direct Modification

Translations should be directly modified in the corresponding `.en.md` or `.zh.md` files without returning the translated content separately. Ensure that the changes are saved in the correct file and location.

## 7. Preserve Metadata Order

Do not modify the `order` attribute in the page metadata during translation. This ensures that the document order remains consistent across different language versions.

## 8. Add '/en' Prefix to Internal Links

Ensure that all internal links in English documentation have the '/en' prefix to maintain consistency and correct navigation.

## 9. File Existence Check

Always check if `${target_path}` exists in the project structure; never create new files when translating existing documents.

By following these guidelines, translations will be more accurate and consistent, facilitating easier review and integration into the documentation.