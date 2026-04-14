#include "pricing.h"

double Pricing::calculatePrice(double basePrice, int bookedSeats, int totalSeats) {
    double factor = (double)bookedSeats / totalSeats;
    return basePrice * (1 + factor);
}