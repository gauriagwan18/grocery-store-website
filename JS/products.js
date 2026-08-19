document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".product .container");
  if (!container) return; // not on the products page

  // Same products that used to be hardcoded in product.html.
  // Used only to seed Firestore the very first time (when the collection is empty).
  const sampleProducts = [
    { name: "Fresh Apple", price: 7.00, image: "apple.jpg" },
    { name: "Dragon Fruit", price: 15.00, image: "dragon fruit.jpg" },
    { name: "watermelon", price: 20.00, image: "watermelon.jpg" },
    { name: "Strawberry", price: 10.00, image: "strawberry2.jpg" },
    { name: "orange", price: 3.00, image: "orange2.jpg" },
    { name: "Green Grapes", price: 3.00, image: "green grapes.jpg" },
    { name: "Mango", price: 3.00, image: "mango2.jpg" },
    { name: "Green Pear", price: 3.00, image: "green pear.jpg" },
    { name: "Fresh Banana", price: 4.00, image: "banana2.jpg" },
    { name: "Fresh Guava", price: 5.00, image: "guava.jpg" },
    { name: "Fresh Pomogranate", price: 7.00, image: "pomogranate.jpg" },
    { name: "Fresh Papaya", price: 5.00, image: "papaya.jpg" },
    { name: "Fresh Potato", price: 4.00, image: "potato.jpeg" },
    { name: "Fresh Brinjal", price: 5.00, image: "brinjal.jpeg" },
    { name: "Fresh Capsicum", price: 6.00, image: "capsicum.jpeg" },
    { name: "Fresh Onion", price: 8.00, image: "onion.jpeg" },
    { name: "Fresh Brocoli", price: 7.00, image: "brocoli.jpeg" },
    { name: "Fresh Spinach", price: 6.00, image: "spinach.jpeg" },
    { name: "Fresh Lady'sFinger", price: 7.00, image: "lady's finger.jpeg" },
    { name: "Fresh Tomato", price: 4.00, image: "tomato.jpeg" },
    { name: "Fresh Cabbage", price: 5.00, image: "cabbage.jpeg" },
    { name: "Oil", price: 5.00, image: "oil img.jpg" }
  ];

  async function seedIfEmpty() {
    const snapshot = await db.collection("products").limit(1).get();
    if (!snapshot.empty) return;

    const batch = db.batch();
    sampleProducts.forEach(product => {
      const ref = db.collection("products").doc();
      batch.set(ref, product);
    });
    await batch.commit();
    console.log("Seeded 'products' collection in Firestore.");
  }

  function renderProducts(products) {
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("image");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${Number(product.price).toFixed(2)} per kg</p>
        <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  }

  async function loadProducts() {
    try {
      await seedIfEmpty();
      const snapshot = await db.collection("products").orderBy("name").get();
      const products = snapshot.docs.map(doc => doc.data());
      renderProducts(products);
    } catch (err) {
      console.error("Failed to load products from Firestore:", err);
      container.innerHTML = "<p>Couldn't load products right now. Please refresh the page.</p>";
    }
  }

  loadProducts();
});
