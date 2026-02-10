import schema from '../../dist/config/schema/schema.json' with { type: 'json' };

import templateConfig from '../../dist/config/template/node-tmux-config.json' with { type: 'json' };

import Ajv from 'ajv';
const ajv = new Ajv();

const validate = ajv.compile(schema);

const valid = validate(templateConfig);
if (!valid) {
	console.error('template invalid');
	process.exit(1);
}

console.log('template valid');
process.exit(0);
