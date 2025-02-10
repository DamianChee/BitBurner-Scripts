/** 
 * 
 * I want it displayed as such:
 * home
 * |-> n00dles
 * |   |-> nectar-net
 * |-> foodnstuff
 * |-> sigma-cosmetics
 * |   |-> zer0
 * |       |-> silver-helix
 * |       |   |-> the-hub
 * |       |-> phantasy
 * |           |-> computek
 * |           |-> crush-fitness
 * |               |-> syscore
 * |               |-> catalyst
 * |                   |-> millenium-fitness
 * |                       |-> galactic-cyber
 * |-> joesguns
 * |-> hong-fang-tea
 * |-> harakiri-sushi
 * |   |-> CSEC
 * |       |-> neo-net
 * |       |   |-> netlink
 * |       |   |-> johnson-ortho
 * |       |       |-> rothman-uni
 * |       |       |-> summit-uni
 * |       |       |   |-> rho-construction
 * |       |       |-> I.I.I.I
 * |       |           |-> lexo-corp
 * |       |               |-> global-pharm
 * |       |           |-> aevum-police
 * |       |               |-> aerocorp
 * |       |-> omega-net
 * |-> iron-gym
 *     |-> max-hardware
 * 
*/

/** @param {NS} ns */
export async function main(ns) {
  let head = "home";
  let servers = [head];
  let depth = 0;

  ns.tprintf("home");
  depthFirstSearch(ns, servers, head, depth);
}

/** @param {NS} ns */
export function depthFirstSearch(ns, servers, head, depth) {
  let tails = ns.scan(head).filter(val => !servers.includes(val));

  for (const newServer of tails) {
    if (newServer == "darkweb" || newServer.includes("Atlas")) continue;
    ns.tprintf(` ${Array(++depth).join("|   ")}|-> ${newServer}`);
    servers.push(newServer);
    depthFirstSearch(ns, servers, newServer, depth--);
  }
}
