
const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const testValue = "JimHalpert";
  const e = new Engineer("Foo", 1, "jim@dundermifflin.com", testValue);
  expect(e.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Foo", 1, "jim@dundermifflin.com", "JimHalpert");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "JimHalpert";
  const e = new Engineer("Foo", 1, "jim@dundermifflin.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});