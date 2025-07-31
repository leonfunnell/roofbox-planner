# 🚗 Roofbox Planner (GCP + AppSheet + Google OAuth)

A deployable planner app powered by Google Cloud, Firebase Hosting, AppSheet API, and Google OAuth2 login.

## ✅ Features

- 📅 Displays bookings from AppSheet
- 🔐 Google OAuth for secure frontend login
- ☁️ Cloud Function backend (verifies login + calls AppSheet)
- 🚀 CI/CD with GitHub Actions

## 🚧 Prerequisites

- GCP project with billing enabled
- Firebase enabled in project
- `gcloud` CLI installed and authenticated
- `gh` GitHub CLI installed and authenticated

## 🛠️ Setup Instructions

### 1. Clone this Repo

```bash
git clone https://github.com/your-username/roofbox-planner.git
cd roofbox-planner
```

### 2. Set Local Environment Variables (✋ Not committed!)

Create a `.env.local` file:

```env
PROJECT_ID="your-gcp-project-id"
OAUTH_CLIENT_ID="your-google-oauth-client-id"
ALLOWED_USERS="you@example.com"
APPSHEET_APP_ID="your-app-id"
APPSHEET_API_KEY="your-api-key"
```

### 3. Create GCP Service Account + GitHub Secret

```bash
chmod +x ./scripts/create-service-account.sh
source .env.local
./scripts/create-service-account.sh
```

Copy the base64 output and add it to GitHub → Settings → Secrets:

- `GCP_SA_KEY_JSON`
- Also add:
  - `GCP_PROJECT_ID`
  - `GOOGLE_OAUTH_CLIENT_ID`
  - `APPSHEET_API_KEY`
  - `APPSHEET_APP_ID`
  - `ALLOWED_USERS`

### 4. Push to GitHub

```bash
git init
gh repo create roofbox-planner --public --source=. --remote=origin
git add .
git commit -m "Initial commit"
git push -u origin main
```

✅ GitHub Actions will deploy to Firebase + Cloud Functions!

