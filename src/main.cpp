#include <iostream>
#include <vector>
#include "flight.h"
#include "pricing.h"

using namespace std;

int main() {

    vector<Flight> flights;

    flights.push_back(Flight(1, "Delhi", "Mumbai", 100, 5000));
    flights.push_back(Flight(2, "Mumbai", "Bangalore", 120, 4500));

    cout << "Available Flights:\n" << endl;

    for (auto &f : flights) {
        f.displayFlight();
    }

    int choice;
    cout << "\nEnter Flight ID to book: ";
    cin >> choice;

    for (auto &f : flights) {
        if (f.id == choice) {

            if (f.availableSeats <= 0) {
                cout << "No seats available!" << endl;
                return 0;
            }

            f.availableSeats--;

            double newPrice = Pricing::calculatePrice(
                f.basePrice,
                f.totalSeats - f.availableSeats,
                f.totalSeats
            );

            cout << "\nBooking Successful!" << endl;
            cout << "Updated Price: " << newPrice << endl;
        }
    }

    return 0;
}