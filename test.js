/** @param {NS} ns **/
export async function main(ns) {
  const target = ns.args[0];
  const maxMoney = ns.getServerMaxMoney(target);
  const hPercent = ns.hackAnalyze(target);
  const gThreads = Math.ceil(ns.growthAnalyze(target, maxMoney / (maxMoney - maxMoney * hPercent)));
  const wThreads1 = Math.max(Math.ceil(1 * 0.002 / 0.05), 1);
  const wThreads2 = Math.max(Math.ceil(gThreads * 0.004 / 0.05), 1);
  
  ns.tprint(hPercent);
  ns.tprint(gThreads);
  ns.tprint(wThreads1);
  ns.tprint(wThreads2);
}
