<<<<<<< HEAD
#include <iostream>
#include <vector>
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

    Flight(int id, string src, string dest, int seats, double price) {
        this->id = id;
        source = src;
        destination = dest;
        totalSeats = seats;
        availableSeats = seats;
        basePrice = price;
    }

    void displayFlight() {
        cout << "Flight ID: " << id << endl;
        cout << "Route: " << source << " -> " << destination << endl;
        cout << "Available Seats: " << availableSeats << "/" << totalSeats << endl;
        cout << "Base Price: " << basePrice << endl;
        cout << "-------------------------" << endl;
    }
};

class Booking {
public:
    int bookingId;
    int flightId;
    int seatNumber;

    Booking(int bId, int fId, int seat) {
        bookingId = bId;
        flightId = fId;
        seatNumber = seat;
    }
};

class Pricing {
public:
    static double calculatePrice(double basePrice, int bookedSeats, int totalSeats) {
        double demandFactor = (double)bookedSeats / totalSeats;
        return basePrice * (1 + demandFactor);
    }
};

int main() {
    cout << "Airline Reservation System Initialized" << endl;
    cout << "--------------------------------------" << endl;

    vector<Flight> flights;

    flights.push_back(Flight(1, "Delhi", "Mumbai", 100, 5000));
    flights.push_back(Flight(2, "Mumbai", "Bangalore", 120, 4500));

    cout << "\nAvailable Flights:\n" << endl;
    for (auto &f : flights) {
        f.displayFlight();
    }

    int selectedFlight = 1;
    int seatNumber = 1;

    cout << "\nBooking seat " << seatNumber << " on Flight " << selectedFlight << endl;

    for (auto &f : flights) {
        if (f.id == selectedFlight && f.availableSeats > 0) {
            f.availableSeats--;

            double newPrice = Pricing::calculatePrice(
                f.basePrice,
                f.totalSeats - f.availableSeats,
                f.totalSeats
            );

            cout << "Booking successful!" << endl;
            cout << "Updated Price: " << newPrice << endl;
        }
    }

    return 0;
}
=======
#include <iostream>
#include <vector>
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

    Flight(int id, string src, string dest, int seats, double price) {
        this->id = id;
        source = src;
        destination = dest;
        totalSeats = seats;
        availableSeats = seats;
        basePrice = price;
    }

    void displayFlight() {
        cout << "Flight ID: " << id << endl;
        cout << "Route: " << source << " -> " << destination << endl;
        cout << "Available Seats: " << availableSeats << "/" << totalSeats << endl;
        cout << "Base Price: " << basePrice << endl;
        cout << "-------------------------" << endl;
    }
};

class Booking {
public:
    int bookingId;
    int flightId;
    int seatNumber;

    Booking(int bId, int fId, int seat) {
        bookingId = bId;
        flightId = fId;
        seatNumber = seat;
    }
};

class Pricing {
public:
    static double calculatePrice(double basePrice, int bookedSeats, int totalSeats) {
        double demandFactor = (double)bookedSeats / totalSeats;
        return basePrice * (1 + demandFactor);
    }
};

int main() {
    cout << "Airline Reservation System Initialized" << endl;
    cout << "--------------------------------------" << endl;

    vector<Flight> flights;

    flights.push_back(Flight(1, "Delhi", "Mumbai", 100, 5000));
    flights.push_back(Flight(2, "Mumbai", "Bangalore", 120, 4500));

    cout << "\nAvailable Flights:\n" << endl;
    for (auto &f : flights) {
        f.displayFlight();
    }

    int selectedFlight = 1;
    int seatNumber = 1;

    cout << "\nBooking seat " << seatNumber << " on Flight " << selectedFlight << endl;

    for (auto &f : flights) {
        if (f.id == selectedFlight && f.availableSeats > 0) {
            f.availableSeats--;

            double newPrice = Pricing::calculatePrice(
                f.basePrice,
                f.totalSeats - f.availableSeats,
                f.totalSeats
            );

            cout << "Booking successful!" << endl;
            cout << "Updated Price: " << newPrice << endl;
        }
    }

    return 0;
}
>>>>>>> 5d1c1516d0088e8b357d2883cf1622cf5eeab66b
