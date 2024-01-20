fetch('https://apis.scrimba.com/unsplash/photos')
    .then(res => res.json())
    .then (data => {
        console.log(data)
    })