import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "./productos.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };

  getProductById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("Producto no encontrado");
    } else {
      console.log(respuesta3.find((product) => product.id === id));
    }
  };

  deleteProduct = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);
    await fs.promises.writeFile(this.path, JSON.stringify(productFilter));
    console.log("Producto eliminado");
  };

  updateProduct = async ({ id, ...producto }) => {
    await this.deleteProduct(id);
    let productOld = await this.readProducts();
    let productsModif = [{ ...producto, id }, ...productOld];
    await fs.promises.writeFile(this.path, JSON.stringify(productsModif));
  };
}

const productManager = new ProductManager();

// productManager.addProduct(
//   "Producto 1",
//   "Descripción 1",
//   1000,
//   "imagen1.jpg",
//   "abc123",
//   10
// );

// productManager.addProduct(
//   "Producto 2",
//   "Descripción 2",
//   2000,
//   "imagen2.jpg",
//   "def456"
// );

// productManager.addProduct(
//   "Producto 3",
//   "Descripción 3",
//   3000,
//   "imagen3.jpg",
//   "ghi789",
//   5
// );

// productManager.getProducts();

// productManager.getProductById(1);
// productManager.getProductById(4);

productManager.deleteProduct(1);

productManager.updateProduct({
  title: "Producto 1",
  description: "Descripción 1",
  price: 1000,
  thumbnail: "imagen1.jpg",
  code: "abc123",
  stock: 10,
  id: 1,
});
