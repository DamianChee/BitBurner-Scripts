/** @param {NS} ns */
export async function main(ns) {
  const listOfServers = "HackedServers.json";
  const servers = JSON.parse(ns.read(listOfServers));

  servers.info.sort((a, b) => b.hackRatio - a.hackRatio);

  // Iterate through list of servers
  for (let i = 0; i < servers.total; ++i) {
    const hostname = servers.info[i].hostname;
    const ratio = servers.info[i].hackRatio;
    const requiredHackingSkill = servers.info[i].requiredHackingSkill;
    if (!ratio) continue;
    ns.tprintf(i + ": " + hostname + " [Ratio: " + ratio + "]" + " [Level: " + requiredHackingSkill + "]");
  }
}