/* eslint-disable no-restricted-globals */
let db;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ecommerceDB", 1);

    request.onupgradeneeded = function (event) {
      db = event.target.result;
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
};

self.onmessage = function (e) {
  const { action, data } = e.data;

  switch (action) {
    case "cacheProducts":
      cacheProducts(data);
      break;
    case "getCachedProducts":
      getCachedProducts();
      break;
    case "updateCart":
      updateCart(data);
      break;
    case "getCart":
      getCart();
      break;
    default:
      break;
  }
};

const cacheProducts = async (products) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(["products"], "readwrite");
    const store = transaction.objectStore("products");
    products.forEach((product) => store.put(product));
    transaction.oncomplete = () => {
      self.postMessage({ action: "productsCached" });
    };
  } catch (error) {
    console.error("Error caching products:", error);
  }
};

const getCachedProducts = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction(["products"], "readonly");
    const store = transaction.objectStore("products");
    const request = store.getAll();

    request.onsuccess = () => {
      const products = request.result;
      self.postMessage({ action: "retrievedProducts", data: products });
    };
  } catch (error) {
    console.error("Error retrieving cached products:", error);
  }
};

const updateCart = async (cart) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(["cart"], "readwrite");
    const store = transaction.objectStore("cart");
    cart.forEach((item) => store.put(item));
    transaction.oncomplete = () => {
      self.postMessage({ action: "cartUpdated" });
    };
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

const getCart = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction(["cart"], "readonly");
    const store = transaction.objectStore("cart");
    const request = store.getAll();

    request.onsuccess = () => {
      const cart = request.result;
      self.postMessage({ action: "retrievedCart", data: cart });
    };
  } catch (error) {
    console.error("Error retrieving cached cart:", error);
  }
};
