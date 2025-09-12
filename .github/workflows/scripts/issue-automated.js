const { OpenAI } = require("openai");
const { QueryAntVDocumentTool, ExtractAntVTopicTool }=  require('@antv/mcp-server-antv/build/tools');


/**
 * @param {Object} param
 * @param {import('@actions/github').GitHub} param.github
 * @param {import('@actions/core')} param.core
 * @param {Object} param.context GitHub Action context
 */
module.exports = async ({ github, core, context, issue }) => {
  try {
    core.info('开始处理 issue...');
    const library = `${context.repo.repo}`
    if (!issue) {
      core.setFailed('找不到 issue 信息');
      return;
    }

    const issueNumber = issue.number;
    const issueTitle = issue.title;

    core.info(`处理 issue #${issueNumber}: ${issueTitle}`);

    const combinedQuery = prepareAIPrompt(context, issue);


    const topicExtractionResult = await ExtractAntVTopicTool.run({ query: combinedQuery });

    const aiResponse = await getAIResponse(core,  topicExtractionResult.content[0].text);
    const jsonMatch = aiResponse.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    const processedTopicContent = JSON.parse(jsonMatch[1]);

    const queryDocumentParams = {
        library,
        query: combinedQuery,
        topic: processedTopicContent.topic,
        intent: processedTopicContent.intent,
        tokens: 5000,
        ...(processedTopicContent.subTasks && { subTasks: processedTopicContent.subTasks }),
      };

      const documentationResult = await QueryAntVDocumentTool.run(queryDocumentParams);

      const response = await getAIResponse(core,  documentationResult.content[0].text);

        await github.rest.issues.createComment({
            issue_number: issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: `@${issue.user.login} 您好！以下是关于您问题的自动回复：\n\n${response}\n\n---\n*此回复由 AI 助手自动生成。如有任何问题，我们的团队会尽快跟进。*`
        });

    core.info('Issue 处理完成');

  } catch (error) {
    core.setFailed(`处理 issue 失败: ${error.message}`);
    core.error(error.stack);
  }
};

function prepareAIPrompt(context, issue) {
    return `
    你是 ${context.repo.repo} 项目的智能助手。这是一个处理 GitHub issue 的自动回复系统。
    请分析以下 issue 并提供专业、有帮助的回复。

    ## 当前 Issue
    - 标题: ${issue.title}
    - 内容: ${issue.body}

    请提供完整、有帮助的回复，但不要过于冗长。回复应该条理清晰，使用适当的 Markdown 格式。
`;
}

/**
 * 调用 GitHub AI API 获取回复
 */
async function getAIResponse(core, userQuestion) {
  try {
    core.info('正在调用 GitHub AI API...');

    const token = process.env.GH_TOKEN;

    if (!token) {
      throw new Error('未找到 GH_TOKEN 环境变量');
    }

    const endpoint = "https://models.github.ai/inference";
    const model = "openai/gpt-4.1";

    const client = new OpenAI({
      baseURL: endpoint,
      apiKey: token
    });

    const response = await client.chat.completions.create({
      messages: [
        { role: "user", content: userQuestion }
      ],
      temperature: 0.7,
      top_p: 1.0,
      model: model
    });

    core.info('成功获取 AI 响应');
    return response.choices[0].message.content;

  } catch (error) {
    core.warning(`调用 GitHub AI API 失败: ${error.message}`);
    // 默认回复
    return `
    感谢您提交这个 issue！

    我们的团队会尽快查看您的问题。为了帮助我们更快地解决，请确保您提供了:

    - 问题的详细描述
    - 复现步骤 (如果是 bug)
    - 预期行为和实际行为
    - 使用的版本信息

    谢谢您的理解与支持！
`;
  }
}
