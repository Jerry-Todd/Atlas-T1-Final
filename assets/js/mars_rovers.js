
const options_status = document.getElementById('options-status')

const status = {
    loading: 'Loading...',
    failed: 'Could not load rovers.'
}

const rover_options_container = document.getElementById('rover-options')
const rover_option_template = document.getElementsByClassName('rover-option')[0]
rover_option_template.remove()

const api_links = {
    roverList: 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
}

let rovers

request(api_links.roverList, (data) => {
    // options_status.textContent = status.loading
    rovers = data.rovers
    console.log(rovers)

    rovers.forEach(rover => {
        let option = rover_option_template.cloneNode(true)
        option.textContent = rover.name
        rover_options_container.append(option)
    });
})

