#include "pricing.h"

double Pricing::calculatePrice(double basePrice, int bookedSeats, int totalSeats, int distance) {
    double demandFactor = (double)bookedSeats / totalSeats;
    double distanceFactor = distance * 0.05;

    return basePrice * (1 + demandFactor) + distanceFactor;
}