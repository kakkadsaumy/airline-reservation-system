# System Overview

The system is designed to simulate the core processes of an airline reservation environment while incorporating optimization and sustainability considerations.

## Core Workflow

1. The system stores structured data for flights, including source, destination, timing, seat availability, and pricing.

2. When a user searches for a route, the system identifies all possible paths between the selected locations. This includes both direct and connecting flights.

3. A graph-based model is used where:
   - Airports are represented as nodes
   - Flights are represented as edges

   Using this structure, the system applies algorithms such as shortest path computation to determine optimal routes.

4. The system evaluates routes based on multiple criteria:
   - Distance
   - Cost
   - Estimated carbon emissions

5. Once a route is selected, the system checks seat availability and processes the booking.

6. Ticket pricing is dynamically adjusted based on demand and seat occupancy.

7. After booking, the system updates internal data, including seat availability and pricing.

8. The system also estimates the carbon footprint of the selected route, allowing comparison between different travel options.

## System Modules

- **Flight Module**  
  Handles storage and management of flight data.

- **Booking Module**  
  Manages reservations and ensures consistency in seat allocation.

- **Pricing Module**  
  Implements dynamic pricing based on demand.

- **Graph Module**  
  Handles route optimization using graph algorithms.

## Key Concepts Used

- Object-Oriented Programming (OOP)
- Graph Algorithms (Shortest Path)
- Dynamic Pricing Logic
- Basic Simulation of Real-World Constraints
## Summary

The system combines data management, algorithmic optimization, and simulation of airline operations to create a more realistic and structured reservation model compared to basic implementations.
