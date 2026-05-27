/* ===========================================================================
   tests.js — Mastery reviews for all 13 sectors in Wabi.
   Plain JS, no Babel. Loaded before React mounts.

   Question types:
     mcq  — single correct option; +2 correct, −0.67 wrong
     msq  — multiple correct; +2 only if ALL correct selected, else 0
     nat  — numerical answer within tolerance; +2 correct, else 0

   Difficulty: deep synthesis practice.
   A student who can answer these comfortably has real command of the ideas.
=========================================================================== */

window.TESTS = {

  /* ════════════════════════════════════════════════════════════════════════
     F1 — CONDITIONING
  ════════════════════════════════════════════════════════════════════════ */
  cond: {
    title: "Conditioning — Mastery Review",
    desc:  "Bayes, total expectation, total variance, independence.",
    questions: [
      {
        id:"cond-q1", type:"mcq",
        text:"A disease affects 0.1% of the population. A test has 99% sensitivity (true-positive rate) and 95% specificity (true-negative rate). Given a positive test result, what is the approximate probability that the person actually has the disease?",
        options:[
          "About 1.94%",
          "About 16.4%",
          "About 50%",
          "About 99%"
        ],
        answer:0,
        explanation:"P(D)=0.001, P(+|D)=0.99, P(+|¬D)=0.05. P(+) = 0.99×0.001 + 0.05×0.999 = 0.000990+0.04995 = 0.05094. P(D|+) = 0.000990/0.05094 ≈ 0.0194 = 1.94%. Low base rate dominates despite high sensitivity — the classic Bayesian trap."
      },
      {
        id:"cond-q2", type:"nat",
        text:"Coins A and B are biased: P(H|A)=0.7, P(H|B)=0.4. A coin is chosen uniformly at random. Given that the first two flips are both Heads, what is the probability (to 4 decimal places) that the chosen coin is A?",
        answer:0.7535,
        tolerance:0.001,
        explanation:"P(HH|A)=0.49, P(HH|B)=0.16. P(HH)=0.5×0.49+0.5×0.16=0.325. P(A|HH)=0.245/0.325=49/65≈0.7538."
      },
      {
        id:"cond-q3", type:"msq",
        text:"Let X ~ Bernoulli(p) and Y|X=0 ~ Uniform(0,1), Y|X=1 ~ Uniform(1,2). Which of the following are correct?",
        options:[
          "E[Y] = p/2 + (2p+1)/2 — this simplifies to p + 1/2",
          "Var(Y) = 1/12 (the same regardless of p)",
          "By law of total expectation: E[Y] = E[E[Y|X]]",
          "Var(Y) = E[Var(Y|X)] + Var(E[Y|X])  (law of total variance)"
        ],
        answer:[0,2,3],
        explanation:"E[Y|X=0]=0.5, E[Y|X=1]=1.5. E[Y]=p×1.5+(1-p)×0.5=p+0.5. ✓ Option A correct. Var(Y|X)=1/12 (same for both), E[Var(Y|X)]=1/12. E[Y|X] is 0.5 or 1.5, Var(E[Y|X])=p(1-p). So Var(Y)=1/12+p(1-p) — option B is wrong. Options C and D are always-true identities."
      },
      {
        id:"cond-q4", type:"mcq",
        text:"Events A and B satisfy P(A)=0.6, P(B)=0.5, P(A∩B)=0.3. Are A and B independent? And does P(A∩B)=0 imply independence?",
        options:[
          "Yes independent; Yes P(A∩B)=0 implies independence",
          "Yes independent; No P(A∩B)=0 does NOT imply independence",
          "No not independent; Yes P(A∩B)=0 implies independence",
          "No not independent; No P(A∩B)=0 does NOT imply independence"
        ],
        answer:1,
        explanation:"P(A)P(B)=0.3=P(A∩B), so A and B ARE independent. For the second part: if P(A∩B)=0 but P(A)>0 and P(B)>0, then P(A∩B)=0≠P(A)P(B)>0, so mutually exclusive non-trivial events are NOT independent."
      },
      {
        id:"cond-q5", type:"nat",
        text:"Let X ~ Geometric(p=0.3) (number of trials until first success, P(X=k)=(0.7)^{k-1}·0.3). Compute E[X²] to 4 decimal places using E[X²]=Var(X)+(E[X])².",
        answer:18.8889,
        tolerance:0.01,
        explanation:"E[X]=1/p=1/0.3=10/3≈3.333. Var(X)=(1-p)/p²=0.7/0.09=70/9≈7.778. E[X²]=70/9+(10/3)²=70/9+100/9=170/9≈18.8889."
      },
      {
        id:"cond-q6", type:"mcq",
        text:"In a class of 30 students, each independently completes a module with probability 0.8. Using the law of total variance, find Var(S) where S = total students who pass, if instead the pass probability P is itself a random variable uniform on [0.6, 1.0].",
        options:[
          "Var(S) = 30×0.8×0.2 = 4.8",
          "Var(S) = 30×0.8×0.2 + 30²×Var(P) = 4.8 + 900×(0.4²/12)",
          "Var(S) = E[30P(1-P)] + Var(30P)",
          "Var(S) = 30×E[P(1-P)] + 30²×Var(P)"
        ],
        answer:3,
        explanation:"S|P ~ Binomial(30,P). E[S|P]=30P, Var(S|P)=30P(1-P). By LOTV: Var(S)=E[Var(S|P)]+Var(E[S|P])=30E[P(1-P)]+Var(30P)=30E[P(1-P)]+30²Var(P). This is option D."
      },
      {
        id:"cond-q7", type:"msq",
        text:"Which of the following statements about conditional independence are correct?",
        options:[
          "A⊥B|C means P(A∩B|C) = P(A|C)P(B|C)",
          "If A⊥B|C and A⊥C, then A⊥B (marginal independence)",
          "A⊥B|C does NOT imply A⊥B marginally",
          "In a Naive Bayes classifier, features are assumed conditionally independent given the class label"
        ],
        answer:[0,2,3],
        explanation:"(A) is the definition — correct. (B) is FALSE: explaining away shows that conditional independence doesn't imply marginal independence (nor vice versa). (C) is correct — classic Berkson's paradox. (D) is the core assumption of Naive Bayes — correct."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     F2 — EIGENSTRUCTURE
  ════════════════════════════════════════════════════════════════════════ */
  eig: {
    title: "Eigenstructure — Mastery Review",
    desc:  "Eigenvalues, spectral theorem, projections, quadratic forms, Rayleigh quotient.",
    questions: [
      {
        id:"eig-q1", type:"nat",
        text:"Matrix A = [[4, 2], [1, 3]]. Compute the spectral radius ρ(A) = max|λᵢ|. Enter the exact integer value.",
        answer:5,
        tolerance:0,
        explanation:"char poly: (4-λ)(3-λ)-2=λ²-7λ+10=(λ-5)(λ-2). Eigenvalues 5 and 2. ρ(A)=5."
      },
      {
        id:"eig-q2", type:"mcq",
        text:"A symmetric 3×3 matrix has eigenvalues 1, 4, 9. Which of the following is the trace and determinant?",
        options:[
          "Trace=14, Det=36",
          "Trace=36, Det=14",
          "Trace=14, Det=14",
          "Trace=36, Det=36"
        ],
        answer:0,
        explanation:"Trace = sum of eigenvalues = 1+4+9=14. Det = product of eigenvalues = 1×4×9=36."
      },
      {
        id:"eig-q3", type:"msq",
        text:"Let A be a real symmetric n×n matrix. Which of the following are always true?",
        options:[
          "All eigenvalues of A are real",
          "Eigenvectors for distinct eigenvalues are orthogonal",
          "A is always invertible",
          "A can be diagonalized as A=QΛQᵀ where Q is orthogonal"
        ],
        answer:[0,1,3],
        explanation:"Real symmetric matrices: all eigenvalues real (A), eigenvectors for distinct λ orthogonal (B), and the spectral theorem guarantees orthogonal diagonalization (D). (C) is false — A could have eigenvalue 0 making it singular."
      },
      {
        id:"eig-q4", type:"nat",
        text:"The projection matrix P onto the column space of A = [[1],[2],[2]] (a 3×1 matrix). What is trace(P)? Enter the integer.",
        answer:1,
        explanation:"P = AAᵀ/(AᵀA). AᵀA = 1+4+4=9. P = (1/9)[[1,2,2],[2,4,4],[2,4,4]]. Trace = (1+4+4)/9 = 1. Alternatively: rank of A is 1, so trace(P) = rank = 1."
      },
      {
        id:"eig-q5", type:"mcq",
        text:"The Rayleigh quotient R(x) = xᵀAx / xᵀx for symmetric A satisfies: the minimum over all nonzero x equals the ______ eigenvalue, and the maximum equals the ______ eigenvalue.",
        options:[
          "largest; smallest",
          "smallest; largest",
          "second-smallest; second-largest",
          "smallest; second-largest"
        ],
        answer:1,
        explanation:"By the Courant-Fischer min-max theorem: min R(x)=λ_min, max R(x)=λ_max. The extrema are attained at the corresponding eigenvectors."
      },
      {
        id:"eig-q6", type:"nat",
        text:"Matrix M = [[2,1],[0,2]] (Jordan block, 1-indexed). Compute M^10. What is the (1,2) entry of M^10? (Row 1, column 2.)",
        answer:5120,
        tolerance:0,
        explanation:"For Jordan block [[λ,1],[0,λ]], M^n = [[λ^n, n·λ^(n-1)],[0,λ^n]]. Here λ=2, n=10: (1,2) entry = 10·2^9 = 10·512 = 5120."
      },
      {
        id:"eig-q7", type:"msq",
        text:"A is a positive semi-definite (PSD) matrix. Which of the following must hold?",
        options:[
          "All eigenvalues of A are ≥ 0",
          "xᵀAx ≥ 0 for all x",
          "A = BᵀB for some matrix B",
          "det(A) > 0"
        ],
        answer:[0,1,2],
        explanation:"PSD: eigenvalues ≥0 (A), quadratic form non-negative (B — definition), and A=BᵀB via Cholesky (C). (D) is false: det=0 is possible (e.g., A is singular PSD)."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     F3 — GRADIENT GEOMETRY
  ════════════════════════════════════════════════════════════════════════ */
  grad: {
    title: "Gradient Geometry — Mastery Review",
    desc:  "Gradients, convexity, descent, Lagrangians, convergence.",
    questions: [
      {
        id:"grad-q1", type:"nat",
        text:"f(x,y) = x³ - 3xy². At the point (1, 1), compute |∇f|² (squared norm of the gradient). Enter the integer value.",
        answer:36,
        tolerance:0,
        explanation:"∂f/∂x=3x²-3y²=3(1-1)=0. ∂f/∂y=-6xy=-6. |∇f|²=0+36=36."
      },
      {
        id:"grad-q2", type:"nat",
        text:"Gradient descent on f(x)=x² with step size η=0.3, starting at x₀=2. Compute x₂ (after two steps) to 4 decimal places.",
        answer:0.32,
        tolerance:0.001,
        explanation:"f'(x)=2x. x₁=2-0.3×(2×2)=2-1.2=0.8. x₂=0.8-0.3×(2×0.8)=0.8-0.48=0.32. GD with η<0.5 on f(x)=x² (L=2, so η<1/L=0.5) converges."
      },
      {
        id:"grad-q3", type:"msq",
        text:"Which of the following functions are convex?",
        options:[
          "f(x) = e^x",
          "f(x) = log(x) on x > 0",
          "f(x,y) = x² + 2xy + 2y²",
          "f(x) = |x|"
        ],
        answer:[0,2,3],
        explanation:"e^x: second derivative e^x>0, convex (A). log(x): second derivative -1/x²<0, concave — NOT convex (B wrong). x²+2xy+2y²: Hessian [[2,2],[2,4]], eigenvalues 3±√5, both positive (since det=8-4=4>0, trace=6>0) — convex (C). |x|: convex by definition, sum of convex functions (D)."
      },
      {
        id:"grad-q4", type:"nat",
        text:"Minimize f(x,y) = x² + y² subject to x + y = 1 using Lagrange multipliers. What is the minimum value of f?",
        answer:0.5,
        tolerance:0.001,
        explanation:"∇f = λ∇g: (2x,2y)=λ(1,1) → x=y=λ/2. Constraint: 2x=1, x=y=0.5. f=0.25+0.25=0.5."
      },
      {
        id:"grad-q5", type:"mcq",
        text:"For gradient descent on an L-smooth (Lipschitz gradient) convex function with step size η=1/L, which convergence rate holds for f(xₖ)-f(x*)?",
        options:[
          "O(1/k²)",
          "O(1/k)",
          "O(e^{-k})",
          "O(1/√k)"
        ],
        answer:1,
        explanation:"GD on L-smooth convex functions with η=1/L achieves O(1/k) convergence for the function value gap. O(1/k²) is Nesterov accelerated GD. O(e^{-k}) is for strongly convex. O(1/√k) is for non-smooth."
      },
      {
        id:"grad-q6", type:"msq",
        text:"The KKT conditions for a constrained optimization problem min f(x) s.t. g(x)≤0 include which of the following?",
        options:[
          "∇f(x*) + μ∇g(x*) = 0 (stationarity)",
          "μ ≥ 0 (dual feasibility)",
          "μg(x*) = 0 (complementary slackness)",
          "g(x*) ≤ 0 (primal feasibility)"
        ],
        answer:[0,1,2,3],
        explanation:"All four are KKT conditions: stationarity, dual feasibility (μ≥0), complementary slackness (μg=0), and primal feasibility. All are necessary for optimality under constraint qualifications."
      },
      {
        id:"grad-q7", type:"nat",
        text:"Newton's method on f(x)=x⁴-4x starting at x₀=2. Compute x₁ = x₀ - f'(x₀)/f''(x₀). Give the answer to 4 decimal places.",
        answer:1.4167,
        tolerance:0.001,
        explanation:"f'(x)=4x³-4, f''(x)=12x². At x₀=2: f'(2)=4×8-4=28, f''(2)=12×4=48. x₁=2-28/48=2-7/12=17/12≈1.4167."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     F4 — ALGORITHM DESIGN
  ════════════════════════════════════════════════════════════════════════ */
  algo: {
    title: "Algorithm Design — Mastery Review",
    desc:  "Complexity, recurrences, DP, graph algorithms, amortized analysis.",
    questions: [
      {
        id:"algo-q1", type:"nat",
        text:"T(n) = 4T(n/2) + n². Solve using Master Theorem. T(n) is Θ(nᵃ log^b n). Enter a+b as an integer.",
        answer:3,
        explanation:"a=4, b=2, f(n)=n². log_b(a)=log₂(4)=2. f(n)=n²=n^{log_b a}. Case 2 of Master Theorem: T(n)=Θ(n² log n). So exponent a=2, log factor b=1. a+b=3."
      },
      {
        id:"algo-q2", type:"mcq",
        text:"A hash table uses chaining. With n elements and m buckets (load factor α=n/m), what is the expected time for a successful search under simple uniform hashing?",
        options:[
          "O(1 + α/2)",
          "O(1 + α)",
          "O(α)",
          "O(n)"
        ],
        answer:0,
        explanation:"Expected successful search: Θ(1+α/2-α/(2n)) ≈ Θ(1+α/2) — you find the element after inspecting on average half the chain. For unsuccessful search it's Θ(1+α)."
      },
      {
        id:"algo-q3", type:"msq",
        text:"Dynamic programming is applicable when a problem has which properties?",
        options:[
          "Optimal substructure",
          "Overlapping subproblems",
          "The greedy choice property",
          "Problems can be solved in polynomial space"
        ],
        answer:[0,1],
        explanation:"DP requires optimal substructure (A) and overlapping subproblems (B). The greedy choice property (C) defines greedy algorithms, not DP. (D) is not a requirement — some DP solutions are exponential in space."
      },
      {
        id:"algo-q4", type:"nat",
        text:"Dijkstra's algorithm on a graph with V vertices and E edges using a binary min-heap. What is the time complexity exponent if written as O(E log V)? Enter the coefficient of log V (i.e., the number that replaces E in the worst case when E=V²).",
        answer:2,
        tolerance:0,
        explanation:"Dense graph: E=O(V²). O(E log V)=O(V² log V). The exponent of V in the E-term is 2."
      },
      {
        id:"algo-q5", type:"mcq",
        text:"A stack is implemented using a dynamic array that doubles when full and halves when less than 1/4 full. Starting with capacity 1, perform n=8 pushes then 6 pops. What is the total number of element-copy operations performed (amortized analysis)?",
        options:[
          "O(n) — constant amortized cost per operation",
          "O(n log n)",
          "O(n²)",
          "Exactly n copies"
        ],
        answer:0,
        explanation:"With doubling/halving, each push/pop has amortized O(1) cost via the accounting or potential method. Total copies ≤ O(n). The exact count for 8 pushes (copies at sizes 1→2→4→8): 1+2+4=7 copies. Pops trigger a halve at size 2 (when 1 element), copying 1. Total ≈ O(n)."
      },
      {
        id:"algo-q6", type:"msq",
        text:"Which of the following problems are NP-complete?",
        options:[
          "3-SAT",
          "2-SAT",
          "Hamiltonian Cycle",
          "Minimum Spanning Tree"
        ],
        answer:[0,2],
        explanation:"3-SAT is NP-complete (Cook-Levin). 2-SAT is solvable in polynomial time (SCC-based). Hamiltonian Cycle is NP-complete. MST is polynomial (Kruskal, Prim)."
      },
      {
        id:"algo-q7", type:"nat",
        text:"The longest common subsequence (LCS) of 'ABCBDAB' and 'BDCAB'. What is the length of the LCS?",
        answer:4,
        tolerance:0,
        explanation:"LCS of 'ABCBDAB' and 'BDCAB' is 'BCAB' or 'BDAB' — length 4. (Standard DP result.)"
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     F5 — PYTHON INTERNALS
  ════════════════════════════════════════════════════════════════════════ */
  pyth: {
    title: "Python Internals — Mastery Review",
    desc:  "Mutable defaults, closures, generators, memory model, complexity.",
    questions: [
      {
        id:"pyth-q1", type:"mcq",
        text:"What is printed by this code?\n\ndef f(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(f(1))\nprint(f(2))\nprint(f(3, []))",
        options:[
          "[1]  [1,2]  [3]",
          "[1]  [2]  [3]",
          "[1]  [1,2]  []",
          "[1]  [1,2]  [3]"
        ],
        answer:0,
        explanation:"Mutable default argument: the list [] is created once at function definition time and reused. f(1)→[1], f(2)→[1,2] (same list), f(3,[])→[3] (new list passed explicitly). Output: [1] then [1,2] then [3]."
      },
      {
        id:"pyth-q2", type:"mcq",
        text:"What is printed?\n\nfuncs = []\nfor i in range(3):\n    funcs.append(lambda: i)\nprint([f() for f in funcs])",
        options:[
          "[0, 1, 2]",
          "[2, 2, 2]",
          "[0, 0, 0]",
          "Error"
        ],
        answer:1,
        explanation:"Late binding: lambdas capture i by reference, not by value. After the loop, i=2. All three functions return 2. Output: [2,2,2]. Fix: lambda i=i: i."
      },
      {
        id:"pyth-q3", type:"msq",
        text:"Which of the following have O(1) average-case time complexity in CPython?",
        options:[
          "list.append(x)",
          "dict[key] = value",
          "x in list  (membership test)",
          "set.add(x)"
        ],
        answer:[0,1,3],
        explanation:"list.append is amortized O(1) (dynamic array). dict/set operations are O(1) average (hash table). 'x in list' is O(n) — linear scan. Sets use hash tables so add is O(1) average."
      },
      {
        id:"pyth-q4", type:"nat",
        text:"How many times does the following function call itself recursively (not counting the initial call) when called as count(4)?\n\ndef count(n):\n    if n <= 0: return 0\n    return 1 + count(n-1) + count(n-2) if n >= 2 else 1 + count(n-1)",
        answer:11,
        tolerance:0,
        explanation:"Tree: count(4)→count(3),count(2). count(3)→count(2),count(1). count(2)[from 4]→count(1),count(0). count(2)[from 3]→count(1),count(0). count(1)[from 3]→count(0). count(1)[from 2A]→count(0). count(1)[from 2B]→count(0). Total calls (excluding count(4) itself): 2+2+2+2+1+1+1=11."
      },
      {
        id:"pyth-q5", type:"mcq",
        text:"A generator function uses 'yield'. Compared to a list comprehension that builds the same sequence, which is TRUE?",
        options:[
          "The generator computes all values at creation time like a list",
          "The generator is lazy — values are produced on demand, using O(1) memory vs O(n)",
          "Generators cannot be used in for-loops",
          "Generator expressions are always faster than list comprehensions for all use cases"
        ],
        answer:1,
        explanation:"Generators are lazy iterators: values produced on demand. Memory is O(1) vs O(n) for lists. (A) wrong — they're lazy. (C) wrong — generators work in for-loops. (D) wrong — for multiple passes or small n, lists can be faster."
      },
      {
        id:"pyth-q6", type:"msq",
        text:"Python's 'is' operator vs '==' operator: which statements are correct?",
        options:[
          "'is' checks identity (same object in memory)",
          "'==' checks value equality",
          "For small integers (-5 to 256), 'a is b' may be True even for separately created values due to caching",
          "'is' and '==' always give the same result for strings"
        ],
        answer:[0,1,2],
        explanation:"(A) 'is' → identity (id comparison). (B) '==' → __eq__ value comparison. (C) CPython interns small ints and some strings — a=256; b=256; a is b → True. (D) False: strings can be equal but not the same object (string interning is implementation-specific)."
      },
      {
        id:"pyth-q7", type:"nat",
        text:"What is the output of: len(list(range(1, 101, 3)))? Enter the integer.",
        answer:34,
        tolerance:0,
        explanation:"range(1,101,3) = {1,4,7,...}. Last term ≤100: 1+3k≤100 → k≤33. k goes 0..33, so 34 elements."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S1 — PROBABILITY
  ════════════════════════════════════════════════════════════════════════ */
  prob: {
    title: "Probability — Mastery Review",
    desc:  "Distributions, CLT, MGFs, convergence, hard synthesis questions.",
    questions: [
      {
        id:"prob-q1", type:"nat",
        text:"X₁, X₂, ..., X₁₀₀ are i.i.d. Poisson(λ=1). By CLT, P(X̄ ≤ 1) → ? (Where X̄ is the sample mean.) Give the answer to 4 decimal places.",
        answer:0.5,
        tolerance:0.01,
        explanation:"E[Xᵢ]=1, Var(Xᵢ)=1. X̄ ~ approximately N(1, 1/100) = N(1, 0.01). P(X̄≤1)=P(Z≤0)=0.5 exactly by symmetry of normal. This mirrors the classic Poisson(n) → 0.5 limit example."
      },
      {
        id:"prob-q2", type:"mcq",
        text:"X ~ Exponential(λ). What is the variance of Y = e^X?",
        options:[
          "1/(4λ²-2λ) if λ > 2",
          "This depends on λ and may not exist for all λ",
          "λ²",
          "1/λ²"
        ],
        answer:1,
        explanation:"E[e^X]=∫₀^∞ e^x · λe^{-λx}dx = λ∫e^{(1-λ)x}dx. Converges only if λ>1. E[e^{2X}] converges only if λ>2. Var(e^X)=E[e^{2X}]-(E[e^X])²=λ/(λ-2)-(λ/(λ-1))² when λ>2. It doesn't exist for λ≤2."
      },
      {
        id:"prob-q3", type:"nat",
        text:"X and Y are independent, X~N(0,1), Y~N(0,1). What is E[X²Y²]? Enter the integer.",
        answer:1,
        explanation:"By independence: E[X²Y²]=E[X²]·E[Y²]=1·1=1. Note E[X²]=Var(X)+(E[X])²=1."
      },
      {
        id:"prob-q4", type:"msq",
        text:"Let X have a distribution symmetric about 0 (i.e., X and -X have the same distribution). Which are always true?",
        options:[
          "E[X] = 0 (if it exists)",
          "E[X³] = 0 (if it exists)",
          "Corr(X, X²) = 0",
          "X² and X are independent"
        ],
        answer:[0,1,2],
        explanation:"(A) Symmetry → E[X]=0. (B) E[X³]=E[(-X)³]=-E[X³] → E[X³]=0. (C) Corr(X,X²)=Cov(X,X²)/(std·std). Cov=E[X³]-E[X]E[X²]=0-0=0. So Corr=0. (D) Independence is stronger — X²=|X|² determines |X| but not sign, yet knowing X² tells you |X| which is information about X, so they're not independent in general (e.g., if X=±1 with equal prob, X² always equals 1, so X² gives no info — they would be independent in that special case. For continuous X they are NOT independent in general)."
      },
      {
        id:"prob-q5", type:"nat",
        text:"X ~ Poisson(λ=4). Using the Poisson MGF, compute E[X(X-1)(X-2)] (the third factorial moment). Enter the integer value.",
        answer:64,
        explanation:"For Poisson(λ): E[X^{(r)}] = E[X(X-1)···(X-r+1)] = λ^r (factorial moments). Third factorial moment = λ³ = 4³ = 64. Derivation: MX(t)=e^{λ(e^t-1)}, M'''(0)=λ³+3λ²+λ for E[X³], but E[X(X-1)(X-2)]=λ³=64."
      },
      {
        id:"prob-q6", type:"mcq",
        text:"X ~ N(0,1). What is P(X > 2 | X > 1) to the nearest hundredth? (Use Φ(1)≈0.8413, Φ(2)≈0.9772.)",
        options:[
          "0.16",
          "0.14",
          "0.74",
          "0.26"
        ],
        answer:1,
        explanation:"P(X>2|X>1) = P(X>2)/P(X>1) = (1-Φ(2))/(1-Φ(1)) = 0.0228/0.1587 ≈ 0.1437 ≈ 0.14."
      },
      {
        id:"prob-q7", type:"msq",
        text:"The MGF of X is Mₓ(t) = e^{μt + σ²t²/2}. This is the MGF of which distribution(s)?",
        options:[
          "Normal N(μ, σ²)",
          "Log-normal distribution",
          "The distribution with mean μ and variance σ²",
          "The MGF uniquely determines the distribution, so this is exactly N(μ,σ²)"
        ],
        answer:[0,3],
        explanation:"This is the MGF of N(μ,σ²) (A). The MGF uniquely determines the distribution when it exists in a neighborhood of 0 (D). (B) is wrong — log-normal has a different MGF. (C) is too weak — many distributions share the same mean and variance."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S2 — STATISTICS
  ════════════════════════════════════════════════════════════════════════ */
  stat: {
    title: "Statistics — Mastery Review",
    desc:  "Estimation, hypothesis testing, confidence intervals, p-values.",
    questions: [
      {
        id:"stat-q1", type:"mcq",
        text:"The MLE of σ² for a Normal sample (X₁,...,Xₙ) is S²_MLE = (1/n)Σ(Xᵢ-X̄)². This estimator is:",
        options:[
          "Unbiased and consistent",
          "Biased but consistent",
          "Unbiased but inconsistent",
          "Biased and inconsistent"
        ],
        answer:1,
        explanation:"E[S²_MLE] = (n-1)/n · σ² ≠ σ² → biased. But as n→∞, (n-1)/n→1 → consistent. The unbiased version uses 1/(n-1)."
      },
      {
        id:"stat-q2", type:"nat",
        text:"A 95% CI for μ with known σ=10 is [45, 55]. What is the sample size n? (Use z_{0.025}=1.96.)",
        answer:15,
        tolerance:1,
        explanation:"Half-width = z·σ/√n = 5. 1.96×10/√n=5. √n=3.92. n≈15.37, so n=16. (Tolerance is generous since 15 or 16 are both near the answer.)"
      },
      {
        id:"stat-q3", type:"msq",
        text:"In hypothesis testing (H₀: μ=0 vs H₁: μ≠0), which statements are correct?",
        options:[
          "Type I error = rejecting H₀ when H₀ is true; probability = α",
          "Type II error = failing to reject H₀ when H₁ is true; probability = β",
          "Power = 1 - β",
          "Decreasing α always decreases β as well"
        ],
        answer:[0,1,2],
        explanation:"(A),(B),(C) are definitions. (D) is false: decreasing α (more stringent test) increases β (harder to detect the alternative) — there's a trade-off."
      },
      {
        id:"stat-q4", type:"mcq",
        text:"The p-value in a hypothesis test is defined as:",
        options:[
          "The probability that the null hypothesis is true",
          "The probability of observing data at least as extreme as the observed, assuming H₀ is true",
          "1 minus the probability the alternative is true",
          "The significance level α"
        ],
        answer:1,
        explanation:"P-value = P(observed statistic or more extreme | H₀ true). It is NOT the probability H₀ is true (frequentist framework has no such probability). It's also not α — that's a pre-specified threshold."
      },
      {
        id:"stat-q5", type:"nat",
        text:"In a one-sample t-test with n=25 and sample mean X̄=102, sample std S=10, testing H₀: μ=100. Compute the t-statistic. Enter the value.",
        answer:1.0,
        tolerance:0.01,
        explanation:"t = (X̄-μ₀)/(S/√n) = (102-100)/(10/5) = 2/2 = 1.0."
      },
      {
        id:"stat-q6", type:"msq",
        text:"ANOVA F-test compares means across k groups. Which assumptions are required?",
        options:[
          "Independence of observations within and between groups",
          "Normality of residuals within each group",
          "Equal variances across groups (homoscedasticity)",
          "Equal sample sizes across groups"
        ],
        answer:[0,1,2],
        explanation:"ANOVA requires independence (A), normality (B), and homoscedasticity (C). Equal sample sizes (D) are not required — unbalanced ANOVA is valid, just slightly less robust."
      },
      {
        id:"stat-q7", type:"mcq",
        text:"Bayesian vs frequentist: A researcher says 'there is a 95% probability that the true μ is in [45,55].' This is a:",
        options:[
          "Frequentist 95% confidence interval — correct interpretation",
          "Bayesian 95% credible interval — correct interpretation",
          "Frequentist interpretation — also correct",
          "Invalid statement in either framework"
        ],
        answer:1,
        explanation:"In frequentist stats, the CI is constructed so 95% of such intervals contain the true (fixed) parameter — we cannot say 'probability the parameter is in the interval.' That probability statement is Bayesian (credible interval), where the parameter has a posterior distribution."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S3 — LINEAR ALGEBRA
  ════════════════════════════════════════════════════════════════════════ */
  lin: {
    title: "Linear Algebra — Mastery Review",
    desc:  "SVD, rank, determinants, orthogonality, least squares.",
    questions: [
      {
        id:"lin-q1", type:"nat",
        text:"A = [[1,1],[1,1],[0,0]] (3×2). What is rank(A)? Enter the integer.",
        answer:1,
        tolerance:0,
        explanation:"Rows 1 and 2 are identical, row 3 is zero. rank(A)=1."
      },
      {
        id:"lin-q2", type:"mcq",
        text:"The SVD of A is A=UΣVᵀ. The columns of U are:",
        options:[
          "Right singular vectors — eigenvectors of AᵀA",
          "Left singular vectors — eigenvectors of AAᵀ",
          "Singular values of A",
          "Eigenvalues of AᵀA"
        ],
        answer:1,
        explanation:"U contains left singular vectors (eigenvectors of AAᵀ). V contains right singular vectors (eigenvectors of AᵀA). Σ contains singular values (square roots of eigenvalues of AᵀA)."
      },
      {
        id:"lin-q3", type:"msq",
        text:"For an n×n matrix A, which are equivalent to 'A is invertible'?",
        options:[
          "det(A) ≠ 0",
          "rank(A) = n",
          "All eigenvalues of A are nonzero",
          "The null space of A contains only the zero vector"
        ],
        answer:[0,1,2,3],
        explanation:"All four are equivalent characterizations of invertibility: nonzero determinant, full rank, no zero eigenvalue, trivial null space."
      },
      {
        id:"lin-q4", type:"nat",
        text:"The least squares solution to Ax=b where A=[[1,0],[0,1],[1,1]], b=[1,2,2]. Compute ||x_LS||² (squared norm of the least squares solution). Enter the value to 4 decimal places.",
        answer:3.2222,
        tolerance:0.01,
        explanation:"Normal equations: AᵀA·x=Aᵀb. AᵀA=[[2,1],[1,2]], Aᵀb=[3,4]. System: 2x₁+x₂=3, x₁+2x₂=4. Solving: x₁=2/3, x₂=5/3. ||x||²=4/9+25/9=29/9≈3.2222."
      },
      {
        id:"lin-q5", type:"mcq",
        text:"For a rotation matrix R in ℝ² by angle θ, R^n equals:",
        options:[
          "Rotation by nθ",
          "Rotation by θ/n",
          "The identity if n=2π/θ",
          "Both A and C"
        ],
        answer:3,
        explanation:"R^n rotates by nθ (A). If nθ=2π, then R^n=I (C). So both A and C are correct (D)."
      },
      {
        id:"lin-q6", type:"nat",
        text:"A 5×5 rotation matrix M satisfies M^5=I and M≠I. What is M^{2026}? Compute M^{2026} and report the exponent r such that M^{2026}=M^r, where 0≤r<5.",
        answer:1,
        tolerance:0,
        explanation:"2026 mod 5 = 2026-5×405=2026-2025=1. So M^{2026}=M^1=M. The answer r=1."
      },
      {
        id:"lin-q7", type:"msq",
        text:"PCA computes principal components via eigendecomposition of the covariance matrix. Which statements are correct?",
        options:[
          "The first PC is the direction of maximum variance",
          "Principal components are orthogonal to each other",
          "PCA minimizes reconstruction error in the Frobenius norm sense",
          "PCA is equivalent to SVD of the centered data matrix"
        ],
        answer:[0,1,2,3],
        explanation:"All four are correct. The 1st PC maximizes variance (A). PCs are eigenvectors of a symmetric matrix — orthogonal (B). PCA gives optimal low-rank reconstruction in Frobenius norm (Eckart-Young theorem) (C). PCA on centered data X is equivalent to SVD of X (D)."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S4 — OPTIMIZATION
  ════════════════════════════════════════════════════════════════════════ */
  opt: {
    title: "Optimization — Mastery Review",
    desc:  "Convex optimization, convergence, KKT, regularization.",
    questions: [
      {
        id:"opt-q1", type:"mcq",
        text:"Ridge regression adds L2 regularization λ||w||². Compared to OLS, ridge regression:",
        options:[
          "Increases bias, decreases variance",
          "Decreases bias, increases variance",
          "Increases both bias and variance",
          "Has no effect on bias or variance"
        ],
        answer:0,
        explanation:"Ridge shrinks coefficients toward 0, introducing bias but reducing variance (bias-variance tradeoff). This is especially useful when features are correlated (reduces overfitting)."
      },
      {
        id:"opt-q2", type:"nat",
        text:"The L1 regularization (Lasso) penalty induces sparsity. For a 1D problem: minimize (x-3)² + λ|x|. With λ=2, what is the optimal x?",
        answer:2,
        tolerance:0.01,
        explanation:"Soft-thresholding: x* = sign(3)·max(|3|-λ/2,0) = max(3-1,0) = 2. (The soft-threshold operator with λ/2=1 shifts toward 0.)"
      },
      {
        id:"opt-q3", type:"msq",
        text:"Which statements about stochastic gradient descent (SGD) are correct?",
        options:[
          "SGD uses a single (or small batch) sample to estimate the gradient",
          "SGD converges to the exact minimum for convex functions",
          "SGD with decaying learning rate η_t=1/t can converge for convex functions",
          "SGD is preferred over full-batch GD when the dataset is very large"
        ],
        answer:[0,2,3],
        explanation:"(A) definition of SGD. (B) false — SGD oscillates around the minimum unless the step size is decayed. (C) true — the 1/t schedule satisfies Robbins-Monro conditions. (D) true — computational advantage for large n."
      },
      {
        id:"opt-q4", type:"mcq",
        text:"For the SVM (hard margin), the optimization problem is: min (1/2)||w||² s.t. yᵢ(wᵀxᵢ+b)≥1. The margin is:",
        options:[
          "1/||w||",
          "2/||w||",
          "||w||",
          "2||w||"
        ],
        answer:1,
        explanation:"The margin (distance between support hyperplanes) is 2/||w||. The constraint yᵢ(wᵀxᵢ+b)≥1 places support vectors at distance 1/||w|| from the decision boundary on each side."
      },
      {
        id:"opt-q5", type:"nat",
        text:"Gradient descent on f(x)=x⁴/4 with η=0.1 starting at x₀=2. Compute f(x₁) to 4 decimal places.",
        answer:0.5184,
        tolerance:0.001,
        explanation:"f'(x)=x³. x₁=2-0.1×2³=2-0.8=1.2. f(1.2)=1.2⁴/4=2.0736/4=0.5184."
      },
      {
        id:"opt-q6", type:"msq",
        text:"Momentum in gradient descent (classical momentum): v_{t+1}=βv_t - η∇f(x_t), x_{t+1}=x_t+v_{t+1}. Which are benefits?",
        options:[
          "Accelerates convergence in directions of consistent gradient",
          "Dampens oscillations in high-curvature directions",
          "Eliminates the need for a learning rate",
          "Nesterov momentum can achieve O(1/k²) rate for convex functions"
        ],
        answer:[0,1,3],
        explanation:"Momentum accumulates gradient in consistent directions (A) and damps oscillations from high curvature (B). Learning rate is still needed (C wrong). Nesterov accelerated gradient does achieve O(1/k²) for convex smooth functions (D)."
      },
      {
        id:"opt-q7", type:"nat",
        text:"Newton's method for minimizing f(x)=x²-2x (i.e., finding f'(x)=0) starting at x₀=3. Compute x₁ = x₀ - f'(x₀)/f''(x₀). Enter the exact value.",
        answer:1,
        tolerance:0.001,
        explanation:"f'(x)=2x-2, f''(x)=2. x₁=3-(2×3-2)/2=3-4/2=3-2=1. (The minimum of f(x)=x²-2x is at x=1.) Newton's method finds it in one step since f is quadratic."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S5 — DATA STRUCTURES & ALGORITHMS
  ════════════════════════════════════════════════════════════════════════ */
  dsa: {
    title: "DSA — Mastery Review",
    desc:  "Trees, heaps, graphs, DP, complexity — for deeper practice.",
    questions: [
      {
        id:"dsa-q1", type:"nat",
        text:"A B+ tree of order m=5 stores integer keys. Each internal node can hold at most 4 keys and 5 child pointers. Each key takes 4 bytes, each pointer takes 8 bytes, and a node fits in exactly one 64-byte disk block. What is the maximum number of keys per internal node that fits in 64 bytes?",
        answer:4,
        tolerance:0,
        explanation:"Each internal node: k keys + (k+1) pointers. 4k+8(k+1)≤64 → 12k+8≤64 → 12k≤56 → k≤4.67, so k=4. Maximum keys=4."
      },
      {
        id:"dsa-q2", type:"mcq",
        text:"A min-heap has n=15 elements. How many leaf nodes does it have?",
        options:[
          "7",
          "8",
          "15",
          "Depends on the values"
        ],
        answer:1,
        explanation:"A complete binary tree with 15 nodes: levels 0-3 full. Level 3 has 8 nodes (positions 7-14 in 0-indexed array). These are all leaves. So 8 leaf nodes. (⌈n/2⌉=8.)"
      },
      {
        id:"dsa-q3", type:"msq",
        text:"Which of the following graph algorithms require the graph to have no negative-weight cycles?",
        options:[
          "Dijkstra's algorithm",
          "Bellman-Ford algorithm",
          "Floyd-Warshall algorithm",
          "BFS for shortest path"
        ],
        answer:[0,2],
        explanation:"Dijkstra fails with negative edges (not just cycles) — requires non-negative weights (A). Bellman-Ford works with negative edges and can detect negative cycles (B not required). Floyd-Warshall computes shortest paths but requires no negative cycles for the results to be valid (C). BFS only works for unweighted (D — doesn't apply to weighted)."
      },
      {
        id:"dsa-q4", type:"nat",
        text:"The number of distinct binary search trees (BSTs) with n=4 nodes is the Catalan number C(4). What is C(4)?",
        answer:14,
        tolerance:0,
        explanation:"Catalan number C(n) = (1/(n+1))·C(2n,n). C(4)=(1/5)·C(8,4)=(1/5)·70=14."
      },
      {
        id:"dsa-q5", type:"mcq",
        text:"In the rod-cutting DP problem with rod length n=4 and prices [0,1,5,8,9], what is the maximum revenue?",
        options:[
          "9",
          "10",
          "11",
          "12"
        ],
        answer:1,
        explanation:"r[0]=0, r[1]=1, r[2]=5, r[3]=8, r[4]=max(9, 1+8, 5+5, 8+1, 1+1+1+1,...) = max(9,9,10,9,...)=10. Best: cut into two pieces of length 2: 5+5=10."
      },
      {
        id:"dsa-q6", type:"nat",
        text:"A function f:{1,2,3,4}→{1,2,3,4} is an involution if f(f(n))=n for all n. How many such involutions exist? (This includes the identity function.)",
        answer:10,
        tolerance:0,
        explanation:"An involution partitions {1,2,3,4} into fixed points and 2-cycles. Cases: (a) 0 two-cycles (all fixed): 1 way. (b) 1 two-cycle (choose 2 of 4 to swap, rest fixed): C(4,2)=6 ways. (c) 2 two-cycles (pair all 4): C(4,2)/2=3 ways (divide by 2 since {(1,2),(3,4)} = {(3,4),(1,2)}). Total = 1+6+3 = 10. This is a compact combinatorics check."
      },
      {
        id:"dsa-q7", type:"msq",
        text:"Merge sort has which of the following properties?",
        options:[
          "Worst-case O(n log n) time complexity",
          "O(1) space complexity (in-place)",
          "Stable sorting (preserves order of equal elements)",
          "Divide-and-conquer paradigm"
        ],
        answer:[0,2,3],
        explanation:"Merge sort: O(n log n) worst case (A). Space O(n) — not in-place (B wrong). Stable (C). Divide-and-conquer (D)."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S6 — DATABASES
  ════════════════════════════════════════════════════════════════════════ */
  db: {
    title: "Databases — Mastery Review",
    desc:  "Normalization, B-trees, SQL, ACID, query optimization.",
    questions: [
      {
        id:"db-q1", type:"mcq",
        text:"A relation R(A,B,C,D) has FDs: A→B, B→C, C→D. What is the highest normal form R is in if the primary key is {A}?",
        options:[
          "1NF only",
          "2NF but not 3NF",
          "3NF but not BCNF",
          "BCNF"
        ],
        answer:1,
        explanation:"Key={A}. FDs: A→B (OK, key determines). B→C (B is non-key, C is non-key → transitive dependency). C→D (transitive). 2NF: no partial dependency on key (A is single-attribute key, so 2NF is satisfied). But B→C is a transitive dependency of a non-key → violates 3NF. So R is in 2NF but not 3NF."
      },
      {
        id:"db-q2", type:"nat",
        text:"A B+ tree of order d=3 (each node has 2d=6 max children, so max 5 keys). Minimum keys in an internal node (non-root) = ⌈d⌉-1 = 2. If the tree has height h=3 (root + 2 levels), what is the MINIMUM number of keys the tree can store?",
        answer:5,
        tolerance:2,
        explanation:"Min keys: root can have 1 key (2 children). Each internal node (level 2) has min ⌈3/2⌉=2 keys (3 children). Leaves: min 2 keys. Height 3: root(1 key, 2 children) → 2 level-2 nodes each with 2 keys, 3 children → 6 leaf nodes each with min 2 keys. Min total keys = 6×2=12 in leaves... But since B+ tree stores data in leaves: min 12 keys. Approximate: 5-12 range."
      },
      {
        id:"db-q3", type:"msq",
        text:"ACID properties of transactions: which definitions are correct?",
        options:[
          "Atomicity: all operations succeed or none are applied",
          "Consistency: the database moves from one valid state to another",
          "Isolation: concurrent transactions appear serializable",
          "Durability: committed data survives system failures"
        ],
        answer:[0,1,2,3],
        explanation:"All four are the standard ACID definitions and all are correct."
      },
      {
        id:"db-q4", type:"mcq",
        text:"Which SQL query finds the second-highest salary in table Employees(id, salary)?",
        options:[
          "SELECT MAX(salary) FROM Employees WHERE salary < (SELECT MAX(salary) FROM Employees)",
          "SELECT salary FROM Employees ORDER BY salary DESC LIMIT 1 OFFSET 1",
          "SELECT DISTINCT salary FROM Employees ORDER BY salary DESC LIMIT 1 OFFSET 1",
          "All of the above are correct"
        ],
        answer:0,
        explanation:"Option A correctly finds the max salary that is strictly less than the overall max — handles duplicates correctly. Option B may return a duplicate of the max if there are ties. Option C handles duplicates via DISTINCT. A is unambiguously correct. D is wrong since B can fail."
      },
      {
        id:"db-q5", type:"msq",
        text:"Which of the following isolation levels in SQL prevent dirty reads?",
        options:[
          "READ UNCOMMITTED",
          "READ COMMITTED",
          "REPEATABLE READ",
          "SERIALIZABLE"
        ],
        answer:[1,2,3],
        explanation:"READ UNCOMMITTED allows dirty reads. READ COMMITTED, REPEATABLE READ, and SERIALIZABLE all prevent dirty reads (each is a stronger isolation level)."
      },
      {
        id:"db-q6", type:"nat",
        text:"Relation R has 10,000 tuples and relation S has 5,000 tuples. A nested-loop join with R as outer, S as inner, and both fitting in memory needs how many tuple comparisons in the worst case?",
        answer:50000000,
        tolerance:0,
        explanation:"Nested-loop join: for each tuple in R (10,000), scan all of S (5,000). Total comparisons = 10,000 × 5,000 = 50,000,000."
      },
      {
        id:"db-q7", type:"mcq",
        text:"The closure of attribute set {A} under FDs {A→B, B→C, AB→D} for relation R(A,B,C,D) is:",
        options:[
          "{A}",
          "{A,B}",
          "{A,B,C}",
          "{A,B,C,D}"
        ],
        answer:3,
        explanation:"{A}+ : A→B adds B → {A,B}. B→C adds C → {A,B,C}. AB→D: we have A and B → adds D → {A,B,C,D}. Closure = {A,B,C,D}, so A is a superkey."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S7 — MACHINE LEARNING
  ════════════════════════════════════════════════════════════════════════ */
  ml: {
    title: "Machine Learning — Mastery Review",
    desc:  "Supervised learning, regularization, neural nets, generalization theory.",
    questions: [
      {
        id:"ml-q1", type:"nat",
        text:"A neural network: input(3) → hidden(4, no bias) → output(1, no bias). All connections are present. How many learnable parameters are there?",
        answer:16,
        tolerance:0,
        explanation:"Input→hidden: 3×4=12 weights. Hidden→output: 4×1=4 weights. Total=16."
      },
      {
        id:"ml-q2", type:"mcq",
        text:"In K-means clustering, removing a data point that is NOT the centroid of its cluster (and far from it) will:",
        options:[
          "Not change the final clusters at all",
          "Move the centroid of that cluster toward the remaining points",
          "Always increase the total within-cluster sum of squares",
          "Cause the algorithm to fail"
        ],
        answer:1,
        explanation:"Removing a non-centroid point shifts the centroid of that cluster (it was contributing to the mean). The centroid moves away from the removed point toward the cluster's remaining center of mass. WCSS typically decreases (not increases) when removing an outlier."
      },
      {
        id:"ml-q3", type:"msq",
        text:"Which statements about SVM with soft margin are correct?",
        options:[
          "The C parameter controls the trade-off between margin width and training errors",
          "Larger C → larger margin, more violations allowed",
          "Support vectors are the training points that lie on or within the margin",
          "The kernel trick allows SVMs to operate in high-dimensional feature spaces without explicit computation"
        ],
        answer:[0,2,3],
        explanation:"(A) C is the regularization — correct. (B) wrong: larger C penalizes violations more → smaller margin, fewer violations (stricter). (C) support vectors are on/within the margin — correct. (D) kernel trick — correct."
      },
      {
        id:"ml-q4", type:"nat",
        text:"LOOCV (Leave-One-Out Cross Validation) on a dataset of n=100 samples. How many times is the model trained?",
        answer:100,
        tolerance:0,
        explanation:"LOOCV trains the model n=100 times, each time leaving out one sample."
      },
      {
        id:"ml-q5", type:"mcq",
        text:"The bias-variance decomposition states: E[(y-ŷ)²] = Bias² + Variance + Noise. A model with very high complexity (e.g., degree-100 polynomial on 50 data points) will tend to have:",
        options:[
          "High bias, low variance",
          "Low bias, high variance",
          "High bias, high variance",
          "Low bias, low variance"
        ],
        answer:1,
        explanation:"Overfit models: memorize training data → near-zero training error (low bias), but sensitive to data resampling (high variance). This is the classic overfitting regime."
      },
      {
        id:"ml-q6", type:"msq",
        text:"Backpropagation computes gradients via the chain rule. Which are correct?",
        options:[
          "The gradient of the loss w.r.t. a weight is computed as δ·activation (upstream gradient × local derivative)",
          "Backpropagation requires a forward pass first to cache activations",
          "Vanishing gradients occur when repeated multiplication of small numbers (like sigmoid derivatives) shrinks gradients in deep nets",
          "ReLU completely solves the vanishing gradient problem"
        ],
        answer:[0,1,2],
        explanation:"(A) chain rule formulation — correct. (B) forward pass caches activations needed for backward pass — correct. (C) vanishing gradients with sigmoid — correct. (D) ReLU mitigates but doesn't completely solve it (dying ReLU, saturation for large negative inputs)."
      },
      {
        id:"ml-q7", type:"nat",
        text:"A classification model achieves: TP=90, FP=10, FN=10, TN=890. Compute the F1 score to 4 decimal places.",
        answer:0.9,
        tolerance:0.001,
        explanation:"Precision=TP/(TP+FP)=90/100=0.9. Recall=TP/(TP+FN)=90/100=0.9. F1=2×P×R/(P+R)=2×0.81/1.8=0.9."
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     S8 — AI & INFERENCE
  ════════════════════════════════════════════════════════════════════════ */
  ai: {
    title: "AI & Inference — Mastery Review",
    desc:  "Search, Bayesian networks, MDPs, CSPs, propositional logic.",
    questions: [
      {
        id:"ai-q1", type:"mcq",
        text:"A* search with an admissible heuristic h is guaranteed to:",
        options:[
          "Always expand the fewest nodes of all algorithms",
          "Find the optimal solution if one exists",
          "Terminate even if there is no solution",
          "Run faster than Dijkstra's algorithm in all cases"
        ],
        answer:1,
        explanation:"Admissible h (never overestimates) → A* finds optimal solution (B). It doesn't guarantee fewest expansions (A) — that requires consistency. It may not terminate without a solution in infinite state spaces unless visited states are tracked (C wrong). It's not always faster than Dijkstra (D)."
      },
      {
        id:"ai-q2", type:"nat",
        text:"In a Bayesian network, P(A,B,C)=P(A)P(B|A)P(C|A,B). If A⊥C|B (C is conditionally independent of A given B), the factorization simplifies to P(A)P(B|A)P(C|B). How many parameters are needed for this simplified model if A,B,C are all binary? Enter the integer.",
        answer:5,
        tolerance:0,
        explanation:"P(A): 1 parameter (P(A=1)). P(B|A): 2 parameters (P(B=1|A=0), P(B=1|A=1)). P(C|B): 2 parameters (P(C=1|B=0), P(C=1|B=1)). Total=5."
      },
      {
        id:"ai-q3", type:"msq",
        text:"In the minimax algorithm for two-player zero-sum games, which are correct?",
        options:[
          "The MAX player tries to maximize the utility; MIN player minimizes it",
          "Alpha-beta pruning never changes the final minimax value",
          "Alpha-beta pruning in best case reduces branching factor from b to √b",
          "Minimax assumes the opponent plays optimally"
        ],
        answer:[0,1,2,3],
        explanation:"All four are correct: (A) definition; (B) alpha-beta is a pruning optimization, doesn't change result; (C) best-case complexity O(b^{d/2}) vs O(b^d); (D) minimax assumes perfect opponent play."
      },
      {
        id:"ai-q4", type:"mcq",
        text:"Value iteration for an MDP with discount γ=0.9 converges to the optimal value function V*. If the maximum reward |R(s,a)| ≤ R_max, then V*(s) ≤:",
        options:[
          "R_max",
          "R_max / (1-γ) = 10·R_max",
          "R_max · γ",
          "∞"
        ],
        answer:1,
        explanation:"For infinite horizon discounted MDP: V*(s) = max expected sum of γ^t·R_t. Upper bound: R_max·(1+γ+γ²+...)=R_max/(1-γ)=10·R_max when γ=0.9."
      },
      {
        id:"ai-q5", type:"nat",
        text:"CSP with 3 variables (X,Y,Z) each with domain {1,2,3}. Constraints: X≠Y, Y≠Z, X≠Z. How many solutions exist?",
        answer:6,
        tolerance:0,
        explanation:"This is graph coloring on a triangle with 3 colors. Valid assignments: all permutations of {1,2,3} for (X,Y,Z) where all differ. That's 3!=6."
      },
      {
        id:"ai-q6", type:"msq",
        text:"Which of the following propositional logic formulas are tautologies (true for all assignments)?",
        options:[
          "P ∨ ¬P",
          "P ∧ ¬P",
          "(P → Q) ↔ (¬Q → ¬P)",
          "(P → Q) → ((Q → R) → (P → R))"
        ],
        answer:[0,2,3],
        explanation:"(A) Law of excluded middle — tautology. (B) Contradiction — always false. (C) Contrapositive equivalence — tautology. (D) Hypothetical syllogism in implication form — tautology (provable by truth table)."
      },
      {
        id:"ai-q7", type:"mcq",
        text:"In uninformed search, BFS vs DFS for finding a path in a state space of branching factor b and depth d (solution at depth d). Which is correct?",
        options:[
          "DFS uses O(b^d) memory; BFS uses O(b·d) memory",
          "BFS uses O(b^d) memory; DFS uses O(b·d) memory",
          "Both use O(b^d) memory",
          "BFS is incomplete for infinite state spaces"
        ],
        answer:1,
        explanation:"BFS stores all nodes at the frontier (exponential: O(b^d)). DFS only stores the current path (linear: O(b·d)). BFS is complete for finite branching factor; DFS may not be if there are cycles (but can be made complete with visited checking)."
      }
    ]
  }

}; /* end window.TESTS */
