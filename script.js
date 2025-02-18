// ==UserScript==
// @name         NumbeoAptAutoCopy
// @namespace    http://tampermonkey.net/
// @version      2024-12-08
// @description  Copy to the clipboard avgerage apartment price (avg between city center and outside of the city prices)
// @author       f2mars
// @match        https://www.numbeo.com/cost-of-living/in/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  const tds = Array.from(document.querySelectorAll("td"));
  const center = tds
    .find((td) =>
      td.textContent.includes("Apartment (1 bedroom) in City Centre")
    )
    .nextElementSibling.textContent.trim();
  const outside = tds
    .find((td) =>
      td.textContent.includes("Apartment (1 bedroom) Outside of Centre")
    )
    .nextElementSibling.textContent.trim();

  const sum = [center, outside].reduce(
    (accum, current) => accum + Number.parseFloat(current.replace(",", "")),
    0
  );
  const avg = (sum / 2).toFixed(2);

  const input = document.createElement("input");
  input.type = "text";
  input.value = avg;

  input.select();
  setTimeout(() => navigator.clipboard.writeText(avg), 250);
})();
