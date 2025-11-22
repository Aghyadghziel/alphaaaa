document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');

    function closeMenu() {
        toggle.classList.remove('active');
        nav.classList.remove('active');
    }
    
    window.addEventListener('scroll', function () {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});



    // Toggle menu
    toggle.addEventListener('click', function (e) {
        e.stopPropagation(); // عشان ما يقفل مباشرة
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close on scroll
    window.addEventListener('scroll', function () {
        closeMenu();
    });

    // Close on clicking outside
    document.addEventListener('click', function (e) {
        const isClickInsideMenu = nav.contains(e.target) || toggle.contains(e.target);
        if (!isClickInsideMenu) {
            closeMenu();
        }
    });

    // Optional: close menu on clicking a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
});

  