

function SubmitInfo() {
    const comment = document.getElementById('message').value;
    const userphone = document.getElementById('phone').value;
    const useremail = document.getElementById('email').value;
    const username = document.getElementById('username').value;

    const formData = {
        phone: userphone,
        email: useremail,
        message: comment,
        username: username,
    };

    fetch('https://assesmentmarch.onrender.com/api/uinfo/adduserinfo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            // document.getElementById('message').value = "";
            // document.getElementById('phone').value = "";
            // document.getElementById('email').value = "";
            // document.getElementById('username').value = "";
            alert('Contact Info added successfully');
        })
        .catch(error => {
            console.error('Error adding Contact Info:', error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    var officeLocation = L.latLng(17.913207, 77.530060);

    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var officeMarker = L.marker(officeLocation).addTo(map)
        .bindPopup('Udgir Road Near Government First Grade College, Naubad, Bidar, Karnataka 585402');

    map.locate({ setView: true, maxZoom: 15 });

    function onLocationFound(e) {
        var userLocation = e.latlng;
        map.setView(userLocation, 13);
        var userMarker = L.marker(userLocation).addTo(map)
            .bindPopup('channsandra');
        L.Routing.control({
            waypoints: [
                userLocation,
                officeLocation
            ],
            routeWhileDragging: true,
        }).addTo(map);
    }

    map.on('locationfound', onLocationFound);


    document.querySelector('.redirect-to-map').addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'https://www.google.com/maps?q=17.913207,77.530060';
    });
});


async function fetchaboutData() {
    try {
        const response = await fetch('https://assesmentmarch.onrender.com/api/getAbout');
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function renderAbout() {
    const ProductContainer = document.getElementById('getintouch');
    const aboutData = await fetchaboutData();
    console.log(aboutData);

    
    const { OfficeAddress, email,  phone} = aboutData[0];

    const officeAddressHTML = `
    <li class="list">
    <a href="tel:+6364828146" class="icons">
      <img width="30" height="30" src="./images/icon (2).png" />
    </a>
    <div class="icons texticons">
      <span>Call us anytime</span>
      <span> ${phone}</span>
    </div>

  </li>
  <li class="list">
    <a href="mailto:AeroNex23@gmail.com" class="icons">
      <img width="30" height="30" src="./images/icon (1).png" />
    </a>
    <div class="icons texticons">
      <span>Send mail</span>
      <span> ${email}</span>
    </div>

  </li>
  <li class="list">
    <a href="#" class="redirect-to-map" aria-colspan="icons" class="icons">
      <img width="30" height="30" src="./images/icon (3).png" />
    </a>
    <div class="icons texticons">
      <span>Office Address</span>
      <span> ${OfficeAddress}</span>
    </div>
  </li>

    `;


    ProductContainer.innerHTML = officeAddressHTML;
}

renderAbout();