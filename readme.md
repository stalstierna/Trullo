# Trullo Backend

Trullo är en Trello-liknande backend-applikation byggd med **Node.js, Express, MongoDB och TypeScript** för hantering av användare och tasks.

## Motivering av databasval

Jag valde **MongoDB** eftersom:

- Det är en dokumentbaserad **NoSQL-databas** som lagrar data i JSON-liknande dokument.
- Det passar bra för flexibla applikationer som Trullo där data (tasks, users, relationer) kan förändras ofta.
- Tillsammans med **Mongoose** blir det enkelt att definiera **scheman, relationer och valideringar**.
- Jag hade även jobbat mycket mer med **SQL-databaser** tidigare så detta blev ett bra tillfälle att öva mer på **NoSQL**

## Tekniker och paket

I applikationen används följande tekniker och npm-paket:

- **Node.js** → Körmiljö för JavaScript/TypeScript på serversidan.
- **Express** → Webbramverk för att skapa REST API och hantera routing/middleware.
- **Mongoose** → ODM (Object Data Modeling) för MongoDB, definierar scheman och modeller.
- **bcrypt** → För att **hasha lösenord** vid registrering och jämföra vid inloggning.
- **jsonwebtoken (JWT)** → Skapar och verifierar **tokens** för autentisering och auktorisering.
- **dotenv** → Hanterar miljövariabler via `.env`-fil.
- **TypeScript** → Starkt typat språk som körs ovanpå JavaScript, ger bättre utvecklarupplevelse och färre buggar.
- **nodemon** → Utvecklingsverktyg som automatiskt startar om servern vid filändringar.

## Översiktlig funktionsbeskrivning

Applikationen är ett **REST API** med följande huvudfunktioner:

- 👤 **Användare**

  - Registrera konto (`users/auth/register`)
  - Registrera admin-konto (`users/auth/register-admin`)
  - Logga in och få **JWT-token** (`users/auth/login`)
  - Hämta sina egna uppgifter (`/users/me`)
  - Uppdatera konto eller ta bort sitt eget konto (`users/me`)
  - Egen route för att uppdatera lösenord (`users/me/password`)
  - Endast **admin** kan hantera alla användare

- ✅ **Tasks**
  - Skapa, läsa, uppdatera och ta bort tasks
  - Tilldela en användare till en task
  - Uppdatera status på en task
    - När en task sätts till **done** sparas:
      - `finishedAt` → datum då den avslutades
      - `finishedBy` → användaren som avslutade uppgiften

## Vidareutveckling

- 🏷️ Tags på tasks
- 📂 Projects där flera tasks kan höra ihop
- 🌱 Seed-script för att fylla databasen med testdata
- 🎨 Frontend som kopplas mot backend

## Körguide

### Installation

```bash
git clone <repo-url>
cd trullo
npm install
```

### Miljövariabler

Skapa en `.env`-fil i projektets rot med följande innehåll (se även `env_example`):

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.htjfnnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=dinhemliganyckel
PORT=3000
```

### Utvecklingsläge

Kör applikationen i utvecklingsläge med nodemon och TypeScript-kompilatorn:

```bash
npm run dev
```

### Produktion

Bygg projektet till JavaScript och starta applikationen:

```bash
npm run build
npm start
```
