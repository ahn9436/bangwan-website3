// Carousel Logic
const carouselItems = document.querySelector('.carousel-items');
const carouselDots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;


function updateCarousel() {
    carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
    carouselDots.forEach(dot => dot.classList.remove('active'));
    carouselDots[currentIndex].classList.add('active');
}

function showNext() {
    currentIndex = (currentIndex + 1) % carouselDots.length;
    updateCarousel();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + carouselDots.length) % carouselDots.length;
    updateCarousel();
}

nextButton.addEventListener('click', showNext);
prevButton.addEventListener('click', showPrev);

carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});


// Modal Logic
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalDescription = document.getElementById('modal-description');
const contentImages = document.querySelectorAll('.content-item img');
const close = document.getElementById('close');

close.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

//Videos load zone

function loadVideo(card, videoSrc) {
        let videoContainer = card.querySelector('.video-container');
        let videoElement = videoContainer.querySelector('video');

        if (!videoElement.src) {
            videoElement.src = videoSrc; // Load the video on click
        }

        card.querySelector('.thumbnail').style.display = 'none'; // Hide thumbnail
        videoContainer.style.display = 'flex'; // Show video
        videoElement.play(); // Auto-play video
    }

    let extraVideos = [
        { src: 'video4.mp4', thumbnail: 'thumbnail4.jpg'},
        { src: 'video5.mp4', thumbnail: 'thumbnail5.jpg'},
        { src: 'video6.mp4', thumbnail: 'thumbnail6.jpg'},
    ];

    function loadMoreVideos() {
        let container = document.getElementById('videoContainer');

        extraVideos.forEach(video => {
            let videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.setAttribute('onclick', `loadVideo(this, '${video.src}')`);

            videoCard.innerHTML = `
                <img src="${video.thumbnail}" alt="Thumbnail" class="thumbnail">
                <div class="video-container">
                    <video controls></video>
                </div>
            `;

            container.appendChild(videoCard);
        });

        document.querySelector('.load-more').style.display = 'none'; // Hide the button after loading more videos
    }