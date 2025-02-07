/** @param {NS} ns */
export async function main(ns) {
  const listOfServers = "BackdoorRequiredServers.json";
  const servers = JSON.parse(ns.read(listOfServers));
  let serverCounter = 0;

  // Iterate through list of servers
  for (let i = 0; i < servers.total; ++i) {
    const hostname = servers.info[i].hostname;
    ns.tprintf(++serverCounter + ": " + hostname);
  }
}
