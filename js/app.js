'use strict';

let welcome = document.getElementById('welcome');
let attempsEl = document.getElementById('attempts');
let leftImg = document.getElementById('leftImg');
let middleImg = document.getElementById('middleImg');
let rightImg = document.getElementById('rightImg');
let results = document.getElementById('results');
let button = document.getElementById('viewResults');

let imgArray = ['bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'water-can.jpg',
    'wine-glass.jpg'];

let products = [];
let maxAttempts = 5;
let attempt = 1;

welcome.textContent = `Welcome to our page, you can vote to your favorite product ${maxAttempts} times`;
attempsEl.textContent = `Attempt ${attempt} of ${maxAttempts}`;

function ProductImg(imgName) {
    this.Name = imgName.split('.')[0];
    this.imgSrc = `img/${imgName}`;
    this.votes = 0;
    this.views = 0;
    products.push(this);
}

for (let i = 0; i < imgArray.length; i++) {
    new ProductImg(imgArray[i]);
}

function randomImage() {
    return Math.floor(Math.random() * products.length);
}

let leftIndex;
let middleIndex;
let rightIndex;

function renderImg() {
    leftIndex = randomImage();
    middleIndex = randomImage();
    rightIndex = randomImage();

    while (leftIndex === middleIndex || leftIndex === rightIndex || rightIndex === middleIndex) {
        leftIndex = randomImage();
        middleIndex = randomImage();
    }

    leftImg.setAttribute('src', products[leftIndex].imgSrc);
    middleImg.setAttribute('src', products[middleIndex].imgSrc);
    rightImg.setAttribute('src', products[rightIndex].imgSrc);
    products[leftIndex].views++;
    products[middleIndex].views++;
    products[rightIndex].views++;
}

renderImg();

leftImg.addEventListener('click', clickHandler);
middleImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {

    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            products[leftIndex].votes++;
        }
        else if (clickedImage === 'middleImg') {
            products[middleIndex].votes++;
        }
        else if (clickedImage === 'rightImg') {
            products[rightIndex].votes++;
        }

        renderImg();
        attempt++;
        if (attempt <= maxAttempts) {
            attempsEl.textContent = `Attempt ${attempt} of ${maxAttempts}`;
        }
        else {
            attempsEl.textContent = 'You finished your attempts, you can now view the results';
        }
    }
    else {
        leftImg.removeEventListener('click', clickHandler);
        middleImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
    }
}

button.addEventListener('click', resultsHandler);

function resultsHandler() {

    if (attempt === maxAttempts + 1) {

        for (let i = 0; i < products.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${products[i].Name} has got ${products[i].votes} votes and was viewed ${products[i].views} times.`;
            results.appendChild(liEl);
        }
        button.removeEventListener('click', resultsHandler);
    }
    else {
        alert('You can\'t view the results before you finish the attemps.');
    }
}
