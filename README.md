# PrepWise: AI-Powered Mock Interview Platform

PrepWise is a Next.js application designed to help users prepare for job interviews by providing AI-powered mock interview sessions and detailed feedback. It leverages Firebase for authentication and data storage, Google Gemini for generating interview questions and feedback, and Vapi for voice-based interview interactions.

## Table of Contents

1.  [Features](#features)
2.  [Tech Stack](#tech-stack)
3.  [Project Architecture](#project-architecture)
4.  [Directory Structure](#directory-structure)
5.  [Setup and Installation](#setup-and-installation)
    *   [Prerequisites](#prerequisites)
    *   [Firebase Setup](#firebase-setup)
    *   [Project Setup](#project-setup)
6.  [Running the Application](#running-the-application)
7.  [Environment Variables](#environment-variables)
8.  [Core Functionality & Components](#core-functionality--components)
9.  [API Routes (Route Handlers)](#api-routes-route-handlers)
10. [Styling & UI](#styling--ui)
11. [Key Libraries & Services](#key-libraries--services)
12. [Deployment Notes](#deployment-notes)
13. [Future Enhancements](#future-enhancements)

## 1. Features

*   **User Authentication:** Secure sign-up and sign-in using Firebase Authentication.
*   **AI Interview Generation:** Users can specify job role, experience level, tech stack, and interview type (technical, behavioral, mixed) to generate a set of relevant interview questions using Google Gemini.
*   **Voice-Based Mock Interviews:** Interactive interview sessions conducted by an AI agent (powered by Vapi and Google Gemini) that asks generated questions.
*   **Real-time Transcription:** (Implicitly handled by Vapi) User responses are transcribed.
*   **AI-Powered Feedback:** After an interview, Google Gemini analyzes the transcript to provide:
    *   Overall impression score.
    *   Breakdown of scores by categories (Communication, Technical Knowledge, Problem Solving, etc.).
    *   Identified strengths.
    *   Areas for improvement.
    *   Final assessment summary.
*   **Interview Dashboard:** Users can view their past interviews and feedback, and access new interview templates.
*   **Responsive Design:** UI adapts to different screen sizes.

## 2. Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Authentication:** Firebase Authentication
*   **Database:** Firebase Firestore
*   **AI for Text Generation (Questions & Feedback):** Google Gemini (via `@ai-sdk/google`)
*   **AI for Voice Interaction:** Vapi AI SDK (`@vapi-ai/web`)
*   **Styling:** Tailwind CSS, shadcn/ui components
*   **UI Components:** Radix UI (via shadcn/ui)
*   **Form Handling:** React Hook Form with Zod for validation
*   **Notifications:** Sonner (for toast notifications)
*   **Date/Time:** Day.js

## 3. Project Architecture

PrepWise is a full-stack Next.js application utilizing server components, client components, and Route Handlers for API functionalities.

1.  **Frontend (Client-Side):**
    *   Built with React and Next.js App Router (`app/` directory).
    *   Handles user interactions, displays interview content, and renders feedback.
    *   `AuthForm.tsx` manages sign-up/sign-in UI and Firebase client-side authentication.
    *   `Agent.tsx` integrates with the Vapi AI SDK for voice-based interview sessions.
    *   Various UI components from `components/ui/` (shadcn/ui) and custom components like `InterviewCard.tsx`.
2.  **Backend (Server-Side within Next.js):**
    *   **Route Handlers (`app/api/`):**
        *   `/api/vapi/generate`: Handles requests to generate interview questions using Google Gemini and stores the generated interview in Firebase Firestore.
    *   **Server Actions (`lib/actions/`):**
        *   `auth.action.ts`: Manages server-side authentication logic, session cookies, and user data interaction with Firebase Admin SDK.
        *   `general.action.ts`: Handles CRUD operations for interviews and feedback with Firestore, and integrates with Google Gemini for feedback generation.
3.  **Firebase (Backend Services):**
    *   **Authentication:** Manages user sign-up, sign-in, and sessions.
    *   **Firestore:** NoSQL database used to store user profiles, interview details (questions, roles, tech stack), and feedback.
4.  **External AI Services:**
    *   **Google Gemini:** Used via the AI SDK for generating interview questions and analyzing transcripts to produce structured feedback.
    *   **Vapi AI:** Provides the voice AI agent capabilities for conducting the interactive mock interview. The frontend client interacts with the Vapi SDK.

## 4. Directory Structure
├── app/  
│ ├── (auth)/ # Authentication routes (sign-in, sign-up)  
│ │ ├── sign-in/page.tsx  
│ │ ├── sign-up/page.tsx  
│ │ └── layout.tsx  
│ ├── (root)/ # Main authenticated application routes  
│ │ ├── interview/  
│ │ │ ├── [id]/ # Dynamic route for a specific interview  
│ │ │ │ ├── feedback/page.tsx # Feedback page for an interview  
│ │ │ │ └── page.tsx # Page to take/retake an interview  
│ │ │ └── page.tsx # Page to start/generate a new interview  
│ │ ├── layout.tsx  
│ │ └── page.tsx # Dashboard/Home page  
│ ├── api/  
│ │ └── vapi/generate/route.ts # API endpoint for generating interview questions  
│ ├── globals.css # Global styles (Tailwind base)  
│ └── layout.tsx # Root layout for the application  
├── components/  
│ ├── ui/ # shadcn/ui components (Button, Form, Input, etc.)  
│ ├── Agent.tsx # Handles Vapi AI voice agent interaction  
│ ├── AuthForm.tsx # UI and logic for sign-in/sign-up  
│ ├── DisplayTechIcons.tsx # Displays tech stack icons  
│ ├── FormField.tsx # Reusable form field component  
│ └── InterviewCard.tsx # Card to display interview summaries  
├── constants/  
│ └── index.ts # Application constants (tech mappings, Vapi config, schemas)  
├── firebase/  
│ ├── admin.ts # Firebase Admin SDK initialization (server-side)  
│ └── client.ts # Firebase Client SDK initialization (client-side)  
├── lib/  
│ ├── actions/ # Server Actions  
│ │ ├── auth.action.ts  
│ │ └── general.action.ts  
│ ├── utils.ts # Utility functions (cn, icon lookups, etc.)  
│ └── vapi.sdk.ts # Vapi SDK initialization  
├── public/ # Static assets (images, SVGs)  
├── types/ # TypeScript type definitions  
├── .gitignore  
├── components.json # shadcn/ui configuration  
├── eslint.config.mjs  
├── next.config.ts # Next.js configuration  
├── package.json  
├── postcss.config.mjs  
├── README.md # This file  
└── tsconfig.json


## 5. Setup and Installation

### Prerequisites
*   Node.js (v18 or later recommended) & npm/yarn/pnpm
*   Firebase Project:
    *   Enable Authentication (Email/Password)
    *   Set up Firestore database
*   Google Cloud Project with Gemini API enabled.
*   Vapi AI Account and API Key/Token.

### Firebase Setup
1.  Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2.  **Enable Authentication:** Go to Authentication -> Sign-in method -> Enable Email/Password.
3.  **Set up Firestore:** Go to Firestore Database -> Create database -> Start in production or test mode. Note your Project ID.
4.  **Service Account (for Admin SDK):**
    *   Go to Project settings -> Service accounts.
    *   Generate a new private key (JSON file). You'll need `projectId`, `clientEmail`, and `privateKey` from this file for backend environment variables.
5.  **Web App Configuration (for Client SDK):**
    *   Go to Project settings -> General.
    *   Scroll down to "Your apps" and click the Web icon (`</>`) to add a web app or get config for an existing one.
    *   You'll need `apiKey`, `authDomain`, `projectId`, etc., for frontend environment variables.

### Project Setup
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of the project. See the [Environment Variables](#environment-variables) section below for required variables.

## 6. Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 7. Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
# Firebase Admin SDK (for server-side operations)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY="your-firebase-private-key-with-newlines-escaped-as-\n" # Ensure newlines are properly escaped

# Firebase Client SDK (for client-side operations - prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-web-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id (optional)

# Vapi AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-vapi-public-web-token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-vapi-workflow-id-for-interview-generation # (If you have a specific workflow for generating interview structure)

# Google Gemini API Key (implicitly used by @ai-sdk/google, often set as GOOGLE_API_KEY or GOOGLE_GENERATIVE_LANGUAGE_API_KEY in the server environment)
# Ensure this is available in the environment where your Next.js server (for Route Handlers and Server Actions) runs.
# For Vercel, add this to project environment variables.
GOOGLE_API_KEY=your-google-gemini-api-key
