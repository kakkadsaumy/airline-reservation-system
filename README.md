# Airline Reservation and Route Optimization System

## Overview
This project is a full-stack Airline Reservation and Route Optimization System that combines a C++ backend with a modern web-based frontend.

The system simulates real-world airline functionality by integrating route computation, dynamic pricing, passenger booking, map-based visualization, and ticket generation. Routes are generated using graph algorithms in C++, exported as JSON, and consumed by the frontend for user interaction.

## Features
- Graph-based route generation using C++
- Multiple alternative routes between cities
- Dynamic pricing based on distance and seat demand
- Interactive route visualization using map interface (Leaflet)
- Multi-passenger booking system with dynamic form generation
- Ticket generation and PDF download
- Booking data storage using Supabase
- Airport-based visualization with realistic coordinates
- Animated radar background with custom cursor

## System Architecture
The system follows a hybrid architecture:
C++ Backend -> routes.json -> Frontend (HTML/CSS/JS) -> Supabase

- **Backend (C++)**
  - Generates routes using graph algorithms
  - Calculates distances using the Haversine formula
  - Applies dynamic pricing logic
  - Outputs structured data to `routes.json`

- **Frontend**
  - Displays routes and pricing
  - Allows booking and passenger input
  - Renders interactive maps and UI
  - Generates downloadable tickets

- **Database (Supabase)**
  - Stores booking records
  - Handles structured passenger data

## Mathematical Models

### Distance Calculation
The system uses the Haversine formula to compute distances between cities:

`d = 2R arcsin( sqrt(sin²((φ₂ − φ₁)/2) + cos(φ₁)cos(φ₂)sin²((λ₂ − λ₁)/2)))`

### Dynamic Pricing
Pricing is computed based on distance and simulated demand:
`Base Price = 0.05 × Distance`
`Demand Factor = 1 + (Booked Seats / Total Seats)`
`Final Price = Base Price × Demand Factor`

## Tech Stack

### Backend
- C++
- Object-Oriented Programming
- Graph Algorithms (Dijkstra-based routing)

### Frontend
- HTML5, CSS3, JavaScript (ES6)
- Leaflet.js (Map visualization)
- Canvas API (Radar animation)
- html2canvas + jsPDF (Ticket generation)

### Database
- Supabase

## Project Structure
`/src
main.cpp
graph.cpp
route_engine.cpp
pricing.cpp`

`/include
graph.h
route_engine.h
pricing.h`

`/frontend
index.html
map.html
booking.html
confirmation.html
script.js
map.js
booking.js
confirmation.js
routes.json`

## How It Works

1. The C++ program generates routes and pricing:

`g++ main.cpp graph.cpp route_engine.cpp pricing.cpp -I../include -o routes`

`./routes.exe`

2. Routes are saved in:

`frontend/routes.json`

3. The frontend reads this file and allows users to:
- Search flights
- View routes on a map
- Enter passenger details
- Confirm booking

4. Booking data is stored in Supabase.

5. A ticket is generated and can be downloaded as a PDF.

## Key Highlights
- Combines backend algorithms with frontend UI
- Demonstrates real-world airline concepts
- Uses dynamic pricing instead of static values
- Clean separation between computation and interface
- Fully functional booking and ticket system

## Future Improvements
- Real-time pricing updates based on actual bookings
- User authentication system
- Seat selection interface
- Integration with live flight APIs
- Advanced route optimization (k-shortest paths)
