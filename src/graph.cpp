#include "graph.h"
#include <queue>
#include <limits>
#include <iostream>
#include <algorithm>

using namespace std;

void Graph::addEdge(string u, string v, int weight) {
    adj[u].push_back({v, weight});
}

pair<int, vector<string>> Graph::shortestPath(string start, string end) {
    map<string, int> dist;
    map<string, string> parent;

    priority_queue<pair<int, string>, vector<pair<int, string>>, greater<>> pq;

    for (auto &node : adj) {
        dist[node.first] = INT_MAX;
    }

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto current = pq.top();
        pq.pop();

        int d = current.first;
        string u = current.second;

        for (auto &neighbor : adj[u]) {
            string v = neighbor.first;
            int w = neighbor.second;

            if (dist[v] > d + w) {
                dist[v] = d + w;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }

    vector<string> path;

    if (dist.find(end) == dist.end() || dist[end] == INT_MAX) {
        return {INT_MAX, path};
    }

    string current = end;
    while (current != start) {
        path.push_back(current);
        current = parent[current];
    }
    path.push_back(start);

    reverse(path.begin(), path.end());

    return {dist[end], path};
}