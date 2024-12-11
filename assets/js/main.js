
const api_key = 'VWDPpY06br1UmTavG8KivN30mNbVG64xKpQLo0qH'

const potd = (image) => document.getElementById('potd-image').setAttribute('src', image)
const potd_title = (text) => document.getElementById('potd-title').textContent = text
const potd_description = (text) => document.getElementById('potd-description').textContent = text
const potd_link = 'https://api.nasa.gov/planetary/apod'

request(potd_link, (data) => {
    potd(data.hdurl)
    potd_title(data.title)
    potd_description(data.explanation)
})

