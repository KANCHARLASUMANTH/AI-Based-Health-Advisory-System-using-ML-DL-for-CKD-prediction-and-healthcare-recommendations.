# API Specification - CKD Dialysis Prediction System

## Authentication
- POST `/auth/register` - Doctor registration (Email, Password, Name)
- POST `/auth/login` - Doctor login
- GET `/auth/me` - Get current doctor profile (Auth required)

## Patients
- GET `/patients` - List all patients (Auth required)
- POST `/patients` - Add a new patient (Auth required)
- GET `/patients/:id` - Get patient details (Auth required)

## Predictions
- POST `/predictions` - Create a new risk prediction (Auth required)
  - Body: Patient clinical data (Age, BP, Creatinine, etc.)
- GET `/predictions/patient/:id` - Get predictions for a specific patient (Auth required)
- GET `/predictions/:id` - Get prediction details (Auth required)
