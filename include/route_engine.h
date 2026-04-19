#ifndef ROUTE_ENGINE_H
#define ROUTE_ENGINE_H

#include "graph.h"
#include <vector>
#include <utility>

using namespace std;

class RouteEngine {
public:
    Graph graph;

    vector<pair<int, vector<string>>> getTopRoutes(string start, string end, int k);
};

#endif