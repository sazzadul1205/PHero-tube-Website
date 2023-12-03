document.getElementById('sort-by-view').addEventListener('click', () => {
    sortVideosByViews();
});

const sortVideosByViews = () => {
    const vidCont = document.getElementById('video-container');
    const videoCards = Array.from(vidCont.querySelectorAll('.card'));


    videoCards.sort((a, b) => {
        const viewsA = parseInt(a.querySelector('span').textContent);
        const viewsB = parseInt(b.querySelector('span').textContent);

        return viewsB - viewsA;
    });
    
    vidCont.innerHTML = '';

    videoCards.forEach((card) => {
        vidCont.appendChild(card);
    });
};