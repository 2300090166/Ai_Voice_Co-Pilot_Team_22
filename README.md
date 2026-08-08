# AI Voice Co-Pilot for Inside Sales
### Enterprise Multi-Agent Sales Copilot for Fintech Zero-Cost EMI Products

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4.svg?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![LangChain](https://img.shields.io/badge/LangChain-Enabled-1C3C3C.svg?logo=langchain&logoColor=white)](https://www.langchain.com/)
[![FAISS](https://img.shields.io/badge/FAISS-Vector_Store-00599C.svg?logo=meta&logoColor=white)](https://github.com/facebookresearch/faiss)
[![OpenAI Whisper](https://img.shields.io/badge/Whisper-Speech_To_Text-412991.svg?logo=openai&logoColor=white)](https://openai.com/research/whisper)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Executive Summary

**AI Voice Co-Pilot** is an enterprise-grade AI solution built for **AI Build Hackathon 2026**. Designed specifically for fintech inside sales teams promoting **Pay-in-3 zero-cost EMI products**, the platform listens to customer phone conversations in real time, executes multi-agent retrieval over FAISS knowledge bases, generates zero-hallucination responses via **Google Gemini 2.5 Flash**, surfaces real-time **Next-Best Action (NBA)** recommendation cards, automates CRM summaries, and provides post-call AI performance coaching for sales managers.

---

## 📐 Enterprise Multi-Agent Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │             CUSTOMER VOICE / TEXT            │
                               └──────────────────────┬───────────────────────┘
                                                      │
                                                      ▼
                               ┌──────────────────────────────────────────────┐
                               │           OpenAI Whisper STT Engine          │
                               └──────────────────────┬───────────────────────┘
                                                      │
                                                      ▼
                               ┌──────────────────────────────────────────────┐
                               │         Antigravity AI Orchestrator          │
                               └──────────────────────┬───────────────────────┘
                                                      │
       ┌───────────────────────┬──────────────────────┼───────────────────────┬──────────────────────┐
       │                       │                      │                       │                      │
       ▼                       ▼                      ▼                       ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ Intent Agent │       │ Emotion Agent│       │Knowledge Agent       │ Recommendation       │Compliance    │
│ (EMI/KYC)    │       │ (Sentiment)  │       │(FAISS + Gemini)      │ Agent (NBAs) │       │ Agent        │
└──────────────┘       └──────────────┘       └──────┬───────┘       └──────────────┘       └──────────────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │  CRM Agent   │
                                              │(Auto-Summary)│
                                              └──────┬───────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │ Performance  │
                                              │Insights Agent│
                                              └──────┬───────┘
                                                     │
                                                     ▼
                               ┌──────────────────────────────────────────────┐
                               │      React Enterprise SaaS Dashboard UI      │
                               └──────────────────────────────────────────────┘
```

---

## ⚡ Core Feature Matrix

| Feature Module | Technology Stack | Enterprise Capability |
| :--- | :--- | :--- |
| **Real-Time Voice AI** | OpenAI Whisper STT + gTTS | Speech recognition & natural voice audio synthesis |
| **FAISS Vector RAG** | Sentence Transformers (`all-MiniLM-L6-v2`) | Document chunking and similarity search over product docs |
| **Zero-Hallucination AI** | Google Gemini 2.5 Flash | Grounded synthesis returning `"I couldn't find this info..."` if missing |
| **Next-Best Action Engine** | Recommendation Agent | Surfacing prioritized action cards with execution buttons |
| **Automated CRM Records** | CRM Agent | Calculating interest score (0-100) and follow-up timeline |
| **AI Sales Coach** | Performance Insights Agent | Post-call sales score, strengths, improvements & suggestions |
| **Executive Analytics** | FastAPI Analytics REST Service | Call quality distribution, intent metrics & AI inference cost ($0.0003/req) |
| **Demo Mode Toggle** | React Context (`DemoContext.jsx`) | Instant sample data population for seamless hackathon presentations |

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.11+
- Node.js 18+ & npm

### 1. Clone & Setup Backend
```bash
git clone https://github.com/2300090166/Ai_Voice_Co-Pilot_Team_22.git
cd Ai_Voice_Co-Pilot_Team_22/backend

# Create virtual environment & install dependencies
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Start FastAPI Server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 2. Setup & Run Frontend
```bash
cd ../frontend

# Install dependencies
npm install

# Start Vite Development Server
npm run dev
```

Visit the application at `http://localhost:3001` (or `http://localhost:3000`).

---

## 👥 Team 22 Credentials

Built with ❤️ for **AI Build Hackathon 2026**.
Repository: [https://github.com/2300090166/Ai_Voice_Co-Pilot_Team_22](https://github.com/2300090166/Ai_Voice_Co-Pilot_Team_22)
