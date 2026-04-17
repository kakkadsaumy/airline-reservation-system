#include <iostream>
#include <vector>
#include "flight.h"
#include "pricing.h"
#include "graph.h"

using namespace std;

int main() {

    vector<Flight> flights;

    flights.push_back(Flight(1, "Delhi", "Mumbai", 100, 5000));
    flights.push_back(Flight(2, "Mumbai", "Bangalore", 120, 4500));

    cout << "Available Flights:\n" << endl;

    for (auto &f : flights) {
        f.displayFlight();
    }

    Graph g;

    g.addEdge("Delhi", "Mumbai", 10);
    g.addEdge("Mumbai", "Delhi", 10);

    g.addEdge("Mumbai", "Bangalore", 8);
    g.addEdge("Bangalore", "Mumbai", 8);

    g.addEdge("Delhi", "Bangalore", 25);
    g.addEdge("Bangalore", "Delhi", 25);

    string start, end;

    cout << "\nEnter source city: ";
    cin >> start;

    cout << "Enter destination city: ";
    cin >> end;

    auto result = g.shortestPath(start, end);

    if (result.first == INT_MAX) {
        cout << "No route found." << endl;
        return 0;
    }

    cout << "\nOptimal Route: ";
    for (auto &city : result.second) {
        cout << city;
        if (city != result.second.back()) cout << " -> ";
    }

    cout << "\nTotal Distance: " << result.first << endl;

    int choice;
    cout << "\nEnter Flight ID to book: ";
    cin >> choice;

    bool found = false;

    for (auto &f : flights) {
        if (f.id == choice) {
            found = true;

            if (f.availableSeats <= 0) {
                cout << "No seats available!" << endl;
                return 0;
            }

            f.availableSeats--;

            double newPrice = Pricing::calculatePrice(
                f.basePrice,
                f.totalSeats - f.availableSeats,
                f.totalSeats,
                result.first
            );

            cout << "\nBooking Confirmed!" << endl;
            cout << "Route: " << start << " -> " << end << endl;
            cout << "Final Price: " << newPrice << endl;
            cout << "Remaining Seats: " << f.availableSeats << endl;
        }
    }

    if (!found) {
        cout << "Invalid Flight ID" << endl;
    }

    return 0;
}