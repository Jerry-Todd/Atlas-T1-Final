
const api_key = 'VWDPpY06br1UmTavG8KivN30mNbVG64xKpQLo0qH'

// A function to make axios a little easier to use
function request(url, callback, parameters) {
    let fullURL = url + '?api_key=' + api_key
    if (parameters != undefined) { fullURL += ParametersFromJSON(parameters) }
    axios.get(fullURL)
        .then(response => callback(response.data))
        .catch(error => {
            console.error(error)
        })
}

// Function to turn an object into parameters for get request
function ParametersFromJSON(json) {
    if (json == undefined) {
        console.log(json)
        return {}
    }
    let keys = Object.keys(json)
    let parameters = ""
    keys.forEach(key => {
        parameters += `&${key}=${json[key]}`
    });
    console.log(parameters)
    return parameters
}