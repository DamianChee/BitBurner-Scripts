/** @param {NS} ns */
export async function main(ns) {
  const listOfServers = "UnhackedServers.json";
  const servers = JSON.parse(ns.read(listOfServers));
  let serverCounter = 0;

  if (!servers.total) {
    ns.tprintf("There are no servers available for hacking!");
    return;
  }

  // Iterate through list of servers
  for (let i = 0; i < servers.total; ++i) {
    const target = servers.info[i].hostname;
    ++serverCounter;

    ns.run("crack-server.js", 1, target);
    ns.tprintf(target + " cracked!");
  }

  ns.tprintf("Cracks completed!");
  ns.tprintf("Total Number of Servers served: " + serverCounter);
}