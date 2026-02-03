import { Context } from '../../../types/state.js';
import { UserChoiceList } from '../../../types/user-choice-types.js';
import { listChoiceLabels } from './list-choice-labels.js';
import { getUserInput } from '../get-user-input.js';
import { getParsedAvailableOptions } from './get-parsed-available-options.js';
import { styleText } from 'node:util';
import { handleWithConfirmation } from './handle-choice-with-confirmation.js';

/**
 * Present the user with a set of choices and handle the input accordingly.
 *
 * @param availableChoices Opt in parameter for available choices.
 * Value is always `true`, the property just needs to be set. All omitted properties will not be listed as choice.
 *
 * Choices: `attach`, `destroy`, `restart`, `other`, 'exit'
 */
export const handleUserChoice = async (
	availableChoices: UserChoiceList,
	currentContext: Context,
): Promise<Context> => {
	const parsedAvailableOptions = getParsedAvailableOptions(availableChoices);

	const question = `👉 The choice is yours: ${listChoiceLabels(parsedAvailableOptions)}`;
	const userInput = await getUserInput(question);

	const matchedOption = parsedAvailableOptions.find((option) => {
		return option.regex.test(userInput);
	});

	// loop until valid input
	if (!matchedOption) {
		console.log(styleText('red', '❌ Invalid input, try again...'));
		return currentContext;
	}

	const newContext = await handleWithConfirmation(
		matchedOption,
		currentContext,
	);

	return newContext;
};
