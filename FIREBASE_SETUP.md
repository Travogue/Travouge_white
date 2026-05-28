# Firebase Setup Guide for Travouge

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: `travouge` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click **"Create project"** and wait for setup to complete

## Step 2: Set Up Firestore Database

1. In Firebase Console, click on **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select region closest to you (e.g., `us-central1`)
5. Click **"Create"** and wait for initialization

## Step 3: Set Up Cloud Storage

1. In Firebase Console, click on **"Storage"** (left sidebar)
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Select the same region as your Firestore database
5. Click **"Done"**

## Step 4: Get Service Account Credentials

1. Go to **Project Settings** (gear icon, top-left)
2. Select the **"Service Accounts"** tab
3. Click **"Generate New Private Key"**
4. A JSON file will download automatically

## Step 5: Extract Credentials from JSON File

Open the downloaded JSON file and find these values:

```json
{
  "type": "service_account",
  "project_id": "YOUR_PROJECT_ID",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "YOUR_CLIENT_EMAIL...",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```

## Step 6: Get Storage Bucket Name

1. Go to **Storage** in Firebase Console
2. Look for your bucket name (format: `your-project-id.appspot.com`)

## Step 7: Update Backend .env File

Open `backend/.env` and replace placeholders:

```env
PORT=4000
API_BASE_PATH=/api
ADMIN_EMAIL=admin@travouge.com
ADMIN_PASSWORD=strongpassword123
JWT_SECRET=travouge-jwt-secret-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nPASTE_ENTIRE_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

**Important:** When copying the `private_key`, it's a multi-line string. Include the entire key with `\n` for newlines.

## Step 8: Restart Backend Server

1. Stop the running backend server (Ctrl+C in terminal)
2. Restart: `npm run dev`

## Step 9: Test the App

1. Visit http://localhost:5173
2. Click on "Admin" to go to the dashboard
3. Login with credentials from `.env`:
   - Email: `admin@travouge.com`
   - Password: `strongpassword123`
4. Try adding a travel package

## Firestore Database Structure

After your first POST request to `/api/packages`, Firestore will auto-create this structure:

```
packages/
  ├── doc1 (auto-generated ID)
  │   ├── title: "Paris City Tour"
  │   ├── location: "Paris, France"
  │   ├── price: 2499
  │   ├── description: "..."
  │   ├── imageUrl: "https://storage.googleapis.com/..."
  │   ├── createdAt: timestamp
  │   └── updatedAt: timestamp
  └── doc2
      └── ...
```

## Troubleshooting

**"Failed to parse private key"**
- Ensure the entire private key is copied (including `-----BEGIN` and `-----END`)
- Check for proper line breaks (`\n`)

**"Permission denied" errors**
- Ensure Firestore is in **test mode** (for development)
- Go to Firestore > Rules and verify test rules are active

**Images not uploading**
- Confirm Cloud Storage is set to **test mode**

**Still have issues?**
Check backend logs in terminal for error messages.
