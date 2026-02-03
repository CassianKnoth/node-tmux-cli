import { execSync } from 'node:child_process';

import { printLineSeparator } from '../../layout/line-separator.js';
import { createWindow } from './create-window.js';
import { configuredSessions } from '../../../index.js';

export const tmuxStartSession = (sessionName: string) => {
	const configuredWindows = configuredSessions[sessionName];

	if (!configuredWindows) {
		throw new Error(`Internal: No configuration found for: ${sessionName}`);
	}

	printLineSeparator();

	const initialWindowName = 'default';

	console.log(`⏳ Creating new detached session "${sessionName}"...`);
	execSync(`tmux new -d -s ${sessionName} -n ${initialWindowName} -c "$(pwd)"`);
	console.log(`✅ Session "${sessionName}" was created`);

	configuredWindows.forEach((window, windowIndex) =>
		createWindow(window, windowIndex, sessionName),
	);
};
