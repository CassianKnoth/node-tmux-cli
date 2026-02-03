import { Context } from '../../../types/state.js';
import { Choice } from '../../../types/user-choice-types.js';
import { getUserInput } from '../get-user-input.js';

export const handleWithConfirmation = async (
	choice: Choice,
	currentContext: Context,
): Promise<Context> => {
	const userInput = await getUserInput(`👉 ${choice.label}? [Y/n]: `);
	const confirmed = !/n$|no/i.test(userInput);

	const newContext = confirmed
		? choice.handler(currentContext)
		: currentContext;

	return newContext;
};
