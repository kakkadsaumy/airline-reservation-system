#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <fstream>
#include <ctime>
#include <cstdlib>

#include "route_engine.h"

using namespace std;

struct City {
    string name;
    double lat;
    double lon;
};

string normalize(string s) {
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    s.erase(remove(s.begin(), s.end(), ' '), s.end());
    return s;
}

double haversine(double lat1, double lon1, double lat2, double lon2) {
    double R = 6371;

    double dLat = (lat2 - lat1) * M_PI / 180;
    double dLon = (lon2 - lon1) * M_PI / 180;

    lat1 *= M_PI / 180;
    lat2 *= M_PI / 180;

    double a = sin(dLat/2)*sin(dLat/2) +
               sin(dLon/2)*sin(dLon/2)*cos(lat1)*cos(lat2);

    double c = 2 * atan2(sqrt(a), sqrt(1-a));

    return R * c;
}

int main() {
    srand(time(0));

    RouteEngine engine;

    vector<City> cities = {
        {"New Delhi", 28.6139, 77.2090},
        {"Mumbai", 19.0760, 72.8777},
        {"Dubai", 25.2048, 55.2708},
        {"London", 51.5074, -0.1278},
        {"Paris", 48.8566, 2.3522},
        {"New York", 40.7128, -74.0060},
        {"Singapore", 1.3521, 103.8198},
        {"Tokyo", 35.6762, 139.6503},
        {"Kolkata", 22.5726, 88.3639},
        {"Cairo", 30.0444, 31.2357},
        {"Hong Kong", 22.3193, 114.1694},
        {"Accra", 5.6037, -0.1870},
        {"Port Louis", -20.1609, 57.5012},
        {"Berlin", 52.5200, 13.4050},
        {"Brasilia", -15.8267, -47.9218},
        {"Buenos Aires", -34.6037, -58.3816},
        {"Lisbon", 38.7223, -9.1393},
        {"Beijing", 39.9042, 116.4074}
    };

    for (int i = 0; i < cities.size(); i++) {
        for (int j = i + 1; j < cities.size(); j++) {
            double dist = haversine(
                cities[i].lat, cities[i].lon,
                cities[j].lat, cities[j].lon
            );

            if (dist < 15000) {
                engine.graph.addEdge(normalize(cities[i].name), normalize(cities[j].name), dist);
                engine.graph.addEdge(normalize(cities[j].name), normalize(cities[i].name), dist);
            }
        }
    }

    ofstream file("C:\\Users\\skakk\\Desktop\\airline-reservation-system\\airline-reservation-system\\frontend\\routes.json");

    file << "{ \"routes\": [";

    bool firstRoute = true;

    for (int i = 0; i < cities.size(); i++) {
        for (int j = 0; j < cities.size(); j++) {
            if (i == j) continue;

            string s = normalize(cities[i].name);
            string e = normalize(cities[j].name);

            auto routes = engine.getTopRoutes(s, e, 2);

            for (auto &r : routes) {
                if (!firstRoute) file << ",";
                firstRoute = false;

                int distance = r.first;
                int stops = r.second.size() - 1;

                double base = distance * 0.08 + stops * 150 + (rand() % 200);

                file << "{ \"from\": \"" << cities[i].name << "\", ";
                file << "\"to\": \"" << cities[j].name << "\", ";
                file << "\"path\": [";

                for (int k = 0; k < r.second.size(); k++) {
                    for (auto &c : cities) {
                        if (normalize(c.name) == r.second[k]) {
                            file << "\"" << c.name << "\"";
                            break;
                        }
                    }

                    if (k != r.second.size() - 1) file << ",";
                }

                file << "], \"classes\": {";
                file << "\"economy\": {\"price\": " << base << ", \"seats\": 120},";
                file << "\"business\": {\"price\": " << base * 2.5 << ", \"seats\": 40},";
                file << "\"first\": {\"price\": " << base * 5 << ", \"seats\": 10}";
                file << "} }";
            }
        }
    }

    file << "] }";
    file.close();

    cout << "Routes generated successfully.\n";

    return 0;
}