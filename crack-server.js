/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) {
    ns.tprintf("Please provide a hostname!");
    ns.tprintf("Usage: run crack-server.js [hostname]");
    return;
  }

  const hostname = ns.args[0];

  if (ns.fileExists("BruteSSH.exe", "home")) ns.brutessh(hostname);
  if (ns.fileExists("FTPCrack.exe", "home")) ns.ftpcrack(hostname);
  if (ns.fileExists("relaySMTP.exe", "home")) ns.relaysmtp(hostname);
  if (ns.fileExists("HTTPWorm.exe", "home")) ns.httpworm(hostname);
  if (ns.fileExists("SQLInject.exe", "home")) ns.sqlinject(hostname);

  ns.nuke(hostname);
  ns.tprintf(hostname + ": All ports opened and target nuked!")
}