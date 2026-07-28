# AgriSense AI 🌾

AgriSense AI is an AI-powered agricultural assistant platform designed specifically for Nigerian farmers. It aims to empower local communities with actionable insights, disease diagnostics, weather data, and market accessibility, helping to optimize crop yields and farming efficiency.

---

## 🚀 Key Features

*   **Crop Disease Detection**: Upload or capture photos of crops to detect and identify potential diseases.
*   **Multilingual AI Chat Assistant**: Interactive AI companion powered by **Groq (LLaMA-3.1)** supporting multiple languages:
    *   English
    *   Hausa (Kasar Hausa)
    *   Fulfulde (Fulani)
    *   Yoruba (Èdè Yorùbá)
    *   Igbo (Asụsụ Igbo)
    *   Kanuri
*   **Marketplace**: Buy and sell agricultural products, seeds, fertilizers, and equipment.
*   **Real-time Market Prices**: Track local crop and produce pricing across Nigerian regions.
*   **Weather Forecasting**: Localized weather alerts to guide planting, harvesting, and pest control schedules.
*   **Community Forum**: A hub for farmers to share knowledge, discuss issues, and connect.
*   **Farmer Dashboard**: Track farm activities, weather alerts, and marketplace listings in a unified space.

---

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), React Router (v6), and Tailwind/Vanilla CSS (with light/dark mode support).
*   **Backend**: FastAPI (Python), Uvicorn server, and integration with the Groq API.

---

## ⚙️ Project Structure

```text
agri-sense-ai/
├── backend/            # FastAPI Python backend
│   ├── .venv/          # Python virtual environment
│   ├── main.py         # Entry point for FastAPI
│   ├── requirements.txt# Backend python dependencies
│   └── .env            # Backend API keys (Groq)
├── src/                # React components & page assets
│   ├── pages/          # Individual screen pages
│   ├── components/     # Shared UI components
│   ├── context/        # React global state (AppContext)
│   └── main.jsx        # Frontend entry point
├── package.json        # Frontend configuration and shared npm scripts
└── vite.config.js      # Vite build configuration
```

---

## 🛠️ Getting Started

Follow these instructions to set up the development environment on your local machine.

### 📋 Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [Python](https://www.python.org/) (v3.10 or higher recommended)

---

### 1. Backend Setup (FastAPI)

1.  Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```

2.  Ensure you have a `.env` file configured in `backend/.env` with your Groq API key:
    ```ini
    GROQ_API_KEY=your_groq_api_key_here
    GROQ_MODEL=llama-3.1-8b-instant
    ```

3.  Activate the Python virtual environment and run the backend:
    *   **On macOS/Linux:**
        ```bash
        source .venv/bin/activate
        python main.py
        ```
    *   **On Windows:**
        ```bash
        .venv\Scripts\activate
        python main.py
        ```

    *Alternatively, you can start the backend directly from the root of the project using the helper script in `package.json`:*
    ```bash
    npm run backend
    ```

The FastAPI backend will start running on **`http://localhost:8000`** with hot-reloading active.

---

### 2. Frontend Setup (React & Vite)

1.  Ensure you are at the project root directory:
    ```bash
    cd ..
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

The frontend will start running on **`http://localhost:5173`** (or another available port as shown in the console).

---

## 📚 API Endpoints

The backend exposes the following key endpoints:
*   `POST /api/chat`: Chat assistant route. Expects a JSON body containing:
    ```json
    {
      "message": "Farming question...",
      "language": "en"
    }
    ```
    Returns:
    ```json
    {
      "reply": "Concise localized advice..."
    }
    ```
*   `GET /`: Serves the static index in production mode.
