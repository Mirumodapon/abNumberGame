module.exports = function check(user_input, ans, dataset = '1234567890') {
  const input = new Array(...new Set(user_input.split('')));
  const length = ans.length;

  if (input.length !== length) throw 'Invalid Input.';
  if (!input.every((x) => dataset.split('').includes(x))) throw 'Invalid Input.';

  let a = 0,
    b = 0;
  for (let i = 0; i < length; ++i) {
    if (input[i] === ans[i]) {
      ++a;
      continue;
    }

    if (ans.includes(input[i])) {
      ++b;
      continue;
    }
  }

  return { a, b };
};
