import { readFile, writeFile } from "fs/promises";
import { Producto, Cliente } from "./tipos";

const ARCHIVO_PRODUCTOS = "./data/productos.json";
const ARCHIVO_CLIENTES = "./data/clientes.json";


export async function leerProductos(): Promise<Producto[]> {
  try {
    const contenido = await readFile(ARCHIVO_PRODUCTOS, "utf-8");

    if (contenido.trim() === "") {
      return [];
    }

    return JSON.parse(contenido);
  } catch (error: any) {
  
    if (error.code === "ENOENT") {
      console.log("El archivo de productos no existe todavía, se creará al guardar.");
      return [];
    }

    if (error instanceof SyntaxError) {
      console.log("Error: el archivo de productos tiene un JSON inválido o corrupto.");
      return [];
    }

    console.log("Error al leer productos:", error.message);
    return [];
  }
}

function validarProducto(producto: Producto): boolean {
  if (!producto.id || producto.id.trim() === "") {
    console.log("Error de validación: el producto necesita un id.");
    return false;
  }
  if (!producto.nombre || producto.nombre.trim() === "") {
    console.log("Error de validación: el producto necesita un nombre.");
    return false;
  }
  if (typeof producto.precio !== "number" || producto.precio <= 0) {
    console.log("Error de validación: el precio debe ser un número mayor a 0.");
    return false;
  }
  if (typeof producto.stock !== "number" || producto.stock < 0) {
    console.log("Error de validación: el stock no puede ser negativo.");
    return false;
  }
  if (!producto.categoria || producto.categoria.trim() === "") {
    console.log("Error de validación: el producto necesita una categoria.");
    return false;
  }
  return true;
}

export async function guardarProducto(producto: Producto): Promise<boolean> {
  if (!validarProducto(producto)) {
    return false;
  }

  try {
    const productos = await leerProductos();

  
    const index = productos.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      productos[index] = producto; 
    } else {
      productos.push(producto); 
    }

    await writeFile(ARCHIVO_PRODUCTOS, JSON.stringify(productos, null, 2), "utf-8");
    console.log(`Producto ${producto.id} guardado correctamente.`);
    return true;
  } catch (error: any) {
    console.log("Error al guardar el producto:", error.message);
    return false;
  }
}

export async function leerClientes(): Promise<Cliente[]> {
  try {
    const contenido = await readFile(ARCHIVO_CLIENTES, "utf-8");

    if (contenido.trim() === "") {
      return [];
    }

    return JSON.parse(contenido);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.log("El archivo de clientes no existe todavía, se creará al guardar.");
      return [];
    }

    if (error instanceof SyntaxError) {
      console.log("Error: el archivo de clientes tiene un JSON inválido o corrupto.");
      return [];
    }

    console.log("Error al leer clientes:", error.message);
    return [];
  }
}

function validarCliente(cliente: Cliente): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!cliente.id || cliente.id.trim() === "") {
    console.log("Error de validación: el cliente necesita un id.");
    return false;
  }
  if (!cliente.nombre || cliente.nombre.trim() === "") {
    console.log("Error de validación: el cliente necesita un nombre.");
    return false;
  }
  if (!cliente.email || !regexEmail.test(cliente.email)) {
    console.log("Error de validación: el email no es válido.");
    return false;
  }
  return true;
}

export async function guardarCliente(cliente: Cliente): Promise<boolean> {
  if (!validarCliente(cliente)) {
    return false;
  }

  try {
    const clientes = await leerClientes();

    const index = clientes.findIndex((c) => c.id === cliente.id);

    if (index !== -1) {
      clientes[index] = cliente;
    } else {
      clientes.push(cliente);
    }

    await writeFile(ARCHIVO_CLIENTES, JSON.stringify(clientes, null, 2), "utf-8");
    console.log(`Cliente ${cliente.id} guardado correctamente.`);
    return true;
  } catch (error: any) {
    console.log("Error al guardar el cliente:", error.message);
    return false;
  }
}
