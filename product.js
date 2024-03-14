

async function fetchProductData() {
    try {
        const response = await fetch('https://assesmentmarch.onrender.com/api/getproduct');
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function renderProduct() {
    const ProductContainer = document.getElementById('content-section');
    const products = await fetchProductData();
   
    const serviceCardsHTML = products.map((product,index) =>
        index%2===0 ?  
        `
        <div class="product-container">
            <div class="product-image">
                <img src="https://assesmentmarch.onrender.com/productiamg/${product.imageURL}" alt="" class="imgss">
            </div>
            <div class="product-details">
                <div class="sect3">
                    <div class="product-details">
                        <h2 class="product-title">${product.productName}</h2>
                        <div class="custom-table">
                            <div class="table-row header">
                                <div class="table-cell">productName</div>
                                <div class="table-cell">Category</div>
                                <div class="table-cell">Manufacturer</div>
                                <div class="table-cell">Specifications</div>
                                <div class="table-cell">Price</div>
                            </div>
                            <div class="table-row">
                                <div class="table-cell">${product.productName}</div>
                                <div class="table-cell">${product.category}</div>
                                <div class="table-cell">${product.manufacturer}</div>
                                <div class="table-cell">${product.specifications}</div>
                                <div class="table-cell">${product.price}</div>
                            </div>
                        </div>
                        <p class="product-description">${product.description}</p>
                    </div>
                </div>
            </div>
        </div>
        ` :
        `
        <div class="product-container">
            <div class="product-details">
                <div class="sect3">
                    <div class="product-details">
                        <h2 class="product-title">${product.productName}</h2>
                        <div class="custom-table">
                            <div class="table-row header">
                                <div class="table-cell">productName</div>
                                <div class="table-cell">Category</div>
                                <div class="table-cell">Manufacturer</div>
                                <div class="table-cell">Specifications</div>
                                <div class="table-cell">Price</div>
                            </div>
                            <div class="table-row">
                                <div class="table-cell">${product.productName}</div>
                                <div class="table-cell">${product.category}</div>
                                <div class="table-cell">${product.manufacturer}</div>
                                <div class="table-cell">${product.specifications}</div>
                                <div class="table-cell">${product.price}</div>
                            </div>
                        </div>
                        <p class="product-description">${product.description}</p>
                    </div>
                </div>
            </div>
            <div class="product-image">
                <img src="https://assesmentmarch.onrender.com/productiamg/${product.imageURL}" alt="" class="imgss">
            </div>
        </div>
        `
    ).join('');

    ProductContainer.innerHTML = serviceCardsHTML;
}

document.addEventListener("DOMContentLoaded", function() {
    const productImage = document.querySelector(".product-image");
    productImage.classList.add("fade-in");
});

renderProduct();

document.addEventListener("DOMContentLoaded", function() {
    const productImage = document.querySelector(".product-image");
    productImage.classList.add("fade-in");
});

renderProduct()
