import test from "ava";
import { isImportDefaultSpecifier } from "@babel/types";
import { parse } from "@babel/parser";
import vm from "../../../src/vm";
import { ErrNotDefined, ErrIsNotFunction } from "../../../src/error";

test("ImportDeclaration-1", (t) => {
  const sandbox: any = vm.createContext({ require });

  const obj: any = vm.runInContext(
    `
import {b, c, d, isImportDefaultSpecifier} from '@babel/types';

module.exports = {b, c, d, isImportDefaultSpecifier};
  `,
    sandbox
  );

  t.deepEqual(obj.b, undefined);
  t.deepEqual(obj.c, undefined);
  t.deepEqual(obj.d, undefined);
  t.deepEqual(obj.isImportDefaultSpecifier, isImportDefaultSpecifier);
});

test("ImportDeclaration-2", (t) => {
  const sandbox: any = vm.createContext({ require });

  const outputParser: any = vm.runInContext(
    `
import {parse} from "@babel/parser";

module.exports = parse;
  `,
    sandbox
  );
  t.true(outputParser === parse);
});

test("ImportDeclaration without require", (t) => {
  // we didnot defined require function in the context
  const sandbox: any = vm.createContext({});

  t.throws(
    function () {
      vm.runInContext(
        `
import {parse} from "@babel/parser";

module.exports = parse;
    `,
        sandbox
      );
    },
    undefined,
    ErrNotDefined("require").message
  );
});

test("ImportDeclaration with null require", (t) => {
  // we didnot defined require function in the context
  const sandbox: any = vm.createContext({ require: null });

  t.throws(
    function () {
      vm.runInContext(
        `
import {parse} from "@babel/parser";

module.exports = parse;
    `,
        sandbox
      );
    },
    undefined,
    ErrIsNotFunction("require").message
  );
});
