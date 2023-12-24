import test from "ava";
import vm from "../../../src/vm";

test("DoExpression", (t) => {
  const sandbox: any = vm.createContext({});

  const Person: any = vm.runInContext(
    `
function testable(target){
	target.testable = true;
}

@testable
class Person{
}

module.exports = Person;
    `,
    sandbox
  );
  t.deepEqual(Person.testable, true);
});
