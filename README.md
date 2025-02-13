# AirQuality Data Ingestion and Search Backend

This project is a backend service built with **Node.js**, **Express**, and **Sequelize** to ingest air quality data from CSV files and provide search functionality through REST API endpoints.

## 🛠️ Features

- **CSV Data Ingestion**: Upload CSV files via `/ingestData` endpoint to populate the database.
- **Data Search API**: Query air quality data using `/searchData` with date range and quality type filters.

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** installed
- **Yarn** or **npm**
- A database ( PostgreSQL)

### 🛠️ Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```
2. **Set environment variables:**
   - Copy `.env.example` to `.env`.
   - Add database credentials and server port in the `.env` file.

### ▶️ Running the Project

#### Development Mode

```bash
yarn dev
```

#### Production Mode

```bash
yarn build
yarn start
```

---

## 📡 API Endpoints

### ➡️ **Ingest Data**

- **Endpoint:** `/ingestData`
- **Method:** POST
- **Description:** Upload CSV files with air quality data.

### 🔍 **Search Data**

- **Endpoint:** `/searchData`
- **Method:** GET
- **Parameters:**
  - `startDate` (required)
  - `endDate` (required)
  - `parameter` (optional)

---

## 🗂️ Project Structure

- `src/` - Application source code
- `utls/database/models/` - Sequelize models
- `.env.example` - Environment variable example
