#include "route_engine.h"
#include <algorithm>
#include <climits>

vector<pair<int, vector<string>>> RouteEngine::getTopRoutes(string start, string end, int k) {
    vector<pair<int, vector<string>>> routes;

    Graph tempGraph = graph;

    for (int i = 0; i < k; i++) {
        auto result = tempGraph.shortestPath(start, end);

        if (result.first == INT_MAX) break;

        routes.push_back(result);

        if (result.second.size() < 2) break;

        string u = result.second[0];
        string v = result.second[1];

        auto &edges = tempGraph.adj[u];
        edges.erase(remove_if(edges.begin(), edges.end(),
            [&](pair<string,int> e) { return e.first == v; }), edges.end());
    }

    return routes;
}