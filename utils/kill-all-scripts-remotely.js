/** @param {NS} ns **/
export async function main(ns) {
  // Variables
  const listOfServers = "HackedServers.json";
  let serverCounter = 0; // this is for my own sanity

  // Parse the list of servers into string
  const servers = JSON.parse(ns.read(listOfServers));

  // Iterate through list of servers (Start at 2 to ignore home and n00dles)
  for (let i = 0; i < servers.info.length; ++i) {
    const hostname = servers.info[i].hostname;

    if (hostname === "n00dles" || hostname === "home") continue;

    ns.killall(hostname);
    ++serverCounter;
  }

  ns.tprintf("All servers scripts killed! (Except 'n00dles & home')");
  ns.tprintf("Number of servers freed up: " + serverCounter);
}
