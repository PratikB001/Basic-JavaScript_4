const addMovieModalElement = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];

const startAddMovieButtonElement = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;

const backdropElement = document.getElementById('backdrop');
// const backdropElement = document.body.firstElementChild;

const cancelAddMovieButtonElement = addMovieModalElement.querySelector('.btn--passive');
const confirmAddMovieButtonElement = cancelAddMovieButtonElement.nextElementSibling;
const userInputsElement = addMovieModalElement.querySelectorAll('input');
// const userInputsElement = addMovieModalElement.getElementsByTagName('input');
const entryTextSectionElement = document.getElementById('entry-text');
const movies = [];

const updateUI = () => {
    if (movies.length === 0){
        entryTextSectionElement.style.display = 'block';
    }else{
        entryTextSectionElement.style.display = 'none';
    }
}

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies){
        if (movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = "movie-element___image">
        <img src = "${imageUrl}" alt="${title}">
    </div>
    <div class = "movie-element___info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdropElement.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModalElement.classList.toggle('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const usrInput of userInputsElement){
        usrInput.value = '';
    }
}
const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInput();
};

const addMovieHandler =() => {
    const titleValue = userInputsElement[0].value;
    const imageUrlValue = userInputsElement[1].value;
    const ratingValue = userInputsElement[2].value;

    if( titleValue.trim() === '' || 
        imageUrlValue.trim() === '' || 
        ratingValue.trim()==='' ||
        +ratingValue < 1 ||
        +ratingValue > 5){
            alert('Please enter a valid value');
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.id,newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

startAddMovieButtonElement.addEventListener('click', toggleMovieModal);
backdropElement.addEventListener('click', backdropClickHandler);
cancelAddMovieButtonElement.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButtonElement.addEventListener('click', addMovieHandler);