function asymptoticFunction(
  val: number,
  k: number = 0.01,
  limit: number = 100
) {
  return limit * (1 - Math.exp(k * val * -1));
}

export default asymptoticFunction;
