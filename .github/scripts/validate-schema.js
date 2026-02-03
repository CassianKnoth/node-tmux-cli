import schema from '../../dist/config/schema/schema.json' with { type: 'json' };

import defaultConfig from '../../dist/config/default/node-tmux-config.json' with { type: 'json' };
import templateConfig from '../../dist/config/template/node-tmux-config.json' with { type: 'json' };

import Ajv from 'ajv';
const ajv = new Ajv();

const validate = ajv.compile(schema);

[defaultConfig, templateConfig].forEach((config) => {
	const valid = validate(config);
	if (!valid) {
		console.error('config invalid');
		process.exit(1);
	}
});

console.log('configs valid');
process.exit(0);
