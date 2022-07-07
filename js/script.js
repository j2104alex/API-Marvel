const publicKey = '3fa199403d8b09bd80572b56cf1617a7';
const privateKey = '2c61038490effcd8e746835b67287ef73e6e1593';
const baseURL = 'https://gateway.marvel.com:443/v1/public/';
const md5hash = '6ff3d352ca893a72d3eef68f8210ba9c' //'12c61038490effcd8e746835b67287ef73e6e15933fa199403d8b09bd80572b56cf1617a7';

const searchBox = document.getElementById('search-box');

const characterName = document.getElementById('character-name');
const characterImg = document.getElementById('card-image');
const characterDesc = document.getElementById('character-description');



function getCharactersURL() {
    let url = baseURL;
    url += 'characters?ts=1'
    url += '&apikey=' + publicKey;
    url += '&hash=' + md5hash;
    return url;
}

function searchCharacter(name) {
    let url = getCharactersURL() + '&name=' + name;
    let character;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            showData(data.data.results[0]);
        })
        .catch(e => console.log(e));

}

function showData(character) {
    if (character != null || character != undefined) {
        console.log(character);
        characterName.innerHTML = character.name;
        characterImg.setAttribute('src', character.thumbnail.path + '.' + character.thumbnail.extension);
        characterDesc.innerHTML = character.description;
    }
    else {
        characterName.innerHTML = searchBox.value;
        characterImg.setAttribute('src', './assets/img/404.png');
        characterDesc.innerHTML = searchBox.value + ' not found, pleare refer to official name!'

    }
}

// Execute a function when the user presses a key on the keyboard
document.getElementById("search-box").addEventListener("keyup", function (event) {
    if (searchBox.value.length > 2) {
        console.log('Buscando...:', searchBox.value);
        searchCharacter(searchBox.value)
    }
}
);
