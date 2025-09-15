# Medical Supply
Inventory Management System for Medical Supplies.
This system is designed to help healthcare facilities manage their medical supply inventory efficiently. It provides features such as:

- **Item Management:** Add, edit, and remove medical supplies from inventory.
- **Inventory Actions:** Track stock levels, restock products, and manage suppliers.
- **Statistics:** Visualize usage statistics for each product over time.
- **Multilingual Support:** Switch between English and Swedish for all UI elements.
- **Lightweight Database:** Uses H2 database for simplicity and quick setup.
- **User-Friendly Interface:** Modern React frontend with intuitive design.

This project is structured as a **monorepo**, containing both backend and frontend in a single repository.

---


## Backend
**Technology Stack:**
- **Framework:** Spring Boot
- **Java Version (JDK):** 24.0.2
- **Spring Boot Version:** 3.5.5
- **apache-maven:** 3.9.11

**Features:**
- REST API for managing articles, suppliers, and orders
- Lightweight H2 database with web console
- CRUD operations for inventory management
- Statistics endpoints for usage tracking
- OpenAPI definition available at http://localhost:8080/swagger-ui.html

**Database Details:**
- **Type:** H2 (lightweight, file-based)
- **Access URL:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
- **JDBC URL:** `jdbc:h2:file:./data/testdb`
- **Username:** `sa`
- **Password:** *(empty)*

**Running the Backend:**
```bash
# Head to backend directory
cd backend

# Load Maven dependencies
mvn clean install

# Run the backend using the mvn wrapper
.\mvnw spring-boot:run
```


## Frontend
**Technology Stack**

- **Framework:** React with TypeScript  
- **Build Tool:** Vite  
- **React Version:** 19.1.1
- **Node Version:** 22.19.0

---

**Features**

- Interactive user interface for managing medical supplies
- Forms to add/edit articles with validation
- Charts and statistics for product usage
- Multilingual support with language switcher (EN/SV)
- Responsive design for both desktop and mobile devices

---

**Running the Frontend**
```bash
# Head to frontend directory
cd frontend

# intall dependencies
npm install

# run the frontend
npm run dev
```

## General notes
- No **.env** file is required for simplicity.
- Both frontend and backend can be run independently.
- Ensure the following are installed on your system:
    - Java and Maven (for backend)
    - Node.js and npm (for frontend)
- Frontend is configured to communicate with the backend on http://localhost:8080


