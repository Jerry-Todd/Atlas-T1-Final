const rover_content = document.getElementById('rover-content')
const cameras_content = document.getElementById('camera-content')
const images_content = document.getElementById('image-content')
rover_content.style.display = 'flex'
cameras_content.style.display = 'none'
images_content.style.display = 'none'

const api_links = {
    roverList: 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
}

let rovers_list

const text_option_template = document.getElementsByClassName('option')[0]
text_option_template.remove()

// Rovers code
const rovers_status = document.getElementById('rovers-status')

const rover_options = document.getElementById('rover-options')

rovers_status.style.display = 'default'
request(api_links.roverList, (data) => {
    rovers_status.style.display = 'none'
    rovers_list = data.rovers
    console.log(rovers_list)
    data.rovers.forEach(rover => {
        let option = text_option_template.cloneNode(true)
        option.textContent = rover.name
        rover_options.append(option)
        option.addEventListener('click', () => {
            viewCameras(rover.name)
        })
    });
})

function viewRovers() {
    cameras_content.style.display = 'none'
    rover_content.style.display = 'flex'
}

// Cameras code
const cameras_status = document.getElementById('cameras-status')

const camera_options = document.getElementById('camera-options')

let current_rover
function viewCameras(rover_name) {
    current_rover = rover_name
    rover_content.style.display = 'none'
    images_content.style.display = 'none'
    cameras_content.style.display = 'flex'

    cameras_status.style.display = 'none'

    let rover = rovers_list.find(rover => rover.name == rover_name)

    console.log(rover)

    camera_options.innerHTML = ''
    rover.cameras.forEach(camera => {
        console.log(camera)
        let option = text_option_template.cloneNode(true)
        option.textContent = camera.full_name
        camera_options.append(option)
        option.addEventListener('click', () => {
            viewImages(rover.name, camera.name)
        })
    })
}

const camera_exit = document.querySelector('#camera-content .back-button')

camera_exit.addEventListener('click', () => { viewRovers() })

// Images code
const images_status = document.getElementById('images-status')

const images_view = document.getElementById('images')

const image_template = document.getElementsByClassName('image')[0]
image_template.remove()

function viewImages(rover_name, camera_name) {
    images_view.innerText = ''
    images_status.style.display = 'flex'
    cameras_content.style.display = 'none'
    images_content.style.display = 'flex'
    console.log(rover_name, camera_name)

    loadImages(rover_name, camera_name, 10)
}

function loadImages(rover_name, camera_name, amount, index, photo_count) {
    if (index == undefined) {
        index = 1
    }
    if (photo_count == undefined) {
        photo_count = 0
    }
    if (photo_count > amount || index > 100) {
        images_status.style.display = 'none'
        return
    }
    request(`${api_links.roverList}${rover_name}/photos`, (data) => {
        console.log(photo_count, data)
        if (data.photos.length != 0) {
            photo_count++
            let image = image_template.cloneNode(true)
            image.setAttribute('src', data.photos[0].img_src)
            images_view.append(image)
        }
        loadImages(rover_name, camera_name, amount, index+1, photo_count)
    }, {
        camera: camera_name,
        sol: index
    })

}

const image_exit = document.querySelector('#image-content .back-button')

image_exit.addEventListener('click', () => { viewCameras(current_rover) })