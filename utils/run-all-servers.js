/** @param {NS} ns **/
export async function main(ns) {
  if (!ns.args.length >= 1) {
    ns.tprintf("There aren't enough arguments!");
    ns.tprintf("Usage: run run-all-servers.js [filename] | [target]")
    return;
  }

  const file = ns.args[0];
  const target = ns.args[1];
  const listOfServers = "HackedServers.json";
  const servers = JSON.parse(ns.read(listOfServers));
  let serverCounter = 0;

  // Iterate through list of servers
  for (let i = 0; i < servers.total; ++i) {
    const hostname = servers.info[i].hostname;

    if (hostname == "home" || hostname == "n00dles") continue;

    if (target) ns.exec(file, hostname, 1, target);
    else ns.exec(file, hostname);
    ns.tprintf(++serverCounter + ": " + hostname + " started " + "'" + file + "'");
  }

  ns.tprintf("Run completed!");
  ns.tprintf("Total Number of Servers running: " + serverCounter);
}