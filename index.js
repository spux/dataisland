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
        var island = document.getElementById(prop)
        island.text = JSON.stringify(value, null, 2)
        if (island.src)
          fetch(island.src, {
            method: 'PUT',
            body: island.text,
            headers: {
              'Content-Type': island.type
            }
          }).then(function (response) {
            island.dispatchEvent(
              new CustomEvent(response.ok ? 'di-save' : 'di-error', {
                bubbles: true,
                detail: response
              })
            )
          })
        return true
      }
    }
  )
})()
