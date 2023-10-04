#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import App from './app.js';
import React from 'react';

const cli = meow(
	`
	Usage
	  $ bingwp

	Options
		--url Image URL
		-i Interactive

	Examples
	  $ bingwp --url=https://example.com/image.jpg
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
			i: {
				type: "boolean"
			}
		},
	},
);

render(<App url={cli.flags["url"] as string} interactive={cli.flags.i!} />);
