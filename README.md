# configurable `tmux` with `node.js` CLI

Create (or interact with) your `tmux` sessions quick and easy, again and again from one simple config file!

## 📚 Contents

- [Quick start](#quick-start)
- [How it works](#how-it-works)
- [Development](#️-development)

## 👉 Quick start

### Requirements

This project was developed with

- [node](https://nodejs.org/en) version 22.18.0
- [tmux](https://github.com/tmux/tmux/wiki) version 3.5a

### Getting started

Install the `node-tmux` CLI globally:

```bash
npm install -g node-tmux-cli
```

Create a config file:

```bash
node-tmux init
```

Edit the config file to your liking and run:

```bash
node-tmux
```

### Default vs custom config file

`node-tmux init` will create a `.node-tmux` folder with a `node-tmux-config.json` file in your home directory. Running `node-tmux` will look for that as a default config file (with that name!). You can also run `node-tmux init --local` (with `-l`/`--local` flag) which creates a `node-tmux-config.json` file in your current directory. Whether you create such a config file that way or completely on your own, you can run any such config by passing its path with the `-c`/`--config` flag:

```bash
node-tmux --config ./some/directory/node-tmux-config.json
```

These files you can also name whatever you desire:

```bash
node-tmux --config ./some/directory/myConfig.json
```

## 🔬 How it works

Look at this simple config template:

```json
{
	"$schema": "../schema/schema.json",
	"shell": "bash", // choose bash or zsh for running commands
	"sessions": {
		"mySession": [
			{
				"name": "myWindow",
				"workspacePath": "/absolute/path/to/my-awesome-project",
				"additionalPanes": [
					{
						"name": "server"
					},
					{
						"name": "watcher",
						"subPath": "subfolder",
						// results in /absolute/path/to/my-awesome-project/subfolder
						"command": "echo HELLO FROM WATCHER" // runs in the shell you configured above
					}
				]
			}
		]
	}
}
```

You can list any number of `tmux`-session configs under `sessions`. The porperty key (e. g. `mySession`) is the session name and holds a list of windows which can also hold a list of panes. Each window requires a `name` and a `workspacePath` (where the window's default pane should be initialized). Next to the default pane, the `additionalPanes` require a `name` and _optionally_ a `subPath` (if it should not be initalized at the window's `workspacePath`, which is the default) and also _optionally_ a `command` which should be run at creation (e. g. `echo hello world` or maybe `npm run build:watch`). This command will be run in `bash` or `zsh` depending what you configure as `shell`.

If you run the above default config file (e. g. as default config with just `node-tmux` after `node-tmux init`) you will see something like this:

<img src="https://raw.githubusercontent.com/CassianKnoth/node-tmux-cli/main/assets/config-selection.png">

If you then provide a valid key, three scenarios are possible:

- No session with that config is currently running
- A session with that config _is_ currently running in a _detached_ state
- A session with that config _is_ currently running in an _attached_ state

If no session is running, you could start it now:

<img src="https://raw.githubusercontent.com/CassianKnoth/node-tmux-cli/main/assets/start-session.png">

Every new session starts in _detached_ state.

Now you will have more options to deal with the session:

<img src="https://raw.githubusercontent.com/CassianKnoth/node-tmux-cli/main/assets/options.png">

> 💡 Notice how the states will be indicated in the session list already

- attach --> attaches the session to your current terminal
- restart --> restarts the session
- destroy --> kills the session
- other --> deal with another session
- exit --> exit CLI

> 💡 It is sufficient to type the first letter of each option. Also each option comes with confirmation.

Let's attach the session and look at the result in `tmux`:

<img src="https://raw.githubusercontent.com/CassianKnoth/node-tmux-cli/main/assets/tmux.png">

Compare this to the config: You can see that the session consists of one window (see `mySession-myWindow` at the bottom left. You can use or ignore the default window next to it). For `myWindow` two `additionalPanes` were configured, thus the window was split two times, resulting in three panes:

- A default pane
- The configured pane named "server"
- The configured pane named "watcher"
  - The configured command was executed with the configured shell

You could actually run the CLI inside the `tmux`-session again:

<img src="https://raw.githubusercontent.com/CassianKnoth/node-tmux-cli/main/assets/attached.png">

The session is now correctly marked as _attached_ and the `[a]ttach` option is gone. This is to help keeping things organized – if the session is attached somewhere already, use that.

> 💡 You can technically attach a _detached_ session inside a running `tmux`-session, but that might take on confusing inception like nesting. Do as you please.

## 🛠️ Development

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

3. 🏗️ Build the project

```bash
npm run build
```

4. 🚀 Run CLI

```bash
npm run dev
```

> 💡 Or directly `node dist/index.js` with or wothout arguments/flags

## 📈 Improvements?

- Reusable config snippets
  - Reference windows or panes from a `snippets` list if you need the same ones in multiple session configs

- Configure shell per pane instead of globally

- Delete default window
