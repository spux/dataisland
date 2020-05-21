function saveIsland (id) {
  var island = document.getElementById(id)
  fetch(island.src, {
    method: 'PUT',
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

;(() => {
  globalThis.di = new Proxy(
    Array.from(document.querySelectorAll('[type="application/ld+json"]'))
      .map(island => [island.id, JSON.parse(island.text)])
      .reduce((obj, item) => {
        obj[item[0]] = item[1]
        return obj
      }, {}),
    {
      set: (obj, prop, value) => {
        obj[prop] = value
        document.getElementById(prop).text = JSON.stringify(value, null, 2)
        saveIsland(prop)
        return true
      }
    }
  )
})()
