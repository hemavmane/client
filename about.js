

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
    const ProductContainer = document.getElementById('about-us');
    const aboutData = await fetchaboutData();
    console.log(aboutData);

    
    const { OfficeAddress, email, phone } = aboutData[0];

    const officeAddressHTML = `
        <div class="office-address">
            <h2>Office Address</h2>
            <p>${OfficeAddress}</p>
            <h2>Email</h2>
            <p>${email}</p>
            <h2>Phone</h2>
            <p>${phone}</p>
        </div>
    `;


    ProductContainer.innerHTML = officeAddressHTML;
}

renderAbout();

