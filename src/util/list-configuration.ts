export const listConfigurations = (configuredSessionNames: string[]) => {
	console.log('ℹ️  available configurations:');
	configuredSessionNames.forEach((configuredSessionName) => {
		console.log(` - ${configuredSessionName}`);
	});
};
