#ifndef FLIGHT_H
#define FLIGHT_H

#include <string>
using namespace std;

class Flight {
public:
    int id;
    string source;
    string destination;
    int totalSeats;
    int availableSeats;
    double basePrice;

    Flight(int id, string src, string dest, int seats, double price);

    void displayFlight();
};

#endif