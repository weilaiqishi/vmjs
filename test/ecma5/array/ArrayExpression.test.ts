import test from "ava";

import vm from "../../../src/vm";

test("ArrayExpression-1", t => {
  const sandbox: any = vm.createContext({});

  const arr: any = vm.runInContext(
    `
const arr = [1, 2, 3];
arr.push(4);

module.exports = arr;
  `,
    sandbox
  );

  t.true(Array.isArray(arr));
  t.deepEqual(arr.length, 4);
  t.deepEqual(arr, [1, 2, 3, 4]);
});

test("ArrayExpression-2", t => {
  const sandbox: any = vm.createContext({});

  const arr: any = vm.runInContext(
    `
const arr = [1, 2, 3  + 3];
arr.push(4);

module.exports = arr;
  `,
    sandbox
  );

  t.true(Array.isArray(arr));
  t.deepEqual(arr.length, 4);
  t.deepEqual(arr, [1, 2, 6, 4]);
});

test("ArrayExpression-with-undefined", t => {
  const sandbox: any = vm.createContext({});

  const arr: any = vm.runInContext(
    `
module.exports = [1, 2, undefined, 4];
  `,
    sandbox
  );

  t.true(Array.isArray(arr));
  t.deepEqual(arr.length, 4);
  t.deepEqual(arr, [1, 2, undefined, 4]);
});

test("ArrayExpression-with-null", t => {
  const sandbox: any = vm.createContext({});

  const arr: any = vm.runInContext(
    `
module.exports = [1, 2, undefined, null];
  `,
    sandbox
  );

  t.true(Array.isArray(arr));
  t.deepEqual(arr.length, 4);
  t.deepEqual(arr, [1, 2, undefined, null]);
});
