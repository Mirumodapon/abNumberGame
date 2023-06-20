module.exports = function randomAns(digital = 4, digitalSet = '1234567890') {
  return {
    ans: digitalSet
      .split('')
      .sort((x) => (Math.random() < 0.5 ? 1 : -1))
      .slice(0, digital),
    hint: { digital, digitalSet }
  };
};
