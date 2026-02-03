import { execSync } from 'node:child_process';
import { Pane } from '../../../types/config-types.js';
import { formatCompoundPath } from '../../format-compound-path.js';
import { confiuredShell } from '../../../index.js';

export const createPane = (
	pane: Pane,
	paneIndex: number,
	windowIdentifier: string,
	basePath: string,
) => {
	const paneName = pane.name;
	const splitTarget = `${windowIdentifier}.${paneIndex}`;
	const newPaneIdentifier = `${windowIdentifier}.${paneIndex + 1}`;
	const path = pane.subPath
		? formatCompoundPath(basePath, pane.subPath)
		: basePath;

	console.log(`⏳ 🧩 Creating new Pane "${paneName}"`);
	execSync(`tmux split-window -h -t ${splitTarget} -c ${path}`);
	execSync(`tmux select-pane -t ${newPaneIdentifier} -T ${paneName}`);
	console.log(`✅ Pane "${paneName}" was created`);

	if (pane.command) {
		console.log(`⏳ 🤖 Executing configured command in Pane "${paneName}"...`);
		// replace double quotes because they can mess with shell execution
		execSync(
			`tmux send-keys -t ${newPaneIdentifier} "${confiuredShell} -c '${pane.command.replace(/"/g, '\\"')}; exec ${confiuredShell}'" C-m`,
		);
		execSync(`tmux send-keys -t ${newPaneIdentifier} Enter`);
		console.log(`✅ Command executed in Pane "${paneName}"`);
	}
};
