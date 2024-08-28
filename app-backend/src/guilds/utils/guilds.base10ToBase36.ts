const base10ToBase36 = (num) => {
  const base = 36;
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (num === 0) {
    return "00";
  }

  const result = [];
  while (num > 0) {
    const remainder = num % base;
    result.unshift(digits[remainder]);
    num = Math.floor(num / base);
  }

  const output = result.join("");
  return output.padStart(2, "0");
}

export default base10ToBase36;