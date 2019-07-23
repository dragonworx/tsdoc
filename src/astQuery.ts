import * as babel from '@babel/parser';
import * as jsel from 'jsel';

const schema = {
	nodeName(node: any) {
		return node.type;
	},
	childNodes(node: any) {
		const childNodes = [];
		for (let k in node) {
			const obj = node[k];
			if (Array.isArray(obj)) {
				obj.forEach(child => childNodes.push(child));
			} else if (typeof obj === 'object' && obj !== null) {
				childNodes.push(obj);
			}
		}
		return childNodes;
	},
	attributes(node: any) {
		const attribs: any = {};
		for (let k in node) {
			attribs[k] = node[k];
		}
		return attribs;
	},
};

const map = {
   'Method': 'ClassMethod|TSDeclareMethod',
};

type AstNode = any;

export class AstQuery {
   ast: AstNode;
   pointer: AstNode;
   dom: any;

   constructor (source: string) {
      this.setSource(source);
   }

   setSource(source: string) {
      const ast = babel.parse(source, {
			sourceType: 'module',
			plugins: [
				'jsx',
				'typescript',
				'asyncGenerators',
				'bigInt',
				'classProperties', 
				'classPrivateProperties',
				'classPrivateMethods',
				['decorators', { decoratorsBeforeExport: false }],
				'doExpressions',
				'dynamicImport',
				'exportDefaultFrom',
				'exportNamespaceFrom',
				'functionBind',
				'functionSent',
				'importMeta',
				'nullishCoalescingOperator',
				'numericSeparator',
				'objectRestSpread',
				'optionalCatchBinding',
				'optionalChaining',
				['pipelineOperator', { proposal: 'minimal'} ],
				'throwExpressions',
			]
      });
      this.ast = ast;
      this.setPointer(ast);
   }

   setPointer(astNode: AstNode) {
      this.pointer = astNode;
      this.dom = jsel(this.pointer);
      this.dom.schema(schema);
      this.dom.map(map);
   }

   select(query: string) {
      return this.dom.select(query);
   }

   selectAll(query: string) {
      return this.dom.selectAll(query);
   }
}