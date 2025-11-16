**Aplicación Frontend con React, CSS, JavaScript y JSON Server
Asignatura: Desarrollo Fullstack 2
Sección: 003V
Profesora: Viviana Poblete López
Integrantes: Paula Rojas Oyarzun – Vicente Quiroz Gómez**


# 🍬 Locuras Dulces

**Locuras Dulces** es una tienda virtual dedicada a la venta de productos de confitería, chocolates y snacks.  
El sistema permite a los usuarios registrarse, iniciar sesión, navegar por el catálogo, enviar mensajes de contacto y al administrador gestionar productos, usuarios y mensajes a través de un panel administrativo.

---

## 🧩 Descripción del Proyecto

El objetivo del proyecto es desarrollar una **aplicación web full stack** que conecte un **backend en Spring Boot** con un **frontend en React (Vite)**, integrando una base de datos MySQL.  
El sistema cuenta con un **perfil de cliente** (compra y contacto) y un **perfil de administrador** (gestión interna del negocio).  
El desarrollo sigue buenas prácticas de arquitectura, seguridad y validaciones tanto del lado cliente como servidor.

---

## 🛠️ Tecnologías Utilizadas

### 🔹 Backend
- **Java 17**
- **Spring Boot 3**
- **Maven**
- **Spring Data JPA**
- **MySQL**
- **Swagger UI** (documentación de API)
- **Lombok**

### 🔹 Frontend
- **React + Vite**
- **JavaScript (ES6+)**
- **Bootstrap 5 / CSS3**
- **React Router DOM**
- **Fetch / Axios**
- **SweetAlert2** (alertas visuales)

---

## ⚙️ Instrucciones de Instalación

### 📂 Clonar el proyecto (dos ramas separadas)

Ejecuta estos comandos en la terminal para descargar ambas partes del proyecto:

# Clonar rama Backend
git clone -b Backend https://github.com/Paula-roja/Locuras_Dulces.git Locuras_Backend

# Clonar rama Frontend
git clone -b Frontend_Locuras_Dulces https://github.com/Paula-roja/Locuras_Dulces.git Locuras_Frontend


## 🧱 Configuración de Base de Datos MySQL
Para que el backend funcione correctamente, primero debes crear la base de datos en **MySQL Workbench** llamada bd_locurasdulces o desde consola con el siguiente comando:

CREATE DATABASE bd_locurasdulces;

## 🧱 Base de Datos MySQL, luego poblar las tablas con los siguientes scripts

🔹 Para la tabla Categoria Insertar:

INSERT INTO categoria (nombre) VALUES
('Snacks y Sufles'),
('Chocolates y Alfajores'),
('Dulces y Caramelos Tradicionales'),
('Chicles y Gomitas');

🔹 Para ingresar el usuario administrador a la base de datos, debes ejecutar este INSERT para poder acceder por login 
con las credenciales: admin@locurasdulces.cl / admin123 

INSERT INTO usuario (nombre, correo, contrasena, rol, activo, fecha_registro)
VALUES (
    'Admin',
    'admin@locurasdulces.cl',
    '$2a$10$0/B8Bea2im8iYnCEkibaHuroPoxdNf9ZOLX7GP9yEnusoojm6qiQm',
    'SUPER-ADMIN',
    1,
    NOW()
);


###🔹 Comandos para la ejecución del backend 
cd Locuras_Backend
./mvnw spring-boot:run

###🔹 Comandos para la ejecucción del frontend
cd Locuras_Frontend
npm install
npm run dev

###🔹 Comandos para la ejecucción de las estadisticas
npm install chart.js react-chartjs-2



