
// Add subtle parallax effect
document.addEventListener('mousemove', (e) => {
    const decorations = document.querySelectorAll('.decoration');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    decorations.forEach((decoration, index) => {
        const speed = (index + 1) * 10;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        decoration.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    rtl: false,

    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 30,
    speed: 1200,
    loop: false,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        }
    }
});




 document.getElementById('videoPlaceholder').addEventListener('click', function() {
            const placeholder = document.getElementById('videoPlaceholder');
            const iframe = document.getElementById('vimeoPlayer');
            
            placeholder.style.display = 'none';
            iframe.style.display = 'block';
            
            // Add autoplay parameter when user clicks
            const currentSrc = iframe.src;
            iframe.src = currentSrc + '&autoplay=1';
        });