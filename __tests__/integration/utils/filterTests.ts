export function filterTests(test) {
  const tests = Object.entries(test);
  const onlys = tests.filter(
    // @ts-ignore
    ([, { only = false }]) => only,
  );
  if (onlys.length !== 0 && process.env.CI === 'true') {
    throw new Error('Please remove `test.only`.');
  }
  const runnables = onlys.length === 0 ? tests : onlys;
  return runnables.filter(
    // @ts-ignore
    ([, { skip = false }]) => !skip,
  );
}
