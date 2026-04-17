#include "graph.h"
#include <iostream>
#include <queue>
#include <limits>

using namespace std;

void Graph::addEdge(string u, string v, int weight) {
    adj[u].push_back({v, weight});
}

void Graph::shortestPath(string start, string end) {
    map<string, int> dist;
    priority_queue<pair<int, string>, vector<pair<int, string>>, greater<>> pq;

    for (auto &node : adj) {
        dist[node.first] = INT_MAX;
    }

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        for (auto &[v, w] : adj[u]) {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }

    cout << "Shortest distance from " << start << " to " << end << " = " << dist[end] << endl;
}