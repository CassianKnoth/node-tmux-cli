import { InspectColor, styleText } from 'node:util';
import { configuredSessions } from '../../index.js';
import { hasTmuxSession } from '../tmux/has-session.js';
import { isTmuxAttached } from '../tmux/is-attached.js';

export const listConfigurations = () => {
	const configuredSessionNames = Object.keys(configuredSessions);

	// double space due to emoji consisting of two characters
	console.log('ℹ️  Available configurations:');

	configuredSessionNames.forEach((configuredSessionName) => {
		const hasSession = hasTmuxSession(configuredSessionName);

		if (hasSession) {
			const isAttached = isTmuxAttached(configuredSessionName);
			const color: InspectColor = isAttached ? 'green' : 'yellow';
			const suffix = isAttached ? '(attached)' : '(detached)';

			console.log(styleText(color, ` - ${configuredSessionName} ${suffix}`));
		} else {
			console.log(` - ${configuredSessionName}`);
		}
	});
};
