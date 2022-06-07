import test from "ava";
import vm from "../../../src/vm";

test("ForInStatement-1", t => {
  const sandbox: any = vm.createContext({});

  const obj: any = vm.runInContext(
    `
const obj = {
  1: false,
  2: false
};

for (let attr in obj) {
  obj[attr] = true;
}

module.exports = obj;
  `,
    sandbox
  );

  t.true(obj[1]);
  t.true(obj[2]);
});

test("ForInStatement-2", t => {
  const sandbox: any = vm.createContext({});

  const obj: any = vm.runInContext(
    `
const obj = {
  1: false,
  2: false
};

for (let attr in obj) {
  if (obj.hasOwnProperty(attr)){
    obj[attr] = true;
  }
}

module.exports = obj;
  `,
    sandbox
  );

  t.true(obj[1]);
  t.true(obj[2]);
});
