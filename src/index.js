console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// Renders images to the DOM
function renderDog(dog){
    let image = document.createElement('IMG')
    image.src = `${dog}`
    document.querySelector('#dog-image-container').appendChild(image)
}

// Fetches images 
function getAllDogImages(){
    return fetch(imgUrl)
    .then(res => res.json())
    .then(dogData => dogData.message.forEach(d => renderDog(d)))
}

// Populates breed list
function listBreeds(breed){
    let breedItem = document.createElement('li')
    breedItem.textContent = `${breed}`
    document.querySelector('#dog-breeds').appendChild(breedItem)
    
    // Change font color when user clicks a breed
    breedItem.addEventListener('click', () => {
        breedItem.style.color = 'blue'
    });
}

// Fetches dog breeds
function getAllDogBreeds(){
    return fetch(breedUrl)
    .then(res => res.json())
    .then(dogData => Object.keys(dogData.message).forEach(d => listBreeds(d)))
}

// User can filter breeds that start with a particular letter
function filterByBreed(){
    const breedDropdown = document.getElementById('breed-dropdown')
    breedDropdown.addEventListener('change', (e) => {
        let userChoice = e.target.value
        
        // Check first letter of breed with for loop
        let breedNames = document.getElementsByTagName('li')
        for (i = 0; i < breedNames.length; i++) {
            let item = breedNames[i]
            let firstLetter = item.textContent[0]

            // If first letter doesn't match, hide it
            if (firstLetter !== userChoice) {
                item.style.display = 'none'
            } else {
                item.style.display = 'list-item'
            }
        }
    })
}

// Initialize
function init(){
    getAllDogImages()
    getAllDogBreeds()
    .then(() => filterByBreed())
}

init()

