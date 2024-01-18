export const divideAmount = (amount: string, denom: string): string => {
  let divisor = 1;

  // Determine the divisor based on the denomination
  if (denom.toLowerCase() === "evmos" || denom.toLowerCase() === "aevmos" || denom.toLowerCase() === "Evmos") {
    divisor = Math.pow(10, 18);
  } else {
    divisor = Math.pow(10, 6);
  }

  // Divide and limit to 4 digits after the decimal point
  const result = (parseFloat(amount) / divisor).toFixed(4);

  // Convert to a number to remove trailing zeros and then to a string
  return parseFloat(result).toString();

};





