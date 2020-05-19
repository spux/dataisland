/**
 * @returns {Array} array of data islands
 */
function dataIslands () {
  return Array.from(
    document.querySelectorAll('[type="application/ld+json"]')
  ).map(island => JSON.parse(island.innerText))
}

export default dataIslands;
