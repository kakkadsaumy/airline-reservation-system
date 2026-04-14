#include <iostream>
#include "flight.h"

using namespace std;

Flight::Flight(int id, string src, string dest, int seats, double price) {
    this->id = id;
    source = src;
    destination = dest;
    totalSeats = seats;
    availableSeats = seats;
    basePrice = price;
}

void Flight::displayFlight() {
    cout << "Flight ID: " << id << endl;
    cout << "Route: " << source << " -> " << destination << endl;
    cout << "Seats: " << availableSeats << "/" << totalSeats << endl;
    cout << "Base Price: " << basePrice << endl;
    cout << "-------------------------" << endl;
}