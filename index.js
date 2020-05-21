export default function dataIsland () {
  return JSON.parse(document.querySelector('[type="application/ld+json"]').text)
}

export function dataIslands () {
  return Array.from(document.querySelectorAll('[type="application/ld+json"]'))
    .map(island => [island.id, JSON.parse(island.text)])
    .reduce((obj, item) => {
      obj[item[0]] = item[1]
      return obj
    }, {})
}

export function updateIsland (id, data) {
  document.getElementByID(id).text = JSON.stringify(data, null, 2)
  saveIsland(id)
}

export function saveIsland (id) {
  var island = document.getElementById(id)
  fetch(island.src, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: island.text
  })
    .then(data => {
      console.log('Success:', data)
    })
    .catch(error => {
      console.error('Error:', error)
    })
}
