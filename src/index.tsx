import source from './test/source.test.js';
import {AstQuery} from './astQuery';

import "./less/index.less"

document.body.innerHTML = `<input id="query" value="//Program" /><textarea id="input">${source}</textarea><pre id="output"></pre>`;

const ui = {
	query: document.getElementById('query') as HTMLInputElement,
	input: document.getElementById('input') as HTMLTextAreaElement,
	output: document.getElementById('output') as HTMLPreElement,
};

const astQuery = new AstQuery(source);

function select() {
	try {
		const source = ui.input.value;
		astQuery.setSource(source);
		console.clear();
		
		let json;
		try {
			const query = ui.query.value.replace(/\/$/, '');
			console.log(`Query: ${query}`);
			const node = astQuery.selectAll(query);
			console.log(node);
			json = JSON.stringify(node, null, 4);
		} catch (e) {
			json = `Err: ${e.message}`;
		}
		ui.output.innerHTML = json;
	
		ui.query.addEventListener('keyup', e => {
			if (e.keyCode === 13) {
				select();
			}
		});
	} catch (e) {
		console.error(`Err: ${e.message}`);
	}
}

select();