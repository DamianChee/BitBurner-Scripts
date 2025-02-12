/** @param {NS} ns **/
export async function main(ns) {
  let doc = eval('document');

  // This does not work
  //const doc = eval("ns.bypass(document);");

  // Hook into game's overview
  const hook0 = doc.getElementById('overview-extra-hook-0');
  const hook1 = doc.getElementById('overview-extra-hook-1');

  while (true) {
    try {
      const headers = []
      const values = [];

      // headers.push("ScrInc");
      // values.push(ns.formatNumber(ns.getTotalScriptIncome()[0].toPrecision(5), "$0.0a") + '/sec');
      // // Add script exp gain rate per second
      // headers.push("ScrExp");
      // values.push(ns.formatNumber(ns.getTotalScriptExpGain().toPrecision(5), "$0.0a") + '/sec');

      headers.push(`ScrInc ---   `);
      values.push(ns.formatNumber(ns.getTotalScriptIncome()[0].toPrecision(5)) + '/s');

      headers.push(`ScrExp ---   `);
      values.push(ns.formatNumber(ns.getTotalScriptExpGain().toPrecision(5)) + '/s');

      hook0.innerText = headers.join(" \n");
      hook1.innerText = values.join("\n");

    } catch (error) {
      ns.print("ERROR- Update Skipped: " + String(error));
    }

    await ns.sleep(1000);
  }
}