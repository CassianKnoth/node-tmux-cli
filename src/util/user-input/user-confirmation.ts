import { getUserInput } from './get-user-input.js';

/**
 * Prompts the user for yes/no confirmation
 * @param prompt Will be presented to the user as `👉 ${prompt} [Y/n]: `
 * @example "Confirm?" --> `👉 Confirm? [Y/n]: `
 */
export const userConfirmation = async (prompt: string): Promise<boolean> => {
	const userInput = await getUserInput(`👉 ${prompt} [Y/n]: `);
	const confirmed = !/n$|no/i.test(userInput);
	return confirmed;
};
