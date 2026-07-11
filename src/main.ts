import {
  guardarProducto,
  leerProductos,
  guardarCliente,
  leerClientes,
} from "./persistencia";

async function main() {
  console.log("===== PRUEBA 1: Guardar un producto válido =====");
  await guardarProducto({
    id: "P001",
    nombre: "Mouse inalámbrico",
    precio: 25.5,
    stock: 10,
    categoria: "Periféricos",
  });

  console.log("\n===== PRUEBA 2: Leer los productos guardados =====");
  const productos = await leerProductos();
  console.log(productos);

  console.log("\n===== PRUEBA 3: Guardar un producto inválido (sin nombre y precio negativo) =====");
  await guardarProducto({
    id: "P002",
    nombre: "",
    precio: -10,
    stock: 5,
    categoria: "Accesorios",
  });

  console.log("\n===== PRUEBA 4: Guardar un cliente válido =====");
  await guardarCliente({
    id: "C001",
    nombre: "Cristian Pérez",
    email: "cristian@example.com",
    telefono: "5555-1234",
  });

  console.log("\n===== PRUEBA 5: Leer los clientes guardados =====");
  const clientes = await leerClientes();
  console.log(clientes);

  console.log("\n===== PRUEBA 6: Guardar un cliente con email inválido =====");
  await guardarCliente({
    id: "C002",
    nombre: "Ana López",
    email: "correo-invalido",
  });

  console.log("\nTodas las pruebas terminaron.");
}

main();
