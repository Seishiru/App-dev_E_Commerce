# Shopease E-Commerce Web App  

Shopease is a web application for e-commerce, primarily focused on selling electronic devices and tech-related products.  

## Getting Started  

Follow these steps to set up and run the project on your local machine.  

### Prerequisites  

- **Node.js**: Ensure you have Node.js installed for running the frontend and backend.  
- **XAMPP**: Required for setting up the MySQL database.  

### Installation and Setup  

1. **Clone the Repository**  
   ```bash  
   git clone <repository_url>  
   cd shopease  
   ```  

2. **Frontend**  
   - Open a terminal.  
   - Navigate to the frontend directory:  
     ```bash  
     cd frontend  
     ```  
   - Install dependencies (if not already installed):  
     ```bash  
     npm install  
     ```  
   - Start the development server:  
     ```bash  
     npm start  
     ```  

3. **Backend**  
   - Open a second terminal.  
   - Navigate to the backend directory:  
     ```bash  
     cd backend  
     ```  
   - Install dependencies (if not already installed):  
     ```bash  
     npm install  
     ```  
   - Start the backend server:  
     ```bash  
     node server.js  
     ```  

4. **Database Setup**  
   - Open **XAMPP** and start the MySQL module.  
   - Navigate to `root/resources` in the repository.  
   - Create a database named `app_e_commerce_db`.  
   - Import the SQL file:  
     - Go to **phpMyAdmin**.  
     - Select the `app_e_commerce_db` database.  
     - Click **Import** and upload `app_e_commerce_db.sql`.  

### Features  

- User-friendly interface for browsing and purchasing tech products.  
- Seamless backend integration for managing orders and inventory.  
- SQL-based database for reliable data storage.  

### Authors  

- Cecil Quibranza
- Roxanne Lopez
- Ernie Manatad
