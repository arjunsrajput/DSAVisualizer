# ⚡ AlgoViz — Interactive DSA Visualizer & Learning Hub

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.18.2-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Zustand-4.5.0-brown?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>AlgoViz</strong> is a comprehensive, modern, step-by-step algorithm and data structure visualizer designed for developers, students, and competitive programmers. Experience <strong>47+ interactive visualizers</strong> across <strong>8 categories</strong> with synchronized code execution, variable playback speed, comprehensive interview theory, and a real-time competitive programming contest tracker.
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-algorithms-catalog">Algorithms Catalog</a> •
  <a href="#-architecture--how-it-works">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-pushing-to-github">Pushing to GitHub</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌟 Key Features

- **🎮 Step-by-Step Interactive Playback**:
  - Play, pause, step forward, and step backward through any algorithm run.
  - Granular speed control ranging from `0.25x` to `4.0x`.
  - Jump to any execution step directly via the dynamic step log.
- **💻 Synchronized Code Walkthrough**:
  - Side-by-side pseudocode / implementation panel that highlights the active line in real time as the visualization updates.
- **🎨 Multi-Paradigm Visualizers**:
  - **Dynamic Bar & Array Views**: Compare, swap, partition, and bucket operations with color-coded states.
  - **Tree & Self-Balancing Animations**: Visual node inserts, traversals, and dynamic AVL rotations (LL, RR, LR, RL).
  - **Interactive Graphs**: Directed, undirected, and weighted graphs with priority queues and distance tables.
  - **Dynamic Programming Matrices & 1D Grids**: Step through subproblem table filling, state transitions, and optimal path backtracking.
  - **Linked Lists**: Singly, doubly, and circular lists with visual pointer updates and simulated memory address references.
- **🎓 Integrated Learning & Interview Hub**:
  - **Visualize Tab**: Real-time canvas and step narration.
  - **Learn Tab**: Theoretical deep-dive, operation breakdown, and time/space complexity ($O(1)$, $O(\log n)$, $O(n)$, etc.).
  - **Tips Tab**: Interview-focused insights, edge cases, common pitfalls, and optimization strategies.
- **🏆 Live Contest Tracker**:
  - Aggregates upcoming and ongoing coding contests across **Codeforces**, **LeetCode**, **CodeChef**, and **AtCoder**.
  - Displays contest phase, duration, start/end dates, and direct links to participate.
- **🌓 Modern Developer UI**:
  - Dark / Light theme support.
  - Built with **JetBrains Mono** and **Space Grotesk** typography.
  - Fluid spring animations powered by **Framer Motion** and **Tailwind CSS**.

---

## 📚 Algorithms Catalog

AlgoViz includes **47 algorithms and data structures** across 8 foundational categories:

### 1. 🔍 Searching
| Algorithm | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Linear Search** | `Easy` | $O(n)$ | $O(1)$ | Sequential scan across arbitrary arrays |
| **Binary Search** | `Easy` | $O(\log n)$ | $O(1)$ | Divide-and-conquer on sorted ranges |
| **Median of Medians** | `Hard` | $O(n)$ | $O(n)$ | Deterministic linear-time selection algorithm |

### 2. 🔀 Sorting
| Algorithm | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Bubble Sort** | `Easy` | $O(n^2)$ | $O(1)$ | Adjacent element comparisons & swaps |
| **Selection Sort** | `Easy` | $O(n^2)$ | $O(1)$ | Incremental minimum selection |
| **Insertion Sort** | `Easy` | $O(n^2)$ | $O(1)$ | In-place sorted subarray expansion |
| **Merge Sort** | `Medium` | $O(n \log n)$ | $O(n)$ | Recursive divide, sort, and two-way merge |
| **Quick Sort** | `Medium` | $O(n \log n)$ | $O(\log n)$ | Pivot partitioning (Lomuto / Hoare) |
| **Heap Sort** | `Medium` | $O(n \log n)$ | $O(1)$ | Max-heap construction & root extraction |
| **Counting Sort** | `Medium` | $O(n + k)$ | $O(k)$ | Non-comparison integer frequency counting |
| **Radix Sort** | `Medium` | $O(d \cdot (n + k))$ | $O(n + k)$ | LSD digit-by-digit distribution pass |
| **Bucket Sort** | `Medium` | $O(n + k)$ | $O(n + k)$ | Interval binning & per-bucket sorting |

### 3. 🥞 Stack
| Algorithm / Problem | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Stack Operations** | `Easy` | $O(1)$ | $O(n)$ | Push, pop, and peek operations with capacity check |
| **Balanced Parentheses** | `Easy` | $O(n)$ | $O(n)$ | Multi-bracket `()`, `{}`, `[]` validation |
| **Infix to Postfix** | `Hard` | $O(n)$ | $O(n)$ | Shunting-Yard operator precedence conversion |
| **Next Greater Element (NGE)** | `Hard` | $O(n)$ | $O(n)$ | Monotonic decreasing stack application |

### 4. 📬 Queue
| Algorithm / Structure | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Queue Operations** | `Easy` | $O(1)$ | $O(n)$ | Standard FIFO enqueue, dequeue, front inspection |
| **Circular Queue** | `Medium` | $O(1)$ | $O(n)$ | Ring buffer layout utilizing modulo arithmetic |
| **Priority Queue (Min Heap)** | `Hard` | $O(\log n)$ | $O(n)$ | Dynamic min-heap tree with bubble-up / bubble-down |

### 5. 🔗 Linked List
| Algorithm / Structure | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Singly Linked List** | `Medium` | $O(n)$ | $O(n)$ | Head/tail insertion, deletion, and node traversal |
| **Doubly Linked List** | `Medium` | $O(n)$ | $O(n)$ | Bidirectional traversal with `prev` & `next` pointers |
| **Circular Linked List** | `Medium` | $O(n)$ | $O(n)$ | Closed loop traversal linking tail back to head |
| **Reverse Singly Linked List** | `Medium` | $O(n)$ | $O(1)$ | 3-pointer iterative pointer reversal (`prev`, `curr`, `next`) |
| **Reverse Doubly Linked List** | `Medium` | $O(n)$ | $O(1)$ | Bidirectional pointer swapping |
| **Floyd's Cycle Detection** | `Hard` | $O(n)$ | $O(1)$ | Tortoise & Hare cycle detection & loop origin discovery |
| **Merge Two Sorted Lists** | `Hard` | $O(m + n)$ | $O(1)$ | In-place splicing of two sorted linked chains |

### 6. 🌳 Trees
| Algorithm / Structure | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Binary Search Tree (BST)** | `Medium` | $O(\log n)$ | $O(n)$ | Node search, insertion, and deletion |
| **Inorder Traversal** | `Easy` | $O(n)$ | $O(h)$ | Left → Root → Right (produces sorted order in BST) |
| **Preorder Traversal** | `Easy` | $O(n)$ | $O(h)$ | Root → Left → Right (used for serialization/cloning) |
| **Postorder Traversal** | `Easy` | $O(n)$ | $O(h)$ | Left → Right → Root (used for bottom-up node deletion) |
| **Level Order Traversal** | `Medium` | $O(n)$ | $O(w)$ | Breadth-first level-by-level queue traversal |
| **AVL Tree** | `Hard` | $O(\log n)$ | $O(n)$ | Strict height-balancing with LL, RR, LR, RL rotations |

### 7. 🧩 Dynamic Programming (DP)
| Problem | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Fibonacci DP** | `Easy` | $O(n)$ | $O(n)$ | 1D tabulation showing overlapping subproblems |
| **0/1 Knapsack** | `Medium` | $O(n \cdot W)$ | $O(n \cdot W)$ | 2D capacity table comparing "take" vs "skip" choices |
| **Longest Common Subsequence (LCS)** | `Medium` | $O(m \cdot n)$ | $O(m \cdot n)$ | String prefix matching matrix with path reconstruction |
| **Coin Change** | `Medium` | $O(A \cdot C)$ | $O(A)$ | Minimum coins computed via 1D bottom-up tabulation |
| **Longest Increasing Subsequence (LIS)** | `Medium` | $O(n^2)$ | $O(n)$ | Subsequence state tracking and predecessor links |
| **Edit Distance (Levenshtein)** | `Hard` | $O(m \cdot n)$ | $O(m \cdot n)$ | Matrix of insert, delete, and replace operations |
| **Minimum Path Sum** | `Medium` | $O(m \cdot n)$ | $O(m \cdot n)$ | 2D grid pathfinding minimizing cumulative weight |

### 8. 🕸️ Graphs
| Algorithm | Difficulty | Time Complexity | Space Complexity | Highlights |
| :--- | :---: | :---: | :---: | :--- |
| **Breadth First Search (BFS)** | `Medium` | $O(V + E)$ | $O(V)$ | Queue-driven shortest path on unweighted graphs |
| **Depth First Search (DFS)** | `Medium` | $O(V + E)$ | $O(V)$ | Recursive/stack traversal with backtracking |
| **Dijkstra's Algorithm** | `Hard` | $O((V + E) \log V)$ | $O(V)$ | Greedy single-source shortest path (non-negative weights) |
| **Bellman-Ford Algorithm** | `Hard` | $O(V \cdot E)$ | $O(V)$ | Shortest path supporting negative edges & cycle detection |
| **Prim's Algorithm** | `Hard` | $O(E \log V)$ | $O(V)$ | Minimum Spanning Tree via greedy cut expansion |
| **Kruskal's Algorithm** | `Hard` | $O(E \log E)$ | $O(V)$ | MST with sorted edges and Disjoint Set Union (Union-Find) |
| **Topological Sort** | `Medium` | $O(V + E)$ | $O(V)$ | Kahn's in-degree queue algorithm for DAG dependency ordering |
| **Cycle Detection** | `Medium` | $O(V + E)$ | $O(V)$ | 3-Color DFS (White/Gray/Black) identifying back edges |

---

## 🏗️ Architecture & How It Works

AlgoViz employs a clean **decoupled generator-consumer architecture**:

```
┌─────────────────────────────────┐
│     Pure Algorithm Generator    │  ← Pure JavaScript (no DOM / React dependencies)
│     (src/algorithms/**)         │  ← Generates an array of immutable step snapshots
└────────────────┬────────────────┘
                 │ Array of Steps [ { data, activeIndices, currentLine, description } ]
                 ▼
┌─────────────────────────────────┐
│       useAlgorithmPlayer        │  ← Animation engine hook manages timer, speed,
│      (src/hooks/useAlgorithm)   │    current step index, play/pause, step navigation
└────────────────┬────────────────┘
                 │ Reactive State
                 ▼
┌─────────────────────────────────┐
│     Visualizer + Code Panel     │  ← Renders synchronized visual canvas (Array, Tree,
│   (src/components/visualizers)  │    Graph, DP Matrix) and highlights active code lines
└─────────────────────────────────┘
```

1. **Pure Step Generators** (`src/algorithms/`): Every algorithm runs to completion beforehand in a pure function, recording an array of discrete state snapshots (`steps`). Each step contains the current data structure state, active indices, pointers, message descriptions, and the active code line number.
2. **Unified Player Hook** (`useAlgorithmPlayer`): A single reusable hook drives the timeline across all algorithms, orchestrating playback ticks, manual stepping, jump-to-step, and responsive interval calculations.
3. **Reactive Visualizers** (`src/components/visualizers/`): Visualizer components render declarative views based purely on the current step snapshot.
4. **Contest Aggregator** (`src/services/contestService.js`): Queries competitive programming APIs via Vite dev proxy and falls back gracefully to direct CORS-enabled endpoints in production builds.

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)

---

## 📁 Project Structure

```text
dsa-visualizer/
├── index.html                   # HTML entry point with web fonts
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Tailwind design tokens & themes
├── vite.config.js               # Vite config & contest proxy middleware
├── src/
│   ├── algorithms/              # Pure step generator functions
│   │   ├── dp/                  # Dynamic programming step generators
│   │   ├── graph/               # Graph algorithms (BFS, DFS, Dijkstra, etc.)
│   │   ├── linkedList/          # Singly, Doubly, Floyd cycle, Reversal
│   │   ├── queue/               # Queue, Circular Queue, Priority Queue
│   │   ├── searching/           # Linear, Binary, Median of Medians
│   │   ├── sorting/             # 9 comparison & non-comparison sorts
│   │   ├── stack/               # Stack, Balanced Brackets, NGE, Infix
│   │   └── tree/                # BST, Traversals, AVL tree rotations
│   ├── components/
│   │   ├── common/              # Navbar, Controls, CodePanel, StepLog, Tabs
│   │   └── visualizers/         # 20+ specialized rendering canvases
│   ├── data/                    # Theory, complexities, and metadata
│   ├── hooks/                   # useAlgorithmPlayer animation engine
│   ├── pages/                   # 47 algorithm route pages + Home + Contests
│   ├── services/                # Live contest fetcher & normalizer
│   ├── store/                   # Zustand store (playback speed, theme)
│   ├── styles/                  # Global CSS & Tailwind utilities
│   ├── utils/                   # Input parsers & graph coordinate layouts
│   ├── App.jsx                  # Main router configuration
│   └── main.jsx                 # React root mount
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed.

```bash
# Verify Node and npm installations
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173](http://localhost:5173) to start exploring algorithms!

### Production Build

```bash
# Build optimized production bundle to /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 📤 Pushing to GitHub

Follow these steps to initialize git and push this project to your GitHub account:

```bash
# 1. Initialize git repository (if not already done)
git init

# 2. Add files to staging (respects .gitignore)
git add .

# 3. Create your initial commit
git commit -m "feat: initial commit with 47 DSA visualizers and contest tracker"

# 4. Rename the default branch to main
git branch -M main

# 5. Add your GitHub remote repository URL
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 🌐 Deployment

You can deploy AlgoViz for free with zero configuration on:

### Vercel
1. Import your GitHub repository on [Vercel](https://vercel.com/).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

### Netlify
1. Connect repository on [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a `_redirects` file in `public/` with `/* /index.html 200` for client-side routing support.

---

## 🤝 Contributing

Contributions are always welcome! If you want to add new algorithms, enhance visualizer animations, or improve explanations:

1. **Fork the repository**
2. **Create your feature branch**: `git checkout -b feature/awesome-algorithm`
3. **Commit your changes**: `git commit -m "feat: add Kadane's algorithm visualizer"`
4. **Push to the branch**: `git push origin feature/awesome-algorithm`
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute for educational and personal projects.

---

<p align="center">
  Crafted with ❤️ for students, educators, and algorithmic problem solvers.
</p>
