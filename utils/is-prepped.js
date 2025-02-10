/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 0) {}

  const hostname = ns.args[0];
	const tolerance = 0.0001;
	
  const maxMoney = ns.getServerMaxMoney(hostname);
	const money = ns.getServerMoneyAvailable(hostname);
	const minSec = ns.getServerMinSecurityLevel(hostname);
	const sec = ns.getServerSecurityLevel(hostname);

	const secFix = Math.abs(sec - minSec) < tolerance; // A fix for floating point innaccuracy.
	
  ns.tprintf(hostname + " is prepped: " + ((money === maxMoney && secFix) ? "true" : "false"));
}