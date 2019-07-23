import * as babel from '@babel/parser';
import * as jsel from 'jsel';
import txt from './source.js.txt';
import "./less/_main.less"

const ast = babel.parse(txt, {
   sourceType: 'unambiguous',
   plugins: [
      'exportDefaultFrom',
   ]
});

console.log(ast);