
# Yomali Tracking Assessment - Frontend

This project is the **React-based frontend** for the Yomali tracking assessment.  
It consumes the backend API directly to display session and page view analytics via interactive dashboards and charts.

The app is built with modern tools for a fast, responsive, and maintainable frontend experience.

---

## Features

- **React + Vite**: fast development and build setup
- **TanStack Router**: flexible and type-safe routing
- **TanStack Query**: efficient data fetching and caching
- **Tailwind CSS**: utility-first styling
- **shadcn/ui**: ready-to-use UI components
- **Dockerized**: containerized for easy deployment

---

## Architecture Overview

- Fetches analytics data directly from the **backend API**.
- Displays dashboards for sessions and page views.
- Uses **TanStack Query** for caching and automatic updates.
- Built with **component-driven UI** using Tailwind and shadcn components.

---

## Getting Started

### Prerequisites

- Node.js (>=18.x recommended)
- Docker (optional for containerized setup)

### Installation

Clone the repository and install dependencies:

    git clone <repo-url>
    cd yomali-challenge-frontend
    npm install

### Environment Variables

Create a `.env` file at the project root. Example:

    VITE_API_URL=http://localhost:3000

Make sure this points to your **backend server**.

### Running the Application

#### Local Development

    npm run dev

This will start the Vite dev server, available at:

    http://localhost:3000

#### Docker

Build the image:

    docker build -t yomali-frontend .

Run the container (make sure `.env` is present):

    docker run --env-file .env -p 80:80 yomali-frontend

---

## Tech Stack

- **React**: component-based frontend
- **Vite**: fast build and dev tooling
- **TanStack Router**: routing
- **TanStack Query**: data fetching and caching
- **Tailwind CSS**: styling
- **shadcn/ui**: UI components
- **Docker**: containerization

---

## Notes

- This frontend is part of a technical assessment for **Yomali**.
- Focuses on **visualizing session and page view analytics** from the backend.
- Local development and Docker are supported; deployment instructions are not included in this README.

## Related Repositories
- [Backend (NestJS Tracking Server)](https://github.com/lucaslosekann/yomali-challenge-backend/)
- [Tracking Snippet (JavaScript)](https://github.com/lucaslosekann/yomali-challenge-snippet/)