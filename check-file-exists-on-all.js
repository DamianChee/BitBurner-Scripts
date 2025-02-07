/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) {
    ns.tprintf("There aren't enough arguments!");
    ns.tprintf("Usage: run check-file-exists-on-all.js [filename]")
    return;
  }

  const file = ns.args[0];
  const listOfServers = "HackedServers.json";
  const servers = JSON.parse(ns.read(listOfServers));
  let serverCounter = 0;

  // Iterate through list of servers
  for (let i = 0; i < servers.info.length; ++i) {
    const hostname = servers.info[i].hostname;
    if (ns.fileExists(file, hostname)) {
      ns.tprintf("'" + file + "' exists on " + hostname);
      ++serverCounter;
    }
  }

  ns.tprintf("Total Number of Servers available for running: " + serverCounter);
}
