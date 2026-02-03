# configurable `tmux` with `node.js` CLI

Create (or interact with) your `tmux` sessions quick and easy, again and again from one simple config file!

## Contents

- [Quick start](#quick-start)
- [How it works](#how-it-works)

## Quick start

### Requirements

This project was developed with

- [node](https://nodejs.org/en) version 22.18.0
- [tmux](https://github.com/tmux/tmux/wiki) version 3.5a

### Setup

1. 📄 Clone the project

- HTTPS:

```bash
git clone https://github.com/CassianKnoth/configurable-tmux-node.git
```

- SSH:

```bash
git clone git@github.com:CassianKnoth/configurable-tmux-node.git
```

2. ➡️ Navigate into project

```bash
cd configurable-tmux-node
```

3. ⚙️ Configure [config.ts](/src/config.ts)

4. 🏗️ Build the project

```bash
npm run build
```

5. 🚀 Run CLI

```bash
npm run start
```

## How it works

Checkout the [config.ts](/src/config.ts) file: You can list any number of `tmux`-session configurations. The porperty key (e. g. `testSession`) is the session name and holds a list of windows which can also hold a list of panes. Each window requires a `name` and a `workspacePath` (where the window's default pane should be initialized). Next to the default pane, the `additionalPanes` require a `name` and _optionally_ a `subPath` (if it should not be initalized at the window's `workspacePath`, which is the default) and also _optionally_ a `command` which should be run at creation (e. g. `echo hello world` or maybe `npm run build:watch`).

The [config.ts](/src/config.ts) is part of the `src` and also compiled. You need to:

- build the project
- execute the `index.js` file with `node` (`npm run start`)
- if you make changes to [config.ts](/src/config.ts) repeat build and execution

```ts
export const configuredSessions: Record<string, Window[]> = {
	testSession: [
		{
			name: 'test-window',
			workspacePath: '/absolute/path/to/my-awesome-project',
			additionalPanes: [
				{
					name: 'server',
				},
				{
					name: 'watcher',
					subPath: '/relative/path/to/subfolder',
					// results in /absolute/path/to/relative/path/to/subfoldermy-awesome-project
					command: 'echo "HELLO FROM WATCHER"',
				},
			],
		},
		{
			name: 'another-window',
			workspacePath: '/absolute/path/to/something-else',
			additionalPanes: [
				{
					name: 'tester',
					command: 'echo "HELLO FROM TESTER"',
				},
			],
		},
	],
	anotherSession: [
		{
			name: 'yet-another-test-window',
			// you can also use env variables in config
			workspacePath:
				process.env.TEST_WORKSPACE_PATH ||
				'/absolute/path/to/my/other/cool-project',
			additionalPanes: [
				{
					name: 'yet-another-something',
				},
			],
		},
	],
};
```
