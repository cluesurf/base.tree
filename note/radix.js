function parseInt(value, code) {
  return [...value].reduce((r, a) => r * code.length + code.indexOf(a), 0);
}

function toString(value, code) {
  var digit,
      radix= code.length,
      result = '';

  do {
      digit = value % radix;
      result = code[digit] + result;
      value = Math.floor(value / radix);
  } while (value)

  return result;
}
