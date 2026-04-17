#ifndef GRAPH_H
#define GRAPH_H

#include <map>
#include <vector>
#include <string>
#include <utility>

using namespace std;

class Graph {
public:
    map<string, vector<pair<string, int>>> adj;

    void addEdge(string u, string v, int weight);

    pair<int, vector<string>> shortestPath(string start, string end);
};

#endif