# ProjectHub 🏗️
Fullstack-project med React och ASP.NET Core Web API

📌 Introduktion
ProjectHub är en applikation för att hantera och organisera projekt. Applikationen tillåter användare att:

📌 Skapa, uppdatera och ta bort projekt
📌 Knyta projekt till en kund
📌 Hantera projektstatus (Ej påbörjad, Pågående, Avslutad)
📌 Visa en lista över alla befintliga projekt
Projektet är utvecklat med React (Vite) för frontend och ASP.NET Core Web API för backend.
Databasen hanteras via Entity Framework Core (EF Core) och SQLite.

📂 Teknologier
Projektet använder följande teknologier och ramverk:

Frontend (React)
⚡ React (med Vite)
🎨 Tailwind CSS
🔗 React Router
⚡ Fetch API för att kommunicera med backend

Backend (ASP.NET Core Web API)
🏗️ ASP.NET Core
🔄 Entity Framework Core
🗄️ SQLite
🔐 Dependency Injection (DI)


🚀 Installation och körning

1️⃣ Klona projektet
git clone https://github.com/ShahadAlkazzaz/ProjectHub.git
cd ProjectHub
2️⃣ Starta Backend (ASP.NET Core Web API)
Gå till backend-mappen:
cd backend/ProjectHubSolution/ProjectHubAPI
Kör backend:
dotnet run
API:et körs nu på http://localhost:5016

3️⃣ Starta Frontend (React)
Gå till frontend-mappen:
cd frontend
Installera beroenden:
npm install
Kör frontend:
npm run dev
Frontend körs nu på http://localhost:5173

🛠️ Funktionalitet
📝 CRUD-operationer på projekt
🔄 Relation mellan projekt och kunder
📊 Projektstatus-hantering
🎨 Responsiv design


