# API Specification

## Overview
The backend exposes RESTful HTTP endpoints and WebSocket streams built with FastAPI.

## Endpoints Summary

### 1. Health Check
- `GET /api/v1/health`
  - **Description**: Returns application health, model load status, and database connectivity.

### 2. Audio Processing
- `POST /api/v1/audio/transcribe`
  - **Description**: Upload audio blob chunk for real-time transcription via Whisper.
- `WS /api/v1/audio/stream`
  - **Description**: WebSocket stream for bidirectional real-time audio chunk processing.

### 3. Co-Pilot Orchestration
- `POST /api/v1/copilot/process-turn`
  - **Description**: Accepts current transcript turn and returns multi-agent analysis (Intent, Emotion, RAG, Next-Best Action, Compliance).

### 4. CRM & Dispositions
- `GET /api/v1/crm/leads/{lead_id}`
  - **Description**: Retrieve customer lead information and loan history.
- `POST /api/v1/crm/leads/{lead_id}/summary`
  - **Description**: Auto-generate post-call CRM summary and update lead disposition.

### 5. Analytics & Quality Evaluation
- `GET /api/v1/analytics/evaluations/{call_id}`
  - **Description**: Fetch Self Evaluation scorecard and compliance audit log for a call session.
