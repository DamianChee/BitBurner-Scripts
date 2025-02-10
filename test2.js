/** @param {NS} ns */
export async function main(ns) {
let[p0,p1]=[[],[]];for(let s of ns.scan("home")){let p=ns.getServerNumPortsRequired(s);p==0?p0.push(s):p<2?p1.push(s):{}}
ns.tprint(p0);
ns.tprint(p1);
}