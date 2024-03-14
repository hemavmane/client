



document.addEventListener("DOMContentLoaded", async function () {
    const slidesContainer = document.querySelector('.slides');
    const dotContainer = document.querySelector('.dot-container');
    let currentSlide = 0;
    const data = await fetchData();
    slidesContainer.innerHTML = data.map(item =>
        `<div class="slide"><img class="img-slide2" src="https://assesmentmarch.onrender.com/Banner/${item.BannerImag}" alt=""></div>`).join('');
    dotContainer.innerHTML = data.map((_, index) =>
        `<label class="dot" for="dot${index}"></label>`).join('');
    showSlide(currentSlide);
    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('checked');
        });

        slides[index].classList.add('active');
        dots[index].classList.add('checked');
    }

    function handleDotClick(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    dotContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('dot')) {
            const index = Array.from(dotContainer.children).indexOf(event.target);
            handleDotClick(index);
        }
    });

    function autoSlide() {
        currentSlide = (currentSlide + 1) % data.length;
        showSlide(currentSlide);
    }

    setInterval(autoSlide, 5000);
});
document.addEventListener("DOMContentLoaded", function () {
    const contentSection = document.querySelector('.content-section');
    contentSection.classList.add('active');
});



async function fetchData() {
    try {
        const response = await fetch('https://assesmentmarch.onrender.com/api/getbanner');
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}







var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {

            document.querySelector('.about-image').style.left = '0';
            document.querySelectorAll('.about-right p').forEach(function (p) {
                p.style.opacity = 1;
                p.style.transform = 'translateX(0)';
            });

            observer.unobserve(entry.target);
        }
    });
});


observer.observe(document.querySelector('.about-left'));




async function fetchabout() {
    try {
        const response = await fetch('https://assesmentmarch.onrender.com/api/getAbout');
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


const counterElements = document.querySelectorAll('.count');


const updateCounter = (index, value) => {
    counterElements[index].textContent = value;
};


const updateCounters = () => {
    for (let i = 0; i < counterElements.length; i++) {
        const increment = i + 1;
        let currentValue = 0;

        const incrementCounter = () => {
            currentValue += increment;
            updateCounter(i, currentValue);

            if (currentValue < 500) {
                setTimeout(incrementCounter, 10);
            }
        };

        incrementCounter();
    }
};

updateCounters();






async function fetchProductData() {
    try {
        const response = await fetch('https://assesmentmarch.onrender.com/api/getproduct');
        const resdata = await response.json();

        return resdata.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function renderServiceCards() {
    const serviceCartsContainer = document.getElementById('serviceCarts');
    const products = await fetchProductData();
    const serviceCardsHTML = products.map(product => `
        <div class="service-cart">
            <img class="serviceimg"
 src="https://assesmentmarch.onrender.com/productiamg/${product.imageURL}" />
 <p class="servicename">${product.productName}</p>
        </div>
        
    `).join('');

    serviceCartsContainer.innerHTML = serviceCardsHTML;
}

renderServiceCards();


async function SliderRender() {
    const sliderContainer = document.getElementById('sliderContainer');
    const sliderDotsContainer = document.getElementById('psliderDots');
    const SliderData = await fetchProductData();

    let currentIndex = 0;

    function updateSlider() {
        const serviceCardsHTML = SliderData.map(product => `
            <div class="service-cart1">
                <img class="serviceimg" src="https://assesmentmarch.onrender.com/productiamg/${product.imageURL}" />
                <p class="servicename">${product.productName}</p>
            </div>
        `).join('');

        sliderContainer.innerHTML = serviceCardsHTML;

        const dotsHTML = SliderData.map((_, index) => `
            <span class="pdot ${index === currentIndex ? 'pactive-dot' : ''}"

            data-index="${index}"></span>
        `).join('');

        sliderDotsContainer.innerHTML = dotsHTML;

        const dots = document.querySelectorAll('.pdot');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateSlider();
            });
        });
    }

    updateSlider();
}

SliderRender();




async function fetchClientsData() {
    try {
        const response = await fetch('https://assesmentmarch.onrender.com/api/getclient');
        const resdata = await response.json();

        return resdata.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function ClientsRender() {
    const sliderContainer = document.getElementById('clients');
    const SliderData = await fetchClientsData();

    let currentIndex = 0;

    function updateClientslider() {
        const start = currentIndex;
        const end = Math.min(currentIndex + 3, SliderData.length);
        const visibleData = SliderData.slice(start, end);

        const serviceCardsHTML = visibleData.map(product => `
            <div class="service-cart1">
                <img class="clientsimg" src="https://assesmentmarch.onrender.com/Clientimage/${product.profile}" />
                <p class="clientname">${product.ClientName}</p>
                <span >${product.testimonial}</span>
            </div>
        `).join('');

        sliderContainer.innerHTML = serviceCardsHTML;
    }

    updateClientslider();

    
}

ClientsRender();


