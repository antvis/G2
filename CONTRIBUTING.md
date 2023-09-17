# How to Contribute

Firstly, it's important to understand that contributing to an open-source project is not just about submitting code to fix bugs or add features. There are many ways to contribute to an open-source project, including but not limited to:

1. Raising requirements: Submitting detailed requirements based on your business needs when the open-source project cannot meet them.
2. Documentation: Submitting PRs to fix small issues in the documentation or submitting issues to report problems and suggest improvements.
3. Discussion: Initiating discussions on your ideas, needs, and suggestions.
4. Answering questions: Helping to reply to and handle issues and discussions based on your own experience.
5. Bugfix: If you encounter problems during use and can locate the problem code and are willing to try to accept the challenge, you can submit a PR to solve the problem.
6. Feature submission: Based on discussions in issues and discussions, submit a PR after implementation for the benefit of all open-source users.
7. Ecosystem operation: Adding ecosystem content to an open-source project through your abilities, such as blogs, case studies, solutions, and extensions.

If you have any questions, feel free to submit an issue (https://github.com/antvis/g2/issues) or directly modify and submit a PR (https://github.com/antvis/g2/pulls). The following mainly introduces the operational guidelines for several types of open-source contributions.

## How to run the website code locally?

> If you want to help optimize the `documentation` and submit `chart examples`, you need to start the website debugging and validation. Here's how to start the website.

- Clone the code to your local computer:

```bash
$ git clone git@github.com:antvis/G2.git
```

- Install project dependencies:

```bash
$ cd G2

$ npm install
```

You can also choose other package management tools to install according to your own habits.

Install website dependencies and start:

```bash
$ cd site

$ npm install

$ npm start
```

Then you can see the URL address to access the local website in the command console.

## How to debug project code?

> When learning the project code or solving bugs and submitting features for the project, debugging and running the code is necessary. Here is how to start and debug the project.

- Clone the project and install dependencies:

```bash
$ git clone git@github.com:antvis/G2.git

$ cd G2

$ npm install
```

 - Start a local debugging case:

G2 uses [Vite](https://vitejs.dev/) to build the preview environment. Going through `npm run dev` can open the preview page.

```bash
$ npm run dev
```

The preview page can preview all chart cases under `__tests__/plots` and switch through the drop-down box according to different focus points. Chart cases are divided into the following categories based on different focus points:

- animation - Animation-related cases, placed under `__tests__/plots/animation`.
- api - Chart API-related cases, placed under `__tests__/plots/api`.
- interaction - Interaction-related cases, placed under `__tests__/plots/interaction`.
- static - Static drawing-related cases, placed under `__tests__/plots/static`.
- tooltip - Tooltip-related cases, placed under `__tests__/plots/tooltip`.

When starting development, you need to determine which category the feature to be implemented or the BUG to be fixed belongs to, then create a new file under the corresponding category folder, input the corresponding code, and export it in the corresponding index.js file. This way, you can preview it in the preview environment.

- Run CI locally:

```bash
$ npm run test
```

The above command can run CI locally to ensure that after modifying the code, there are no new issues.

## What are the requirements for contributing PR?

In order to ensure the long-term code quality and stability of the project, a PR needs to meet the following requirements at least:

- Commit Message format
- Automation testing requirements
- Pull Request guidelines

### Commit Message format

Follow the [angular format](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format) for commit messages. This makes the commit history more clear and enables the generation of changelogs. The format should be as follows:

```text
type(scope): your commit message subject
```

`type`: The type of the commit, including the following categories:

- feat: a new feature
- fix: a bug fix
- docs: changes to documentation
- style: code style changes that do not affect the logic
- refactor: code refactoring that does not affect the existing features
- perf: performance improvements
- test: adding or modifying tests
- chore: changes to tools or utilities (including but not limited to documentation, code generation, etc.)
- deps: dependency upgrades (2) scope The scope of the modified files. (3) subject The specific content of the modification. Example
- fix(compile): couple of unit tests for IE9

`scope`: the scope of the commit.

`subject`: the subject of the commit.

### Automation testing requirements

G2 has two parts of automated testing:

- Unit tests: tests for data modules or functions, located in `__tests__/unit/`.
- Integration tests: tests the rendering results of the entire visualization chart by comparing screenshots, located in `__tests__/integration/`.

For all changes, unit tests or integration tests should be submitted to cover the modified parts. Additionally, run `npm run test` locally to ensure the CI runs successfully.

### Pull Request guidelines

Since no one can guarantee how long it will be until they remember, please provide the following information when submitting a Pull Request for convenient historical reference:

- Requirement (usually associated with an issue or comment)
- Reason for the upgrade (different from the issue, briefly describe why it needs to be addressed)
- Framework testing points (can be associated with test files, no need for detailed description, just key points)
- Concerns (for users, optional, usually for incompatible updates, additional prompts are required) 

For any other questions, please submit a discussion for help. We look forward to your contribution to AntV.
