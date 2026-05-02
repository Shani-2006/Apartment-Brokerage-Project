🏠 Apartment Brokerage System
A professional fullstack system for managing and showcasing real estate properties.
The application enables property browsing, advanced search, and structured data management via an API and a relational database.

Built using a modern architecture that combines Angular (Frontend), .NET Web API (Backend), and SQL Server (Database).

✨ Features
🏢 Apartment Gallery
A clean and modern card-based UI that presents property details in a clear and user-friendly way.

🔎 Smart Search
Real-time search functionality based on:

City
Address
Property description
👨‍💼 Agent Management
Each property is assigned to a responsible real estate agent, ensuring organized handling and ownership.

📊 Apartment Status Tracking
Properties are managed using predefined statuses:

Available
In Negotiation
Occupied
🗄 Reliable Data Infrastructure
The system uses Stored Procedures to ensure efficient, consistent, and secure data operations.

🛠 Tech Stack
Frontend
Angular 17+
TypeScript
SCSS
Flexbox & Grid
Google Fonts (Assistant)
Backend
.NET Web API
C#
Database
SQL Server
Stored Procedures
🗄 Database Structure
The system is built on a relational database consisting of three main tables:

Agents
Stores real estate agent details.

ApartmentStatuses
Defines the available property statuses.

Apartments
Contains full property data, including:

Property details
Reference to agent (AgentId)
Reference to status (StatusId)
Relationships are enforced using Foreign Keys, ensuring data integrity.

⚠️ Technical Issue Resolved
During development, the following SQL error occurred:

Msg 515 – Cannot insert the value NULL into column 'AgentId'

Cause
An attempt was made to insert a property without assigning an existing agent.

Solution
A structured workflow was implemented:

Insert agents into the Agents table
Use a valid AgentId when creating a property
This ensures database integrity and prevents insertion errors.

🚀 Running the Project
1️⃣ Backend
Run the API from the server directory:

cd api/ApartmentBrokerage.Api
dotnet run
The server will typically be available at:

http://localhost:5001
2️⃣ Frontend
Open another terminal and run:

cd client/Apartment-app
npm install
ng serve
The application will be available at:

http://localhost:4200
📌 Project Architecture
project-root
│
├── api
│   └── ApartmentBrokerage.Api
│
├── client
│   └── Apartment-app
│
└── database
    └── SQL scripts
📷 UI Concept
The interface presents properties using modern responsive cards, displaying key information such as:

Address
City
Price
Status
Assigned agent
The layout is built using Grid and Flexbox.

📌 Future Improvements
Agent authentication system
Property image uploads
Advanced filtering options
Full property management system (CRUD)
Cloud deployment
👩‍💻 Author
Developed as a fullstack practice project
Angular • .NET • SQL Server
