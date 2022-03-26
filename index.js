const URL =
  "https://cloudmae.dk/wp-recreate-this/wp_recreate/wp-json/wp/v2/bike?_embed&orderby=id&order=asc";

fetch(URL)
  .then((res) => res.json())
  .then((data) => handleProductList(data));

function handleProductList(data) {
  console.log(data);
  data.forEach(displayBikes);
}

async function displayBikes(product) {
  console.log(product);
  // grab template
  const template = document.querySelector("#bikeTemplate").content;
  // clone it
  const copy = template.cloneNode(true);
  // change content
  copy.querySelector(".product-name").textContent = product.title.rendered;
  copy.querySelector(".brand-name").textContent =
    product._embedded["wp:term"][0][0].name;

  // image
  copy.querySelector(
    "img"
  ).src = `${product._embedded["wp:featuredmedia"][0].source_url}`;

  // price
  if (product.price_maximum > 1) {
    copy.querySelector(
      ".product-price"
    ).textContent = `$${product.price_minimum} - ${product.price_maximum}`;
  }
  if (product.price_maximum < 1) {
    copy.querySelector(
      ".product-price"
    ).textContent = `$${product.price_minimum}`;
  }

  // colours
  let colours = product._embedded["wp:term"][1];

  if (colours[1]) {
    copy
      .querySelector(".colour-1")
      .classList.add(`${product._embedded["wp:term"][1][0].slug}`);
    copy
      .querySelector(".colour-2")
      .classList.add(`${product._embedded["wp:term"][1][1].slug}`);
  }
  if (colours[2]) {
    copy
      .querySelector(".colour-3")
      .classList.add(`${product._embedded["wp:term"][1][2].slug}`);
  }
  if (colours[3]) {
    copy
      .querySelector(".colour-4")
      .classList.add(`${product._embedded["wp:term"][1][3].slug}`);
  }
  if (colours[4]) {
    copy
      .querySelector(".colour-5")
      .classList.add(`${product._embedded["wp:term"][1][4].slug}`);
  }

  if (product._embedded["wp:term"][1][0].name === "N/A") {
    copy.querySelector(".product-colours").textContent = "N/A";
  }

  // stock
  copy.querySelector(".product-stock").textContent = `${product.stock}`;

  // select parent
  const parent = document.querySelector("main");
  // append it
  parent.appendChild(copy);
}
