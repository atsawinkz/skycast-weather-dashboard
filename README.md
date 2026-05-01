# SkyCast Weather Dashboard

A modern, responsive weather dashboard built with Next.js 15+ App Router, Tailwind CSS v4, and Shadcn UI. Features real-time weather data, 5-day forecasts, and an interactive glassmorphism UI.

![SkyCast Weather Dashboard](/public/opengraph-image.png) *(Note: Placeholder for actual preview image)*

## Features

- **Real-time Weather Data**: Current weather conditions, temperature, humidity, visibility, and wind speed.
- **5-Day Forecast**: Interactive chart and daily breakdown of expected temperature ranges.
- **Hourly Forecast**: Scrollable horizontal view of upcoming weather conditions for the next 24 hours.
- **Dynamic Theming**: Dark/Light mode support with a dynamic gradient background that changes based on weather conditions.
- **Glassmorphism UI**: Beautiful, modern frosted glass effects that provide a premium user experience.
- **Accessible Design**: Fully compliant with accessibility standards (ARIA labels, high contrast, scalable fonts).

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Server Components, Metadata API)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **API**: [OpenWeatherMap API](https://openweathermap.org/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- An API Key from [OpenWeatherMap](https://openweathermap.org/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atsawinkz/skycast-weather-dashboard.git
   cd skycast-weather-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the example environment file and configure your API key.
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and add your OpenWeatherMap API key:
   ```env
   WEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Best Practices Implemented

This project strictly follows modern frontend best practices:
- **Next Best Practices**: Adheres to the latest Next.js 15+ async APIs, utilizes `generateMetadata` for dynamic SEO, and relies heavily on Server Components to avoid client-side waterfalls.
- **UI/UX Pro Max**: The interface uses standard 4/8dp rhythm spacing, accessible 44x44px minimum touch targets, and extensive ARIA metadata for screen readers.

## License

This project is licensed under the MIT License.
