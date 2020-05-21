export default dataIslands

function dataIslands () {
  return Array.from(document.querySelectorAll('[type="application/ld+json"]'))
    .map(island => [island.id, JSON.parse(island.text)])
    .reduce((obj, item) => {
      obj[item[0]] = item[1]
      return obj
    }, {})
}

function updateIsland (id, data) {
  document.getElementByID(id).text = JSON.stringify(data, null, 2)
  saveIsland(id)
}

function saveIsland (id) {
  var island = document.getElementByID(id)
  var url = data.src
  var thejson = data.text
  // PUT thejson to the src
}
