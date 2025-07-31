#!/bin/bash
set -e

# Load environment variables
source .env.local

SA_NAME="github-deploy"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
KEY_FILE="sa-key-${SA_NAME}.json"

echo "🔧 Enabling required APIs..."
gcloud services enable   cloudfunctions.googleapis.com   iam.googleapis.com   firebase.googleapis.com

echo "👤 Creating service account..."
gcloud iam service-accounts create "$SA_NAME"   --project="$PROJECT_ID"   --display-name="GitHub Deployment Service Account" || true

echo "🔐 Assigning roles..."
for role in cloudfunctions.developer firebase.admin iam.serviceAccountTokenCreator; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID"     --member="serviceAccount:$SA_EMAIL"     --role="roles/$role"
done

echo "📄 Creating key..."
gcloud iam service-accounts keys create "$KEY_FILE"   --iam-account="$SA_EMAIL"   --project="$PROJECT_ID"

echo "🔐 Encoding key for GitHub..."
echo "Copy this into your GitHub Actions secret named GCP_SA_KEY_JSON:"
base64 -w 0 "$KEY_FILE"
