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
let maxAttempts = 25;
let attempt = 1;
let previousImages =[];
let Names = [];
let votes = [];
let views = [];

welcome.textContent = `Welcome to our page, you can vote to your favorite product ${maxAttempts} times`;
attempsEl.textContent = `Attempt ${attempt} of ${maxAttempts}`;

function ProductImg(imgName) {
    this.Name = imgName.split('.')[0];
    this.imgSrc = `img/${imgName}`;
    this.votes = 0;
    this.views = 0;
    products.push(this);
    Names.push(this.Name);
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

    while (previousImages.includes(leftIndex) || previousImages.includes(middleIndex) || previousImages.includes(rightIndex) || leftIndex === middleIndex || leftIndex === rightIndex || rightIndex === middleIndex) {
        leftIndex = randomImage();
        middleIndex = randomImage();
        rightIndex = randomImage();
    }

    if (attempt > maxAttempts) {
        leftImg.setAttribute('src', 'https://convertingcolors.com/plain-F0F0F0.svg');
        middleImg.setAttribute('src', 'https://convertingcolors.com/plain-F0F0F0.svg');
        rightImg.setAttribute('src', 'https://convertingcolors.com/plain-F0F0F0.svg');
    }
    else {
        leftImg.setAttribute('src', products[leftIndex].imgSrc);
        middleImg.setAttribute('src', products[middleIndex].imgSrc);
        rightImg.setAttribute('src', products[rightIndex].imgSrc);

        products[leftIndex].views++;
        products[middleIndex].views++;
        products[rightIndex].views++;

        previousImages[0] = leftIndex;
        previousImages[1] = middleIndex;
        previousImages[2] = rightIndex;
    }
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

        attempt++;
        renderImg();
        console.log(attempt);
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

            votes.push(products[i].votes);
            views.push(products[i].views);
        }
        button.removeEventListener('click', resultsHandler);
        chartRender();
    }
    else {
        alert('You can\'t view the results before you finish the attemps.');
    }
}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Names,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: views,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
