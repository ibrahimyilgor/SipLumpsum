export function calculateSipLumpsum(sipAmount, lumpsumAmount, rate, months) {
  // Convert annual rate to monthly rate
  const monthlyRate = rate / 100;

  // Calculate future value of SIP
  let futureValueSIP = 0;
  for (let i = 1; i <= months; i++) {
    futureValueSIP += sipAmount * Math.pow(1 + monthlyRate, months - i + 1);
  }

  // Calculate future value of lumpsum investment
  const futureValueLumpsum = lumpsumAmount * Math.pow(1 + monthlyRate, months);

  // Total future value
  const totalFutureValue = futureValueSIP + futureValueLumpsum;

  return totalFutureValue.toFixed(2);
}

export const calculateSipLumpsumTable = (
  sipAmount,
  lumpsumAmount,
  rate,
  months
) => {
  const monthlyRate = rate / 100;
  const investments = [];
  let totalInvestment = lumpsumAmount;

  for (let i = 1; i <= months; i++) {
    // Calculate the return on lumpsum
    monthlyReturn = (totalInvestment + sipAmount) * monthlyRate;
    totalInvestment += monthlyReturn + sipAmount;

    investments.push({
      month: i,
      sipInvestment: sipAmount,
      lumpsumInvestment: i === 1 ? lumpsumAmount : 0,
      monthlyReturn: monthlyReturn,
      totalValue: totalInvestment,
    });
  }

  return investments;
};
