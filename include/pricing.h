#ifndef PRICING_H
#define PRICING_H

class Pricing {
public:
    static double calculatePrice(double basePrice, int bookedSeats, int totalSeats, int distance);
};

#endif