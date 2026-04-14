#ifndef BOOKING_H
#define BOOKING_H

class Booking {
public:
    int bookingId;
    int flightId;
    int seatNumber;

    Booking(int bId, int fId, int seat);
};

#endif