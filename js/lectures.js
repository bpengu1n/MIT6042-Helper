/* ========================= lecture content ========================= */
const LECTURES=[
{id:1,title:'Introduction and Proofs',short:'Proofs',prereqs:[],steps:[
 {kind:'Idea',title:'A proposition is a statement that is simply true or false',html:`
  <p>Mathematics for computer science starts somewhere unglamorous: deciding what counts as a claim, and what counts as having established one. A <em class="v">proposition</em> is a statement with a definite truth value. “There are infinitely many primes” is a proposition. “Sort the array quickly” is not.</p>
  <p>Testing can be persuasive—and still miss the one case that matters. Consider the polynomial <span class="m">p(n) = n² + n + 41</span>. At n = 0, 1, 2, … it gives 41, 43, 47, 53, 61, 71 — all prime. In fact, it keeps producing primes through n = 39. At n = 40, though, it gives <span class="m">40² + 40 + 41 = 41²</span>, which is not prime.</p>
  <p>Those forty examples are useful evidence for a conjecture. They are not a proof, because the claim is about every allowed input. Proof is the tool that closes that gap.</p>
  <span class="blk"><span class="lbl">The shape of most claims</span>
  Almost everything you will prove has the form <span class="m">∀n. P(n) ⇒ Q(n)</span>: for all n, if the hypothesis holds then so does the conclusion. Knowing precisely when such a statement is false — and it is false in exactly one circumstance — is most of the battle.</span>`},
 {kind:'Example',title:'√2 is irrational',html:`
  <p>A proof by contradiction assumes the opposite of what you want and derives something impossible. Here is the classic.</p>
  <span class="blk"><span class="lbl">Theorem</span> <span class="m">√2</span> is irrational.</span>
  <p><span class="step-n">Proof.</span> Suppose not — suppose <span class="m">√2 = a/b</span> for integers a and b. Any fraction can be put in lowest terms, so assume a and b share no common factor. Squaring and rearranging gives <span class="m">a² = 2b²</span>.</p>
  <p>So a² is even. An odd number squared is odd, so a itself must be even: write <span class="m">a = 2c</span>. Substituting, <span class="m">4c² = 2b²</span>, hence <span class="m">b² = 2c²</span>, and by the same argument b is even too.</p>
  <p>But now a and b are both even, contradicting the assumption that they share no common factor. The original supposition fails, so <span class="m">√2</span> cannot be written as a ratio of integers. <span class="qed">∎</span></p>
  <p>Notice how much work the phrase “in lowest terms” is doing. Strip that line out and the argument produces no contradiction at all — it just keeps halving forever. Proofs fail at their quiet assumptions far more often than at their loud ones.</p>`},
 {kind:'Try it',title:'Find the row where an implication breaks',widget:'implication',html:`
  <p>Take the claim “if n is divisible by 4 then n is even.” Flip the two truth values below and watch what the implication does. It fails in just one row: the hypothesis is true and the conclusion is false. That row would give you a counterexample.</p>`},
 {kind:'Check',title:'Check yourself',q:'You want to disprove the claim “every integer n &gt; 1 has a prime factor larger than 3.” What is sufficient?',
  options:['Checking it fails for n = 2, 3, 4, 5, 6, 7 and 8','Exhibiting a single n &gt; 1 whose prime factors are all ≤ 3, such as n = 6','Proving that most integers have a prime factor ≤ 3','Showing the claim cannot be derived from the axioms'],
  answer:1, why:'A universally quantified claim dies to one counterexample. n = 6 factors as 2·3, so its largest prime factor is 3, and the claim is dead — no further work needed. Spot-checking a range proves nothing either way, and “most integers” is a statement about density, not a refutation.'}
]},

{id:2,title:'Induction',short:'Induction',prereqs:[1],steps:[
 {kind:'Idea',title:'One anchor plus one uniform rule reaches every n',html:`
  <p>Induction is the tool for proving infinitely many statements at once. To establish <span class="m">P(n)</span> for all natural numbers n you supply exactly two things:</p>
  <ol><li>the <em class="v">base case</em>: <span class="m">P(0)</span> is true;</li>
  <li>the <em class="v">inductive step</em>: for every k, <span class="m">P(k) ⇒ P(k+1)</span>.</li></ol>
  <p>The metaphor everyone reaches for is a row of dominoes, and it is a good one, but only if you take seriously what each half contributes. The inductive step is a chain of conditionals: it transmits truth but never manufactures it. The base case is the only thing in the argument that asserts anything outright.</p>
  <span class="blk"><span class="lbl">Where the effort goes</span>
  In practice the base case takes a line and the inductive step takes a page. You assume <span class="m">P(k)</span> — the <em class="v">inductive hypothesis</em> — and must produce <span class="m">P(k+1)</span>. The craft is in finding where to insert the hypothesis into the expression you are trying to transform.</span>`},
 {kind:'Example',title:'The first n odd numbers sum to n²',html:`
  <span class="blk"><span class="lbl">Theorem</span> For all n ≥ 1, <span class="m">1 + 3 + 5 + ⋯ + (2n−1) = n²</span>.</span>
  <p><span class="step-n">Base case.</span> For n = 1 the left side is 1 and the right side is 1² = 1. ✓</p>
  <p><span class="step-n">Inductive step.</span> Assume the identity holds for some k ≥ 1, that is <span class="m">1 + 3 + ⋯ + (2k−1) = k²</span>. Add the next odd number, <span class="m">2(k+1) − 1 = 2k+1</span>, to both sides:</p>
  <span class="blk"><span class="m">1 + 3 + ⋯ + (2k−1) + (2k+1) = k² + 2k + 1 = (k+1)²</span></span>
  <p>which is exactly the claim for k+1. By induction it holds for every n ≥ 1. <span class="qed">∎</span></p>
  <p>Now a cautionary one. <em class="v">Claim:</em> all horses are the same colour. Base case: in a set of one horse, all horses match. Step: given a set of k+1 horses, remove one to get a set of k, which by hypothesis is uniform; put it back and remove a different one, also uniform; the two sets overlap, so the whole set is uniform.</p>
  <p>The argument is invalid, and it fails in exactly one place: going from k = 1 to k = 2, the two subsets are single horses that do not overlap. An inductive step must hold for <em>every</em> k, including the smallest. A step that works for all k ≥ 2 and fails at k = 1 proves nothing.</p>`},
 {kind:'Try it',title:'Break the chain and watch what survives',widget:'dominoes',html:`
  <p>Twelve dominoes. Turn the base case off, or sever one link in the chain, and see how much of the claim you still own.</p>`},
 {kind:'Check',title:'Check yourself',q:'A proof establishes P(3), and separately proves P(k) ⇒ P(k+2) for all k ≥ 3. What follows?',
  options:['P(n) for all n ≥ 3','P(n) for all odd n ≥ 3','P(n) for all n ≥ 0','Nothing — the step size must be 1'],
  answer:1, why:'The step jumps by two, so from the anchor at 3 you reach 5, 7, 9, and so on: every odd n ≥ 3. The even numbers are never touched because nothing connects them to the base case. Induction with a stride of 2 is perfectly valid — it just needs one base case per residue class you want to cover.'}
]},

{id:3,title:'Strong Induction',short:'Strong induction',prereqs:[2],steps:[
 {kind:'Idea',title:'Assume everything below k, not just k',html:`
  <p>Ordinary induction hands you one previous case. Sometimes that is the wrong one. <em class="v">Strong induction</em> lets the inductive step assume <span class="m">P(0), P(1), …, P(k)</span> all at once and conclude <span class="m">P(k+1)</span>.</p>
  <p>This is not a stronger axiom — the two principles prove exactly the same theorems, and each can be derived from the other. It is a more convenient interface. You reach for it whenever the natural argument for n refers to some smaller value you cannot predict in advance.</p>
  <span class="blk"><span class="lbl">The tell</span>
  If your proof of P(n) wants to split n into two pieces, or subtract a number that depends on n, or invoke a factorisation, ordinary induction will not reach. Strong induction will.</span>`},
 {kind:'Example',title:'Every integer greater than 1 has a prime factorisation',html:`
  <span class="blk"><span class="lbl">Theorem</span> Every integer n &gt; 1 is a product of primes.</span>
  <p><span class="step-n">Proof by strong induction on n.</span> Suppose the claim holds for every integer from 2 up to k, and consider <span class="m">n = k+1</span>.</p>
  <p><em class="v">Case 1:</em> n is prime. Then it is a product of one prime, namely itself, and we are done.</p>
  <p><em class="v">Case 2:</em> n is composite. Then <span class="m">n = a·b</span> with <span class="m">1 &lt; a, b &lt; n</span>. Both a and b lie in the range covered by the inductive hypothesis, so each is a product of primes; concatenating those two factorisations gives one for n. <span class="qed">∎</span></p>
  <p>Ordinary induction is useless here. Knowing that k factors into primes tells you nothing whatsoever about k+1 — the factors of n could be anywhere below it, and which ones they are depends on n in an unpredictable way. Strong induction covers all the possibilities at once.</p>
  <p>A close relative is the <em class="v">well-ordering principle</em>: every non-empty set of non-negative integers has a least element. Many strong-induction proofs can be rewritten as “consider the smallest counterexample and derive a contradiction,” and the two styles are interchangeable.</p>`},
 {kind:'Try it',title:'Which postage totals can you make?',widget:'stamps',html:`
  <p>With 3¢ and 5¢ stamps, some totals are impossible: 1, 2, 4 and 7. Every total from 8 upward works. Proving that by ordinary induction fails, because reaching n means knowing about n−3 or n−5, not n−1 — so you need four base cases and the full hypothesis. Change the denominations and watch the threshold move.</p>`},
 {kind:'Check',title:'Check yourself',q:'Why does a strong-induction proof of “every n &gt; 1 has a prime factorisation” typically need no separate base case argument for n = 2?',
  options:['Because 2 is even','Because for n = 2 the hypothesis is vacuous and the “n is prime” case applies directly','Because strong induction never requires base cases','Because 2 is the least element of the set'],
  answer:1, why:'At n = 2 there are no smaller integers above 1, so the inductive hypothesis is an empty assumption — you get it for free. The prime case of the argument then handles 2 on its own. Strong induction does still need base cases in general; here the case analysis absorbs it, which is a common and slightly slippery feature of such proofs.'}
]},

{id:4,title:'Number Theory I',short:'Number theory I',prereqs:[1,3],steps:[
 {kind:'Idea',title:'Divisibility, and the greatest common divisor',html:`
  <p>Write <span class="m">a | b</span> for “a divides b,” meaning <span class="m">b = ka</span> for some integer k. It is a relation on integers with a few properties worth internalising: it is transitive, and if <span class="m">a | b</span> and <span class="m">a | c</span> then a divides every integer combination <span class="m">sb + tc</span>. That last fact is small and does an enormous amount of work.</p>
  <p>The <em class="v">greatest common divisor</em> <span class="m">gcd(a, b)</span> is the largest integer dividing both. Computing it by factoring both numbers is hopeless for large inputs. Euclid's observation gives a fast route:</p>
  <span class="blk"><span class="m">gcd(a, b) = gcd(b, a mod b)</span></span>
  <p>because any common divisor of a and b also divides <span class="m">a − qb</span>, and conversely. Each round shrinks the numbers; the remainder is at least halved every two rounds. So the algorithm finishes in <span class="m">O(log min(a, b))</span> divisions. It is a remarkably old idea that remains central to modern cryptography.</p>`},
 {kind:'Example',title:'The gcd is an integer combination',html:`
  <span class="blk"><span class="lbl">Theorem (Bézout)</span> For any positive integers a and b there exist integers s and t with <span class="m">sa + tb = gcd(a, b)</span>.</span>
  <p>Take a = 259 and b = 70. Euclid's algorithm gives:</p>
  <span class="blk"><span class="m">259 = 3·70 + 49<br>70 = 1·49 + 21<br>49 = 2·21 + 7<br>21 = 3·7 + 0</span></span>
  <p>so the gcd is 7. Now run the divisions backwards, each time substituting the remainder from the line above:</p>
  <span class="blk"><span class="m">7 = 49 − 2·21<br>&nbsp;&nbsp;= 49 − 2·(70 − 49) = 3·49 − 2·70<br>&nbsp;&nbsp;= 3·(259 − 3·70) − 2·70 = 3·259 − 11·70</span></span>
  <p>Check: <span class="m">777 − 770 = 7</span>. ✓</p>
  <p>The consequence is sharper than it looks. The set of integer combinations of a and b is exactly the set of multiples of their gcd — nothing smaller than the gcd is reachable, and everything larger that is a multiple of it is. Unique factorisation, modular inverses and the correctness of RSA all descend from this one identity.</p>`},
 {kind:'Try it',title:'Run Euclid on your own numbers',widget:'euclid',html:`
  <p>Enter any two positive integers. Watch how few divisions it takes even for large inputs — and note the Bézout coefficients that fall out of running the bookkeeping in reverse.</p>`},
 {kind:'Check',title:'Check yourself',q:'A vending machine can add or remove exactly 12 or 18 tokens per operation, starting from 0. Which balances are reachable?',
  options:['Only multiples of 36','Every non-negative integer','Exactly the multiples of 6','Only 12, 18 and their sums'],
  answer:2, why:'Reachable balances are exactly the integer combinations 12s + 18t, and by Bézout that set is precisely the multiples of gcd(12, 18) = 6. So 6 itself is reachable (18 − 12), as is every multiple of 6, and nothing else — 9 tokens is impossible no matter how you sequence the operations.'}
]},

{id:5,title:'Number Theory II',short:'Number theory II',prereqs:[4],steps:[
 {kind:'Idea',title:'Arithmetic on a circle',html:`
  <p>Write <span class="m">a ≡ b (mod n)</span> when n divides <span class="m">a − b</span>. Congruence mod n is an equivalence relation, and — this is the useful part — it respects addition and multiplication: if <span class="m">a ≡ b</span> and <span class="m">c ≡ d</span>, then <span class="m">a + c ≡ b + d</span> and <span class="m">ac ≡ bd</span>. You can reduce at any point in a computation without changing the answer.</p>
  <p>Division is where it gets interesting. There is no general division, only multiplication by an <em class="v">inverse</em>: a number <span class="m">a⁻¹</span> with <span class="m">a·a⁻¹ ≡ 1 (mod n)</span>. It exists precisely when <span class="m">gcd(a, n) = 1</span>, and the reason is Bézout — solve <span class="m">sa + tn = 1</span> and read off <span class="m">a⁻¹ = s</span>.</p>
  <span class="blk"><span class="lbl">Two theorems worth memorising</span>
  <em class="v">Fermat:</em> if p is prime and <span class="m">p ∤ a</span>, then <span class="m">a^(p−1) ≡ 1 (mod p)</span>.<br>
  <em class="v">Euler:</em> if <span class="m">gcd(a, n) = 1</span>, then <span class="m">a^φ(n) ≡ 1 (mod n)</span>, where <span class="m">φ(n)</span> counts the integers in [1, n] coprime to n.</span>`},
 {kind:'Example',title:'RSA in miniature',html:`
  <p>Pick two primes, <span class="m">p = 11</span> and <span class="m">q = 13</span>. Then <span class="m">n = 143</span> and <span class="m">φ(n) = (p−1)(q−1) = 120</span>.</p>
  <p>Choose a public exponent coprime to 120, say <span class="m">e = 7</span>. Its inverse mod 120 is <span class="m">d = 103</span>, since <span class="m">7·103 = 721 = 6·120 + 1</span>. Publish <span class="m">(n, e) = (143, 7)</span> and keep d secret.</p>
  <p>Encrypt the message <span class="m">m = 9</span>:</p>
  <span class="blk"><span class="m">9⁷ mod 143 = 4782969 mod 143 = 48</span></span>
  <p>Decrypt by raising to the private exponent:</p>
  <span class="blk"><span class="m">48¹⁰³ mod 143 = 9</span></span>
  <p>Why it returns the original: <span class="m">m^(ed) = m^(1 + k·φ(n)) = m · (m^φ(n))^k ≡ m · 1^k = m</span> by Euler's theorem. The security rests on the asymmetry between multiplying 11 by 13 and recovering 11 and 13 from 143 — trivial at this size, believed hard when the primes are hundreds of digits long.</p>
  <p>Note what is doing the work. Not secrecy of the algorithm, not obscurity of n: only the difficulty of factoring, and the guarantee from Bézout that d exists at all.</p>`},
 {kind:'Try it',title:'When does multiplication stay reversible?',widget:'modular',html:`
  <p>Each point on the circle is a residue mod n. Lit points are the values you can reach by multiplying a by 1, 2, 3, … Change a and n, and notice that the circle either lights up completely or collapses onto a sparse subset — with nothing in between.</p>`},
 {kind:'Check',title:'Check yourself',q:'Why is it unsafe to choose an RSA public exponent e with gcd(e, φ(n)) &gt; 1?',
  options:['Encryption becomes too slow','No decryption exponent d exists, so the map is not invertible','The ciphertext becomes larger than the modulus','It leaks the value of φ(n)'],
  answer:1, why:'d is defined as the inverse of e modulo φ(n), and that inverse exists only when the two are coprime. Without it, exponentiating by e is not a bijection on the message space — distinct messages collide and decryption is impossible, not merely hard. This is the same coprimality condition you just watched light up the circle.'}
]},

{id:6,title:'Graph Theory and Coloring',short:'Colouring',prereqs:[1],steps:[
 {kind:'Idea',title:'Vertices, edges, and the first thing you can count',html:`
  <p>A <em class="v">simple graph</em> is a set of vertices together with a set of edges, each joining two distinct vertices, with no repeats. That is the whole definition, and its bareness is the point: anything you can phrase as “these things are related pairwise” becomes a graph, and everything proved about graphs applies at once.</p>
  <p>The <em class="v">degree</em> of a vertex is the number of edges at it. Sum the degrees over all vertices and you count each edge exactly twice, once from each end:</p>
  <span class="blk"><span class="m">∑<sub>v</sub> deg(v) = 2|E|</span></span>
  <p>This is the handshake lemma, and it is worth more than its triviality suggests. The right-hand side is even, so the number of odd-degree vertices must be even. At any party, the number of people who have shaken an odd number of hands is even — and you now know that without having attended.</p>
  <span class="blk"><span class="lbl">Colouring</span>
  A <em class="v">proper colouring</em> assigns a colour to each vertex so no edge joins two vertices of the same colour. The <em class="v">chromatic number</em> <span class="m">χ(G)</span> is the fewest colours that suffice. Colours are a stand-in for anything mutually exclusive: time slots, radio frequencies, machine registers.</span>`},
 {kind:'Example',title:'Bounding the chromatic number from both sides',html:`
  <p>Nailing down <span class="m">χ(G)</span> means squeezing it between a lower and an upper bound that happen to meet.</p>
  <p><span class="step-n">Lower bound.</span> If G contains a set of k vertices that are all mutually adjacent — a <em class="v">clique</em> of size k — then every one of them needs its own colour, so <span class="m">χ(G) ≥ k</span>. A triangle forces 3.</p>
  <p><span class="step-n">Upper bound.</span> Let <span class="m">d</span> be the largest degree in G. Then <span class="m">χ(G) ≤ d + 1</span>. The proof is a greedy algorithm: order the vertices arbitrarily and colour them one at a time, always picking the smallest colour not already used by a neighbour. Each vertex has at most d neighbours, so among <span class="m">d + 1</span> colours at least one is always free. <span class="qed">∎</span></p>
  <p>The bound is tight for complete graphs and for odd cycles, and badly loose elsewhere — a star with a thousand leaves has maximum degree 1000 and chromatic number 2. Greedy also depends heavily on the ordering: the same graph can take 2 colours or many more depending on which vertex you happen to start with.</p>
  <p>Deciding whether <span class="m">χ(G) ≤ 3</span> is NP-complete. There is no known efficient algorithm, which is why schedulers in practice run heuristics and accept a decent answer.</p>`},
 {kind:'Try it',title:'Schedule seven exams',widget:'colouring',html:`
  <p>Seven exams; a line between two of them means at least one student is sitting both, so they cannot share a time slot. Click an exam to cycle it through the slots. Three slots are enough — find an assignment that uses no more.</p>`},
 {kind:'Check',title:'Check yourself',q:'A graph has 10 vertices, every one of degree 3. How many edges does it have?',
  options:['30','15','13','Not determined by the information given'],
  answer:1, why:'By the handshake lemma the degrees sum to twice the edge count: 10 · 3 = 30 = 2|E|, so |E| = 15. Note the same lemma rules out a graph with 9 vertices all of degree 3 — that would make the degree sum 27, an odd number, which is impossible.'}
]},

{id:7,title:'Matching Problems',short:'Matching',prereqs:[6],steps:[
 {kind:'Idea',title:'Pairing up two sides without regret',html:`
  <p>A <em class="v">bipartite</em> graph splits its vertices into two sets with every edge running between them, never inside one. A <em class="v">matching</em> is a set of edges no two of which share a vertex. The question is when one side can be matched completely.</p>
  <p>Hall's theorem gives the exact condition. A complete matching of the left side exists if and only if every subset S of the left has at least |S| neighbours on the right. The condition is obviously necessary; that it is also sufficient is the theorem.</p>
  <span class="blk"><span class="lbl">The bottleneck view</span>
  The contrapositive is the useful form: if a matching is impossible, there is a specific set of left vertices crowded into too few right vertices. Failure always has a witness you can point at.</span>
  <p>A different flavour of the problem adds preferences. Each participant ranks the other side, and a matching is <em class="v">stable</em> if no two people would both rather abandon their assigned partners for each other. Such a rogue pair is called a blocking pair, and stability means there are none.</p>`},
 {kind:'Example',title:'The propose-and-reject algorithm always terminates, and always ends stable',html:`
  <p>The algorithm runs in rounds. Every unmatched proposer proposes to the highest-ranked partner who has not yet rejected them. Each receiver holds their best offer so far and rejects the rest — including, if a better offer arrives later, the one they were holding.</p>
  <p><span class="step-n">It terminates.</span> Each proposal permanently crosses one name off one proposer's list. There are only finitely many names, so the process cannot run forever.</p>
  <p><span class="step-n">It ends with everyone matched.</span> Suppose some proposer is left unpaired. Then they were rejected by everyone on their list. But a receiver, once holding an offer, never becomes free again — they only trade up. So every receiver is paired, and with n on each side that means every proposer is too. Contradiction.</p>
  <p><span class="step-n">The result is stable.</span> Take any proposer p and any receiver r that p prefers to their final partner. Since p works down the list in order, p must have proposed to r earlier and been turned away. So r was holding someone better at that moment, and r only ever improves. Hence r's final partner beats p, and (p, r) is not a blocking pair. <span class="qed">∎</span></p>
  <p>There is an important asymmetry here. The outcome is best possible for the proposing side and worst possible for the receiving side among stable matchings: every proposer gets their best stable partner, while every receiver gets their worst. Choosing who proposes is therefore a design decision, not a neutral implementation detail.</p>`},
 {kind:'Try it',title:'Step through propose-and-reject',widget:'stable',html:`
  <p>Four proposers, four receivers, preferences fixed. Advance one proposal at a time and watch receivers trade up. Note that a receiver's partner only ever improves, while a proposer's only ever gets worse.</p>`},
 {kind:'Check',title:'Check yourself',q:'Four applicants apply to jobs. Ana, Ben and Cleo are each qualified only for the same two jobs; Dev is qualified for all four. Can everyone be placed?',
  options:['Yes — there are four jobs for four applicants','No — three applicants share only two acceptable jobs','Only if Dev is placed first','It depends on the applicants’ preferences'],
  answer:1, why:'Hall\'s condition fails on the set {Ana, Ben, Cleo}: three applicants whose combined neighbourhood contains just two jobs. By pigeonhole two of them must collide, and no ordering or preference scheme repairs it. This is the bottleneck the contrapositive of Hall\'s theorem promises you can always locate.'}
]},

{id:8,title:'Graph Theory II: Minimum Spanning Trees',short:'Spanning trees',prereqs:[6],steps:[
 {kind:'Idea',title:'A tree is the sparsest connected thing there is',html:`
  <p>A <em class="v">tree</em> is a connected graph with no cycles. Several very different-sounding descriptions turn out to define the same object, and moving between them freely is most of the skill:</p>
  <ul>
   <li>connected and acyclic;</li>
   <li>connected, and removing any edge disconnects it;</li>
   <li>acyclic, and adding any edge creates a cycle;</li>
   <li>exactly one path between every pair of vertices;</li>
   <li>connected with exactly <span class="m">v − 1</span> edges.</li>
  </ul>
  <p>A <em class="v">spanning tree</em> of a connected graph G is a subgraph that is a tree and touches every vertex — the cheapest possible way to keep G in one piece. When edges carry weights, the <em class="v">minimum spanning tree</em> is the one of least total weight.</p>`},
 {kind:'Example',title:'Why greedy is not merely a decent heuristic here',html:`
  <p>Kruskal's algorithm sorts the edges by weight and takes each in turn unless it would close a cycle. It is a greedy algorithm, and greedy algorithms usually fail — this one does not, and the reason is worth understanding.</p>
  <span class="blk"><span class="lbl">Cut property</span>
  Split the vertices into two non-empty parts any way you like. If one edge crossing the split is strictly lighter than every other crossing edge, that edge is in every minimum spanning tree.</span>
  <p><span class="step-n">Proof.</span> Let e be that uniquely lightest crossing edge and suppose some MST T omits it. Adding e to T creates a cycle, and that cycle must cross the split an even number of times, so it contains some other crossing edge f. Swap them: <span class="m">T − f + e</span> is still spanning and still a tree, and since <span class="m">w(e) &lt; w(f)</span> it weighs less. That contradicts T being minimum. <span class="qed">∎</span></p>
  <p>Now Kruskal's correctness follows. Whenever the algorithm accepts an edge, it is a minimum-weight edge joining two components that are still separate. That makes it safe: by the same exchange argument, there is some minimum spanning tree containing the edges chosen so far. Ties do not break the algorithm; they simply mean there may be several minimum spanning trees.</p>
  <p>Prim's algorithm grows a single tree outward instead of merging fragments, and is justified by the same property applied to a different family of cuts.</p>`},
 {kind:'Try it',title:'Build a spanning tree by hand',widget:'mst',html:`
  <p>Six sites, nine possible links, each with a cost. Click links to build a network connecting everything. You need exactly five, and closing a cycle is refused. The minimum total is 15 — see whether your instincts find it.</p>`},
 {kind:'Check',title:'Check yourself',q:'You add 10 to the weight of every edge in a connected weighted graph. What happens to the minimum spanning tree?',
  options:['It may change, since relative costs shift','It is unchanged — every spanning tree gains the same amount','It always becomes the maximum spanning tree','It changes only if some edge weights were negative'],
  answer:1, why:'Every spanning tree of a graph on v vertices has exactly v − 1 edges, so adding a constant c to all weights adds (v − 1)c to every candidate equally. The ordering of total weights is untouched and the optimum is the same tree. This uniform edge count is a property of trees specifically — the same shift would not preserve, say, a shortest path, since paths can differ in length.'}
]},

{id:9,title:'Communication Networks',short:'Networks',prereqs:[8],steps:[
 {kind:'Idea',title:'Three numbers that trade off against each other',html:`
  <p>Now put the graph to work. A routing network has N inputs, N outputs, and switches in between; the job is to deliver a permutation — each input sending to a distinct output — as fast as possible. Three measures decide whether a design is any good.</p>
  <ul>
   <li><em class="v">Diameter:</em> the longest shortest-path between an input and an output. This sets latency.</li>
   <li><em class="v">Switch count:</em> how much hardware you are buying.</li>
   <li><em class="v">Congestion:</em> over all permutations, the largest number of paths forced through a single switch, minimised over routing choices. This sets throughput.</li>
  </ul>
  <p>Congestion is the subtle one and the one that decides real designs. It is a worst case over inputs and a best case over your own routing — you are allowed to be clever about routes, but an adversary picks the traffic pattern.</p>`},
 {kind:'Example',title:'Two bad designs, and what they teach',html:`
  <p><span class="step-n">Complete binary tree.</span> Inputs are leaves on one side, outputs leaves on the other, with switches forming the tree. Diameter is about <span class="m">2 log N</span> — excellent — and it uses only <span class="m">2N − 1</span> switches. But every path from the left half to the right half goes through the root, so a permutation sending everything across gives congestion N. It is fast and cheap and falls over instantly.</p>
  <p><span class="step-n">2-D array.</span> Lay out an N × N crossbar. Every input-output pair gets a private path, so congestion is 1 — perfect. Diameter is <span class="m">2N</span>, which is terrible, and it costs <span class="m">N²</span> switches, which is worse. It is the design that makes you appreciate the others.</p>
  <p><span class="step-n">Butterfly.</span> Route by binary address: at level i, a packet is switched on the i-th bit of its destination. Diameter drops to about <span class="m">log N</span> with roughly <span class="m">N log N</span> switches. Congestion lands around <span class="m">√N</span> — far better than the tree, not as good as the array.</p>
  <p>The especially useful construction is the Beneš network: two butterflies joined back to back. It has <span class="m">2N log N</span> switches, diameter about <span class="m">2 log N</span>, and congestion 1. The proof that congestion 1 is achievable becomes a graph-colouring argument: make input-output pairs into vertices, connect pairs that must take different halves, and 2-colour the resulting degree-at-most-2 graph.</p>`},
 {kind:'Try it',title:'Watch the trade-off at scale',widget:'networks',html:`
  <p>Slide N upward and watch which columns explode. The array's switch count and the tree's congestion both grow linearly or worse, while Beneš keeps congestion pinned at 1 for a cost that grows like <span class="m">N log N</span>.</p>`},
 {kind:'Check',title:'Check yourself',q:'Why is a complete binary tree’s congestion N rather than something smaller, given that it has plenty of switches?',
  options:['Its diameter is too large','Every path between the two halves must pass through the single root switch','Trees have no cycles','It has too few switches overall'],
  answer:1, why:'A tree has exactly one path between any two leaves, so there is no routing freedom to exploit. The permutation sending every left-half input to a right-half output forces all N paths through the root. Congestion is about the existence of alternate routes, which is precisely what acyclicity denies — the same property that makes trees cheap makes them fragile under load.'}
]},

{id:10,title:'Graph Theory III: Planarity',short:'Planarity',prereqs:[6],steps:[
 {kind:'Idea',title:'Which graphs can be drawn without crossings',html:`
  <p>A graph is <em class="v">planar</em> if it can be drawn in the plane with no two edges crossing. The question matters concretely: a circuit on a single-layer board is exactly a planar drawing, and non-planarity is what forces you to add layers.</p>
  <p>Such a drawing divides the plane into <em class="v">faces</em>, including the unbounded region outside everything. Euler's formula ties the three counts together for any connected planar drawing:</p>
  <span class="blk"><span class="m">v − e + f = 2</span></span>
  <p>What makes this remarkable is that it holds for <em>every</em> planar drawing of the graph. You can redraw a graph in wildly different ways; the face count adjusts to keep the identity true.</p>`},
 {kind:'Example',title:'Turning Euler’s formula into an impossibility proof',html:`
  <p>Euler's formula constrains how many edges a planar graph can have. In a simple graph with <span class="m">v ≥ 3</span>, every face is bounded by at least 3 edges, and each edge borders at most 2 faces, so <span class="m">3f ≤ 2e</span>. Substituting into <span class="m">f = e − v + 2</span>:</p>
  <span class="blk"><span class="m">3(e − v + 2) ≤ 2e  ⟹  e ≤ 3v − 6</span></span>
  <p><span class="step-n">K₅ is not planar.</span> The complete graph on 5 vertices has <span class="m">v = 5</span> and <span class="m">e = 10</span>. The bound permits at most <span class="m">3·5 − 6 = 9</span>. Ten exceeds nine, so no planar drawing exists. <span class="qed">∎</span></p>
  <p><span class="step-n">K₃,₃ is not planar.</span> This one is bipartite, so it has no triangles and every face needs at least 4 edges, giving the tighter bound <span class="m">e ≤ 2v − 4</span>. Here <span class="m">v = 6</span> and <span class="m">e = 9</span>, while the bound permits 8. <span class="qed">∎</span></p>
  <p>Kuratowski's theorem closes the circle: these two graphs are the only obstructions. A graph is planar exactly when it contains no subdivision of K₅ or K₃,₃. Every non-planar graph in existence fails for one of these two reasons.</p>
  <p>One more consequence: every planar graph has a vertex of degree at most 5, which bootstraps into the five-colour theorem by induction. The four-colour theorem is true as well, but its only known proofs check thousands of cases by computer.</p>`},
 {kind:'Try it',title:'Try to flatten three graphs',widget:'planar',html:`
  <p>Drag vertices and watch the crossing count. The cube can be untangled with patience. K₅ and K₃,₃ cannot — and the counter will not reach zero no matter how long you work at it, for the arithmetic reason just proved.</p>`},
 {kind:'Check',title:'Check yourself',q:'A connected planar graph is drawn with 12 vertices and 20 edges. How many faces does the drawing have?',
  options:['8','10','12','Depends on how it is drawn'],
  answer:1, why:'Euler\'s formula gives f = e − v + 2 = 20 − 12 + 2 = 10, counting the unbounded outer face. The count does not depend on the drawing — that invariance is the substance of the theorem. As a sanity check, 20 ≤ 3·12 − 6 = 30, so a planar drawing is not ruled out by the edge bound.'}
]},

{id:11,title:'Relations, Partial Orders, and Scheduling',short:'Partial orders',prereqs:[6],steps:[
 {kind:'Idea',title:'Order without the promise that everything compares',html:`
  <p>A <em class="v">binary relation</em> on a set is just a set of ordered pairs — which elements are related to which. Three properties recur constantly: <em class="v">reflexive</em> (everything relates to itself), <em class="v">symmetric</em> (a R b implies b R a), and <em class="v">transitive</em> (a R b and b R c imply a R c). Reflexive, symmetric and transitive together make an equivalence relation, which carves a set into disjoint classes — congruence mod n is the example you already know.</p>
  <p>Replace symmetry with <em class="v">antisymmetry</em> — a R b and b R a only when a = b — and you get a <em class="v">partial order</em>. Divisibility on the positive integers, ⊆ on sets, and “must happen before” on tasks are all partial orders. The word partial matters: 4 and 6 do not divide each other, and neither {1} nor {2} contains the other. Some pairs are simply <em class="v">incomparable</em>.</p>
  <span class="blk"><span class="lbl">Two words for the two directions</span>
  A <em class="v">chain</em> is a set of mutually comparable elements — a sequence that must happen one after another. An <em class="v">antichain</em> is a set of mutually incomparable elements — things that could happen at the same time.</span>`},
 {kind:'Example',title:'Long chains or wide antichains, but not neither',html:`
  <p>Every finite partial order can be <em class="v">topologically sorted</em>: listed in a sequence consistent with the order. Proof by induction on size — a finite partial order always has a minimal element (follow “something is below me” downward; you cannot go forever, and you cannot loop, since that would violate antisymmetry). Put it first, delete it, and sort the rest. <span class="qed">∎</span></p>
  <p>Now the useful theorem. Partition the elements by <em class="v">height</em>: level i holds the elements whose longest chain below them has length i. Each level is an antichain, since if a were below b then b's longest chain would beat a's. With t levels:</p>
  <span class="blk"><span class="lbl">Theorem</span> If a partial order on n elements has no chain longer than t, it has an antichain of size at least <span class="m">n / t</span>.</span>
  <p>The levels are t antichains covering n elements, so by pigeonhole one of them holds at least n/t. <span class="qed">∎</span></p>
  <p>Read this as a scheduling statement and it becomes concrete. With unlimited processors, the minimum time to finish a project is the length of its longest chain — the critical path. And a project that cannot be finished quickly must contain a large set of tasks that could run simultaneously. Deep or wide; every project is at least one.</p>`},
 {kind:'Try it',title:'Schedule a release across processors',widget:'schedule',html:`
  <p>Ten tasks with the dependencies listed below. The scheduler runs any task whose prerequisites are done, preferring those with the longest chain still hanging off them. Change the number of processors and compare the result to the two lower bounds every schedule must obey.</p>`},
 {kind:'Check',title:'Check yourself',q:'Is “a is an ancestor of b, or a = b” on the set of all people a partial order?',
  options:['No — it is not transitive','No — two people can be mutually each other’s ancestors','Yes — it is reflexive, antisymmetric and transitive','No — most pairs of people are unrelated'],
  answer:2, why:'Reflexivity comes from the “or a = b” clause, transitivity from the fact that an ancestor of an ancestor is an ancestor, and antisymmetry from the fact that no two distinct people are each other’s ancestors. That most pairs are incomparable is not a defect — it is exactly what makes the order partial rather than total.'}
]},

{id:12,title:'Sums',short:'Sums',prereqs:[2],steps:[
 {kind:'Idea',title:'Closed forms, and how to find them rather than guess them',html:`
  <p>Induction verifies a formula for a sum; it does not tell you where the formula came from. This lecture is about finding closed forms in the first place.</p>
  <p>The workhorse is the <em class="v">perturbation method</em>. Write the sum as S, find a way to shift it so most terms line up, and subtract. For a geometric series:</p>
  <span class="blk"><span class="m">S = 1 + x + x² + ⋯ + xⁿ<br>xS = x + x² + ⋯ + xⁿ + xⁿ⁺¹<br>S − xS = 1 − xⁿ⁺¹  ⟹  S = (1 − xⁿ⁺¹)/(1 − x)</span></span>
  <p>For |x| &lt; 1 the tail vanishes and the infinite sum is 1/(1 − x). Differentiate that identity and you get sums like <span class="m">∑ i xⁱ</span> for free — a trick that turns up constantly when computing expected values later.</p>
  <span class="blk"><span class="lbl">Money is a sum</span>
  A payment of m dollars in a year is worth m/(1 + r) today at interest rate r. An annuity paying m each year for n years is therefore a geometric series, and its present value is a closed form you can evaluate in your head.</span>`},
 {kind:'Example',title:'The harmonic sum and a stack of books',html:`
  <p>The <em class="v">harmonic numbers</em> <span class="m">Hₙ = 1 + 1/2 + 1/3 + ⋯ + 1/n</span> have no closed form, but they are pinned down by comparing the sum to an integral: <span class="m">ln(n+1) ≤ Hₙ ≤ 1 + ln n</span>. So they grow without bound, but only logarithmically.</p>
  <p>Now stack n identical books of length 1 at the edge of a table, trying to make the top one reach as far out as possible. The rule for stability: the combined centre of mass of the books above any given book must sit over that book.</p>
  <p>Build from the top down. The top book can hang half its length over the one below. The top two together have their centre of mass 1/4 in from the end of the second book, so the second can hang 1/4 over the third. In general the top k books balance on the (k+1)-th with an extra overhang of <span class="m">1/(2k)</span>. Summing:</p>
  <span class="blk"><span class="m">overhang = 1/2 + 1/4 + 1/6 + ⋯ + 1/(2n) = Hₙ / 2</span></span>
  <p>Since <span class="m">Hₙ</span> is unbounded, with enough books the top one can extend arbitrarily far past the edge of the table. The catch is how many “enough” is.</p>`},
 {kind:'Try it',title:'Push the top book past the edge',widget:'books',html:`
  <p>Add books and watch the overhang creep outward. The dashed line is the table edge; the highlighted book is the top one.</p>`},
 {kind:'Check',title:'Check yourself',q:'What is 1 + 1/2 + 1/4 + 1/8 + ⋯ (continuing forever)?',
  options:['It diverges','1','2','ln 2'],
  answer:2, why:'It is a geometric series with ratio x = 1/2, so it sums to 1/(1 − 1/2) = 2. Contrast this with the harmonic series 1 + 1/2 + 1/3 + ⋯, whose terms also go to zero but which diverges. Terms shrinking to zero is necessary for convergence, not sufficient — how fast they shrink is what decides it.'}
]},

{id:13,title:'Sums and Asymptotics',short:'Asymptotics',prereqs:[12],steps:[
 {kind:'Idea',title:'Saying how fast something grows, and nothing more',html:`
  <p>Often an exact answer is unavailable or unhelpful, and what you want is the growth rate. Asymptotic notation makes that precise:</p>
  <ul>
   <li><span class="m">f ∼ g</span> means <span class="m">f(n)/g(n) → 1</span>: the same function, up to vanishing relative error.</li>
   <li><span class="m">f = O(g)</span> means f is eventually at most a constant multiple of g: an upper bound, constants ignored.</li>
   <li><span class="m">f = Ω(g)</span> is the matching lower bound, and <span class="m">f = Θ(g)</span> means both.</li>
   <li><span class="m">f = o(g)</span> means <span class="m">f/g → 0</span>: f is negligible compared to g.</li>
  </ul>
  <p>These are statements about limits. <span class="m">n = O(n²)</span> is true; it is just not tight. And “=” in <span class="m">f = O(g)</span> is an abuse — it really means “f belongs to the class O(g)”, which is why you should never flip it around.</p>
  <span class="blk"><span class="lbl">Sums versus integrals</span>
  For an increasing function, <span class="m">∫₀ⁿ f(x) dx ≤ ∑₁ⁿ f(k) ≤ ∫₁ⁿ⁺¹ f(x) dx</span>. Picture the sum as a staircase of unit-width rectangles; the integral is squeezed between two shifts of it. This is how you estimate sums with no closed form.</span>`},
 {kind:'Example',title:'Estimating n! without multiplying',html:`
  <p>Take logs to turn a product into a sum: <span class="m">ln n! = ln 1 + ln 2 + ⋯ + ln n</span>. Since ln is increasing, the integral bounds apply:</p>
  <span class="blk"><span class="m">∫₁ⁿ ln x dx = n ln n − n + 1</span></span>
  <p>so <span class="m">ln n! ≈ n ln n − n</span>, which already says <span class="m">n!</span> is roughly <span class="m">(n/e)ⁿ</span>. That alone settles a lot: it tells you <span class="m">log₂ n! = Θ(n log n)</span>, which is the information-theoretic reason no comparison sort can beat <span class="m">n log n</span>.</p>
  <p>A more careful analysis recovers the missing factor and gives <em class="v">Stirling's formula</em>:</p>
  <span class="blk"><span class="m">n! ∼ √(2πn) · (n/e)ⁿ</span></span>
  <p>Remarkably accurate — within 1% for n ≥ 9. But notice what ∼ does and does not claim. The ratio tends to 1; the difference does not tend to 0. At n = 100 the error is still about <span class="m">10¹⁵⁵</span> in absolute terms, which is small only relative to <span class="m">100! ≈ 9.3 × 10¹⁵⁷</span>.</p>`},
 {kind:'Try it',title:'How good is Stirling’s formula?',widget:'stirling',html:`
  <p>Slide n up to 1000. The readout compares n! to Stirling's approximation and to the next-order correction. The chart shows the percentage error for small n.</p>`},
 {kind:'Check',title:'Check yourself',q:'Is it true that 2ⁿ⁺¹ = O(2ⁿ)? What about 2²ⁿ = O(2ⁿ)?',
  options:['Both true','First true, second false','First false, second true','Both false'],
  answer:1, why:'2ⁿ⁺¹ = 2 · 2ⁿ, a constant multiple, so it is O(2ⁿ). But 2²ⁿ = (2ⁿ)² = 4ⁿ, and 4ⁿ/2ⁿ = 2ⁿ grows without bound, so no constant can cap it. Constants in front of a function do not matter for O; constants in the exponent change everything.'}
]},

{id:14,title:'Divide and Conquer Recurrences',short:'Divide & conquer',prereqs:[3,13],steps:[
 {kind:'Idea',title:'The running time of a recursive algorithm is a recurrence',html:`
  <p>An algorithm that splits a problem of size n into a subproblems of size n/b, solves them recursively, and spends <span class="m">g(n)</span> combining the answers has running time</p>
  <span class="blk"><span class="m">T(n) = a·T(n/b) + g(n)</span></span>
  <p>Merge sort is <span class="m">T(n) = 2T(n/2) + n</span>. Binary search is <span class="m">T(n) = T(n/2) + 1</span>. Solving the recurrence tells you the complexity.</p>
  <p>The cleanest way to see the answer is the <em class="v">recursion tree</em>. The root does <span class="m">g(n)</span> work. It has a children, each doing <span class="m">g(n/b)</span>. At depth i there are <span class="m">aⁱ</span> nodes, each doing <span class="m">g(n/bⁱ)</span>. The tree has <span class="m">log_b n</span> levels, and T(n) is the sum of every level.</p>
  <span class="blk"><span class="lbl">The only question that matters</span>
  For <span class="m">g(n) = nᵈ</span>, level i does <span class="m">nᵈ · (a/bᵈ)ⁱ</span> work — a geometric series in the ratio <span class="m">a/bᵈ</span>. Is it shrinking, flat, or growing as you go down?</span>`},
 {kind:'Example',title:'Three answers from one geometric series',html:`
  <p>Summing <span class="m">nᵈ(a/bᵈ)ⁱ</span> from i = 0 to <span class="m">log_b n</span> gives three regimes, depending only on how <span class="m">a</span> compares to <span class="m">bᵈ</span>.</p>
  <p><span class="step-n">a &lt; bᵈ:</span> the series decreases geometrically, so it is dominated by its first term. The root's work sets the pace: <span class="m">T(n) = Θ(nᵈ)</span>.</p>
  <p><span class="step-n">a = bᵈ:</span> every level does the same <span class="m">nᵈ</span>, and there are <span class="m">log_b n</span> levels: <span class="m">T(n) = Θ(nᵈ log n)</span>. Merge sort, with a = b = 2 and d = 1, gives <span class="m">Θ(n log n)</span>.</p>
  <p><span class="step-n">a &gt; bᵈ:</span> the series increases geometrically and the leaves dominate. There are <span class="m">a^(log_b n) = n^(log_b a)</span> leaves, so <span class="m">T(n) = Θ(n^(log_b a))</span>.</p>
  <p>The third case explains a famous trick. Multiplying two n-digit numbers by splitting each into halves needs four half-size products — <span class="m">T(n) = 4T(n/2) + n</span>, which is <span class="m">Θ(n²)</span>, no better than schoolbook. Karatsuba noticed that three products suffice with some extra additions. Now <span class="m">T(n) = 3T(n/2) + n = Θ(n^(log₂ 3)) ≈ Θ(n^1.585)</span>. Saving one multiplication at the top saves a fraction of the work at every level, and the leaves compound it.</p>
  <p>For uneven splits and more general <span class="m">g(n)</span>, the Akra–Bazzi theorem extends this, but the tree picture is the intuition behind all of it.</p>`},
 {kind:'Try it',title:'Watch which level dominates',widget:'rtree',html:`
  <p>Set a, b and d. Each bar is the total work at one depth of the recursion tree, from the root on the left to the leaves on the right.</p>`},
 {kind:'Check',title:'Check yourself',q:'What is the solution to T(n) = 8T(n/2) + n²?',
  options:['Θ(n²)','Θ(n² log n)','Θ(n³)','Θ(n⁸)'],
  answer:2, why:'Here a = 8, b = 2, d = 2, and bᵈ = 4 < 8, so the leaves dominate and T(n) = Θ(n^(log₂ 8)) = Θ(n³). This is the recurrence for naive recursive matrix multiplication on n × n blocks. Strassen’s algorithm cuts 8 subproblems to 7, bringing it down to about Θ(n^2.807) — the same trick as Karatsuba, one dimension up.'}
]},

{id:15,title:'Linear Recurrences',short:'Linear recurrences',prereqs:[14],steps:[
 {kind:'Idea',title:'Guess an exponential, and let the equation tell you which one',html:`
  <p>A <em class="v">linear recurrence</em> defines each term as a fixed linear combination of the previous few, such as the Fibonacci numbers:</p>
  <span class="blk"><span class="m">f(n) = f(n−1) + f(n−2),  f(0) = 0,  f(1) = 1</span></span>
  <p>Divide-and-conquer recurrences shrink n multiplicatively; these subtract from it. That difference changes the character of the solution completely — instead of polynomials, you get exponentials.</p>
  <p>The method is to guess <span class="m">f(n) = xⁿ</span> and see what x has to be. Substituting and dividing by <span class="m">xⁿ⁻²</span> leaves the <em class="v">characteristic equation</em> <span class="m">x² = x + 1</span>. Its roots are the only exponentials that satisfy the recurrence.</p>
  <span class="blk"><span class="lbl">Why any combination works</span>
  The recurrence is linear: if two sequences satisfy it, so does any combination <span class="m">A·f + B·g</span>. So once you have one solution per root, you combine them and pick A and B to match the starting values.</span>`},
 {kind:'Example',title:'A closed form for Fibonacci, and a gambling preview',html:`
  <p>The roots of <span class="m">x² = x + 1</span> are <span class="m">φ = (1 + √5)/2 ≈ 1.618</span> and <span class="m">ψ = (1 − √5)/2 ≈ −0.618</span>. So <span class="m">f(n) = Aφⁿ + Bψⁿ</span>. From <span class="m">f(0) = 0</span> we get <span class="m">B = −A</span>; from <span class="m">f(1) = 1</span> we get <span class="m">A(φ − ψ) = 1</span>, so <span class="m">A = 1/√5</span>:</p>
  <span class="blk"><span class="m">f(n) = (φⁿ − ψⁿ) / √5</span></span>
  <p>An expression full of irrational numbers that produces an integer every time. Since <span class="m">|ψ| &lt; 1</span>, its term fades away, and <span class="m">f(n)</span> is just <span class="m">φⁿ/√5</span> rounded to the nearest integer.</p>
  <p>Two wrinkles. When the characteristic equation has a <em class="v">repeated root</em> r, the second independent solution is <span class="m">n·rⁿ</span>. And when the recurrence has an extra non-homogeneous term, like <span class="m">f(n) = 2f(n−1) + 1</span> for the Towers of Hanoi, you solve the homogeneous part, then add any one particular solution — here a constant, −1 — to get <span class="m">f(n) = 2ⁿ − 1</span>.</p>
  <p>Hold on to this machinery. The probability of a gambler reaching a target before going broke satisfies a linear recurrence, and the last lecture solves it exactly this way.</p>`},
 {kind:'Try it',title:'Build your own recurrence',widget:'linrec',html:`
  <p>Set the coefficients and the two starting values. The default is Fibonacci. Try <span class="m">f(n) = 2f(n−1) − f(n−2)</span> for a repeated root, or <span class="m">f(n) = f(n−1) − f(n−2)</span> for complex roots and a sequence that cycles forever.</p>`},
 {kind:'Check',title:'Check yourself',q:'A recurrence has characteristic roots 3 and −3. What does the general solution look like?',
  options:['A·3ⁿ','(A + Bn)·3ⁿ','A·3ⁿ + B·(−3)ⁿ','A·3ⁿ + B·n·(−3)ⁿ'],
  answer:2, why:'The roots are distinct, so each contributes its own exponential and the solution is A·3ⁿ + B·(−3)ⁿ. The n·rⁿ form is only for a repeated root. Here the two terms have the same magnitude, so depending on A and B the sequence may grow steadily, or alternate between even-indexed terms that grow and odd-indexed terms that vanish.'}
]},

{id:16,title:'Counting Rules I',short:'Counting I',prereqs:[1],steps:[
 {kind:'Idea',title:'Count something easier that has the same size',html:`
  <p>Counting is the foundation of discrete probability, and the main technique is not formulas but <em class="v">bijection</em>: if you can pair up the objects you care about one-to-one with objects that are easier to count, the two sets have the same size.</p>
  <p>A few rules do most of the work.</p>
  <ul>
   <li><em class="v">Product rule:</em> the number of sequences whose first entry comes from a set of size <span class="m">a</span>, second from a set of size <span class="m">b</span>, and so on, is <span class="m">a·b·⋯</span>. An 8-character password over 62 symbols: <span class="m">62⁸</span>.</li>
   <li><em class="v">Sum rule:</em> for disjoint sets, sizes add.</li>
   <li><em class="v">Generalised product rule:</em> if the first choice has <span class="m">n₁</span> options, and <em>whatever you chose</em> the second has <span class="m">n₂</span>, the total is still <span class="m">n₁·n₂·⋯</span>. That gives permutations: <span class="m">n!</span> orderings of n things.</li>
   <li><em class="v">Division rule:</em> if a map sends exactly k objects to each target, the number of targets is the number of objects divided by k.</li>
  </ul>`},
 {kind:'Example',title:'From sequences to subsets to stars and bars',html:`
  <p><span class="step-n">Subsets.</span> How many k-element subsets does an n-element set have? List all <span class="m">n!</span> permutations and take the first k entries of each as a subset. Each subset appears <span class="m">k!(n−k)!</span> times — any ordering of its k elements in front, any ordering of the rest behind. By the division rule:</p>
  <span class="blk"><span class="m">C(n, k) = n! / (k!(n−k)!)</span></span>
  <p><span class="step-n">Selections with repetition.</span> A bakery sells 4 kinds of doughnut. How many ways can you buy a dozen? Order does not matter, and you can repeat kinds, so neither formula above applies.</p>
  <p>Bijection to the rescue. Encode any order as a string of 12 stars (doughnuts) and 3 bars (dividers between the kinds). <span class="m">★★★|★|★★★★★★|★★</span> means 3 of the first kind, 1 of the second, 6 of the third, 2 of the fourth. Every selection gives a distinct string, and every string of 12 stars and 3 bars gives a selection. So the answer is the number of ways to place 3 bars among 15 positions:</p>
  <span class="blk"><span class="m">C(15, 3) = 455</span></span>
  <p>That is the whole method: find a representation where the count is obvious, and prove the representation is a bijection.</p>`},
 {kind:'Try it',title:'Four ways to choose',widget:'stars',html:`
  <p>Choosing k items from n kinds gives four different counts, depending on whether order matters and whether repetition is allowed. The highlighted row is the stars-and-bars case, shown above the table as a string.</p>`},
 {kind:'Check',title:'Check yourself',q:'How many non-negative integer solutions does x₁ + x₂ + x₃ = 10 have?',
  options:['C(10, 3) = 120','3¹⁰','C(12, 2) = 66','10³'],
  answer:2, why:'A solution is a way of splitting 10 identical units among 3 variables — 10 stars and 2 bars, so C(12, 2) = 66. The trap is C(10, 3), which counts subsets of 3 distinct items from 10 and does not allow a variable to be zero or repeat.'}
]},

{id:17,title:'Counting Rules II',short:'Counting II',prereqs:[16],steps:[
 {kind:'Idea',title:'Pigeons, and fixing an overcount',html:`
  <p><span class="step-n">The pigeonhole principle.</span> If more than n objects are placed into n boxes, some box holds at least two. In the stronger form, if N objects go into n boxes, some box holds at least <span class="m">⌈N/n⌉</span>. It sounds too simple to matter and turns out to prove existence of things you could never find directly.</p>
  <p><span class="step-n">Inclusion–exclusion.</span> For overlapping sets, <span class="m">|A ∪ B| = |A| + |B| − |A ∩ B|</span>: adding the sizes counts the overlap twice, so remove it once. With three sets:</p>
  <span class="blk"><span class="m">|A∪B∪C| = |A|+|B|+|C| − |A∩B| − |A∩C| − |B∩C| + |A∩B∩C|</span></span>
  <p>The pattern continues with alternating signs over all intersections. An element in exactly j of the sets gets counted <span class="m">C(j,1) − C(j,2) + C(j,3) − ⋯ = 1</span> times, which is the binomial theorem applied to <span class="m">(1 − 1)ʲ = 0</span>.</p>`},
 {kind:'Example',title:'A surprise from pigeonholing, and counting derangements',html:`
  <p><span class="step-n">Equal subset sums.</span> Pick any 10 distinct integers between 1 and 100. Then two disjoint subsets of them have the same sum.</p>
  <p>Proof: there are <span class="m">2¹⁰ = 1024</span> subsets. Every subset sum lies between 0 and <span class="m">91 + 92 + ⋯ + 100 = 955</span>, so there are at most 956 possible sums. With 1024 subsets and 956 possible sums, two different subsets share a sum. Remove their common elements from both, and the remaining disjoint subsets still have equal sums. <span class="qed">∎</span></p>
  <p>The proof tells you such subsets exist and gives no way to find them. That is typical — and it is also why pigeonhole shows up in cryptography, where it guarantees collisions in any hash function that compresses.</p>
  <p><span class="step-n">Derangements.</span> How many permutations of n items leave <em>no</em> item in its original place? Let <span class="m">Aᵢ</span> be the permutations that fix item i. Any j of them intersect in <span class="m">(n−j)!</span> permutations, and there are <span class="m">C(n, j)</span> ways to pick which j. Inclusion–exclusion gives the number of permutations fixing <em>something</em>, and subtracting from n! leaves:</p>
  <span class="blk"><span class="m">Dₙ = n!(1 − 1/1! + 1/2! − 1/3! + ⋯ ± 1/n!) ≈ n!/e</span></span>
  <p>About 37% of permutations fix nothing, whatever n is. That number comes back in lecture 22.</p>`},
 {kind:'Try it',title:'Inclusion–exclusion, region by region',widget:'venn',html:`
  <p>Count the integers up to N divisible by at least one of three numbers. The Venn diagram shows how many land in each region; the formula below builds the same total from intersections alone.</p>`},
 {kind:'Check',title:'Check yourself',q:'In a group of 367 people, what does the pigeonhole principle guarantee?',
  options:['Nothing — birthdays are random','Two people share a birthday','Three people share a birthday','Everyone shares a birthday with someone'],
  answer:1, why:'There are at most 366 possible birthdays (counting February 29), so 367 people force at least one shared day — with certainty, not just high probability. It does not guarantee three, which would need at least 2·366 + 1 = 733 people. And it says nothing about everyone having a match.'}
]},

{id:18,title:'Probability Introduction',short:'Probability',prereqs:[17],steps:[
 {kind:'Idea',title:'Four steps that keep intuition honest',html:`
  <p>A <em class="v">sample space</em> is the set of all possible outcomes of an experiment. An <em class="v">event</em> is a subset of it. A <em class="v">probability function</em> assigns each outcome a non-negative number, the numbers sum to 1, and the probability of an event is the sum over its outcomes.</p>
  <p>Probability is notorious for problems where intuition confidently gives the wrong answer. The antidote is procedural. Every time:</p>
  <ol>
   <li>Find the sample space — usually by drawing a tree of the choices in the order they happen.</li>
   <li>Define the event of interest as a set of leaves.</li>
   <li>Find each outcome's probability by multiplying along its branch.</li>
   <li>Add up the outcomes in the event.</li>
  </ol>
  <p>It feels slow. It is also the reliable way to get these problems right.</p>`},
 {kind:'Example',title:'Three doors, and what the host knows',html:`
  <p>A prize is behind one of three doors. You pick one. The host, <em>who knows where the prize is</em>, opens one of the other two to show it is empty, then offers you the chance to switch. Should you?</p>
  <p>Draw the tree: the prize location (3 branches, 1/3 each), then your pick (3 branches, 1/3 each), then the host's door. When your pick is wrong, the host has exactly one door he can open. When it is right, he chooses between two, say at random. That gives 12 leaves.</p>
  <p>Now the event “switching wins” is exactly the set of leaves where your first pick was wrong — because then the host is forced to leave the prize behind the only other closed door. Those leaves have total probability 2/3. Staying wins with probability 1/3.</p>
  <p>The step that matters is the one people skip: the host's behaviour is part of the experiment. If instead the host opened a door <em>at random</em> and it happened to be empty, the tree has different branches and different weights, and switching wins only half the time. Same door opened, same prize hidden — different probability, because a different process produced what you saw.</p>`},
 {kind:'Try it',title:'Play it a thousand times',widget:'monty',html:`
  <p>Simulate the game under both assumptions about the host. Switching and staying are tracked in the same games, so the two bars always come from identical draws.</p>`},
 {kind:'Check',title:'Check yourself',q:'You roll two fair dice. What is the probability their sum is 7?',
  options:['1/11 — there are 11 possible sums','1/6','1/12','1/36'],
  answer:1, why:'The sample space has 36 equally likely ordered pairs, and 6 of them sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). So the probability is 6/36 = 1/6. The 1/11 answer treats the eleven sums as equally likely, but they are not — this is exactly the error that starting from the sample space prevents.'}
]},

{id:19,title:'Conditional Probability',short:'Conditioning',prereqs:[18],steps:[
 {kind:'Idea',title:'Restrict the sample space to what you know',html:`
  <p>The <em class="v">conditional probability</em> of A given B is</p>
  <span class="blk"><span class="m">P(A | B) = P(A ∩ B) / P(B)</span></span>
  <p>Read it literally: throw away every outcome outside B, then ask what fraction of the remaining probability lies in A. Learning that B happened shrinks the world you are working in.</p>
  <p>Rearranged, it gives the chain rule <span class="m">P(A ∩ B) = P(B)·P(A | B)</span> — which is exactly why you multiply along the branches of a probability tree. Each branch weight is a probability conditioned on everything above it.</p>
  <span class="blk"><span class="lbl">Bayes’ rule</span>
  Swapping the roles gives <span class="m">P(B | A) = P(A | B)·P(B) / P(A)</span>. It is how you turn “how likely is the evidence given the hypothesis” into “how likely is the hypothesis given the evidence” — and those two numbers can be wildly different.</span>`},
 {kind:'Example',title:'The accurate test that is usually wrong',html:`
  <p>A condition affects 1% of a population. A test catches 95% of real cases and raises a false alarm on 5% of healthy people. You test positive. How worried should you be?</p>
  <p>Picture 10,000 people. About 100 have the condition, and the test flags 95 of them. Of the 9,900 healthy people, 5% — about 495 — also get flagged. So 590 people test positive, and only 95 of them are real cases:</p>
  <span class="blk"><span class="m">P(case | positive) = 95 / 590 ≈ 16%</span></span>
  <p>A test that is right 95% of the time in both directions produces a positive result that is wrong about 84% of the time. Nothing about the test changed; what drives this is the base rate. When the condition is rare, even a small false-alarm rate on the enormous healthy group swamps the true alarms from the small sick group.</p>
  <p>This is the base-rate fallacy, and it shows up far beyond medicine: in intrusion detection alerts, in fraud flags, and in any screening process looking for something rare. A detector's accuracy is not the probability that a particular alert is real.</p>`},
 {kind:'Try it',title:'Turn the base rate up and down',widget:'bayes',html:`
  <p>Each small square is one person out of 1,000. Adjust how common the condition is and how good the test is, then watch the fraction of alarms that are real.</p>`},
 {kind:'Check',title:'Check yourself',q:'A family has two children, and at least one is a girl. What is the probability both are girls? (Assume each child is independently a girl with probability 1/2.)',
  options:['1/2','1/3','1/4','2/3'],
  answer:1, why:'The four equally likely outcomes are GG, GB, BG, BB. Knowing at least one is a girl rules out only BB, leaving three equally likely cases, one of which is GG — so 1/3. The intuitive answer of 1/2 is correct for a different question: “the older child is a girl,” which rules out both BG and BB. Precisely which event you conditioned on changes the answer.'}
]},

{id:20,title:'Independence',short:'Independence',prereqs:[19],steps:[
 {kind:'Idea',title:'When learning one thing tells you nothing about another',html:`
  <p>Events A and B are <em class="v">independent</em> if <span class="m">P(A ∩ B) = P(A)·P(B)</span> — equivalently, <span class="m">P(A | B) = P(A)</span>. Knowing B happened does not change the odds of A.</p>
  <p>Independence is what licenses multiplying probabilities, and it is the most frequently abused assumption in applied probability. Two components failing in the same data centre, two drives from the same manufacturing batch, two mortgages in the same housing market: each may look independent in normal times and turn out to be strongly correlated in exactly the circumstances where it matters.</p>
  <span class="blk"><span class="lbl">Pairwise is not mutual</span>
  Flip two fair coins. Let A be “first is heads,” B be “second is heads,” and C be “they match.” Every pair of these is independent. But all three together are not: if A and B both happen, C is certain. Checking independence two at a time does not establish it for the whole collection.</span>`},
 {kind:'Example',title:'The birthday problem, done properly',html:`
  <p>How many people do you need in a room for a better-than-even chance that two share a birthday? Assume 365 equally likely days, independently for each person.</p>
  <p>It is easier to compute the chance of <em>no</em> match. The first person can have any birthday. The second must avoid one day: probability <span class="m">364/365</span>. The third must avoid two, and so on. For k people:</p>
  <span class="blk"><span class="m">P(no match) = (1 − 1/365)(1 − 2/365)⋯(1 − (k−1)/365)</span></span>
  <p>Using <span class="m">1 − x ≈ e⁻ˣ</span> for small x, this is about <span class="m">e^(−k(k−1)/730)</span>. It drops below 1/2 once <span class="m">k(k−1)/2</span> passes about <span class="m">365 · ln 2 ≈ 253</span> — that is, at 23 people.</p>
  <p>The trick of the problem is that the relevant count is <em>pairs</em>, and 23 people make 253 of them. In general, with d equally likely values, collisions become likely around <span class="m">√d</span> samples. That is why a 64-bit identifier is not safe from accidental collision once you have billions of them, and why hash functions need output twice as long as the security level you want against collision attacks.</p>`},
 {kind:'Try it',title:'Find the collision threshold',widget:'birthday',html:`
  <p>Slide the number of people, or change the number of possible values to model something other than birthdays. Try 65,536 values — a 16-bit tag — and see how few samples it takes.</p>`},
 {kind:'Check',title:'Check yourself',q:'Events A and B each have probability 1/2 and are mutually exclusive (they can’t both happen). Are they independent?',
  options:['Yes — exclusive events never influence each other','No — if A happens, B certainly does not','Only if P(A) = P(B)','Only if they have equal probability of 1/2'],
  answer:1, why:'Independence requires P(A ∩ B) = P(A)·P(B) = 1/4, but mutual exclusion forces P(A ∩ B) = 0. They are about as dependent as events can be: learning that A happened tells you with certainty that B did not. “Can’t both happen” is a strong relationship, not an absence of one.'}
]},

{id:21,title:'Random Variables',short:'Random variables',prereqs:[20],steps:[
 {kind:'Idea',title:'A number attached to every outcome',html:`
  <p>A <em class="v">random variable</em> is a function from the sample space to the real numbers. Despite the name it is neither random nor a variable: it is a fixed rule that assigns a number to each outcome — the number of heads, the sum of the dice, the running time of an algorithm on a random input.</p>
  <p>Its <em class="v">distribution</em> records how likely each value is: <span class="m">P(X = x)</span> for every x. Different random variables on different experiments can share a distribution, and most of what you care about depends only on the distribution.</p>
  <p>A few distributions recur so often they have names:</p>
  <ul>
   <li><em class="v">Indicator (Bernoulli):</em> 1 if an event happens, 0 otherwise. Humble and extraordinarily useful.</li>
   <li><em class="v">Uniform:</em> every value in a finite range equally likely.</li>
   <li><em class="v">Binomial(n, p):</em> the number of successes in n independent trials, each succeeding with probability p. <span class="m">P(X = k) = C(n, k)pᵏ(1−p)ⁿ⁻ᵏ</span>.</li>
   <li><em class="v">Geometric(p):</em> the number of trials up to and including the first success.</li>
  </ul>`},
 {kind:'Example',title:'Independence for random variables, and a binomial by decomposition',html:`
  <p>Random variables X and Y are <em class="v">independent</em> if every event about X is independent of every event about Y — for all x and y, <span class="m">P(X = x and Y = y) = P(X = x)·P(Y = y)</span>.</p>
  <p>The key move with a binomial is not to stare at its formula but to take it apart. Let <span class="m">Iᵢ</span> be the indicator that trial i succeeds. Then the number of successes is simply</p>
  <span class="blk"><span class="m">X = I₁ + I₂ + ⋯ + Iₙ</span></span>
  <p>— a sum of n independent indicators. Everything about X can be read off from this. Where does the formula come from? A specific sequence with k successes has probability <span class="m">pᵏ(1−p)ⁿ⁻ᵏ</span>, and there are <span class="m">C(n, k)</span> ways to choose which trials succeed; the sum rule does the rest.</p>
  <p>Where is the distribution concentrated? The next lectures show that its mean is <span class="m">np</span> and its spread is about <span class="m">√(np(1−p))</span>. With n = 10,000 fair coin flips, you expect 5,000 heads, and a typical deviation is only about 50. Nearly all the probability lives in a sliver of the possible range — the first hint of the concentration results in lecture 24.</p>`},
 {kind:'Try it',title:'Shape a binomial distribution',widget:'binom',html:`
  <p>Change the number of trials and the success probability. Highlighted bars fall within one standard deviation of the mean.</p>`},
 {kind:'Check',title:'Check yourself',q:'X is the number of heads in 3 fair coin flips. What is P(X = 2)?',
  options:['1/3','3/8','2/3','1/4'],
  answer:1, why:'There are 8 equally likely sequences, and exactly 3 have two heads: HHT, HTH, THH. So P(X = 2) = 3/8 = C(3,2)·(1/2)³. The 1/3 answer comes from treating the four possible values 0, 1, 2, 3 as equally likely, which they are not.'}
]},

{id:22,title:'Expectation I',short:'Expectation I',prereqs:[21],steps:[
 {kind:'Idea',title:'The average value, and the theorem that makes it easy',html:`
  <p>The <em class="v">expected value</em> of a random variable is its probability-weighted average:</p>
  <span class="blk"><span class="m">E[X] = ∑ₓ x · P(X = x)</span></span>
  <p>It need not be a value X can actually take — a fair die has expectation 3.5 — and it can be pulled around by rare extreme outcomes. It is still the single most useful summary of a random variable.</p>
  <p>The fundamental tool is <em class="v">linearity of expectation</em>:</p>
  <span class="blk"><span class="m">E[X + Y] = E[X] + E[Y]</span>, and <span class="m">E[cX] = c·E[X]</span></span>
  <p>This holds <em>whether or not X and Y are independent</em>. That is the part worth underlining. Almost nothing else in probability survives dependence this gracefully.</p>
  <p>Combine it with indicators and you have a method: to find the expected number of things that happen, write the count as a sum of indicators, and add up their probabilities. For an indicator, <span class="m">E[I] = P(I = 1)</span>.</p>`},
 {kind:'Example',title:'Everyone gets a random hat back',html:`
  <p>n people check their hats, and the hats are returned in a uniformly random order. How many people get their own hat back, on average?</p>
  <p>Computing the distribution of the number of matches directly is hard — it is tied up with the derangement count from lecture 17. But the expectation is almost immediate. Let <span class="m">Iᵢ</span> indicate that person i gets their own hat. Each person is equally likely to receive any of the n hats, so <span class="m">P(Iᵢ = 1) = 1/n</span>. By linearity:</p>
  <span class="blk"><span class="m">E[matches] = E[I₁] + ⋯ + E[Iₙ] = n · (1/n) = 1</span></span>
  <p>One match on average, for any n. The indicators are thoroughly dependent — if the first n − 1 people all got their own hats, the last one is guaranteed to as well — and it does not matter.</p>
  <p>Another use: the expected number of trials until the first success, when each succeeds independently with probability p, is <span class="m">1/p</span>. If a server fails with probability 1% each hour, you expect it to last 100 hours. Condition on the first trial: with probability p you are done in 1 step, and otherwise you have used 1 step and are back where you started, so <span class="m">E = 1 + (1 − p)E</span>, giving <span class="m">E = 1/p</span>.</p>`},
 {kind:'Try it',title:'Shuffle and count the matches',widget:'hats',html:`
  <p>Simulate the hat-check. Bars show how often each number of matches occurred; the curve is the limiting distribution. Change n and watch the average refuse to move.</p>`},
 {kind:'Check',title:'Check yourself',q:'You roll a fair die 60 times. What is the expected number of rolls that come up 6, immediately after a roll that came up 6?',
  options:['10','60/36 ≈ 1.67','59/36 ≈ 1.64','It cannot be computed without knowing the dependence'],
  answer:2, why:'There are 59 adjacent pairs of rolls. Each pair is (6, 6) with probability 1/36, so by linearity the expected count is 59/36. Overlapping pairs share rolls and are not independent, but linearity does not care — which is exactly why this is quick rather than hard.'}
]},

{id:23,title:'Expectation II',short:'Expectation II',prereqs:[22],steps:[
 {kind:'Idea',title:'Breaking a waiting time into phases',html:`
  <p>Many expectations are easiest found by splitting the random process into stages and summing the expected length of each. Linearity justifies it, and the stages often turn out to be geometric random variables, whose means you already know.</p>
  <p>Two other tools belong here.</p>
  <p><em class="v">Total expectation:</em> if the events <span class="m">B₁, B₂, …</span> partition the sample space, then <span class="m">E[X] = ∑ E[X | Bᵢ]·P(Bᵢ)</span>. Condition on something that makes the problem easy, then average.</p>
  <p><em class="v">Products:</em> if X and Y are <em>independent</em>, then <span class="m">E[XY] = E[X]·E[Y]</span>. Unlike linearity, this one genuinely needs independence. If X is ±1 with equal probability and Y = X, then <span class="m">E[X]E[Y] = 0</span> but <span class="m">E[XY] = E[X²] = 1</span>.</p>
  <span class="blk"><span class="lbl">A warning about ratios</span>
  <span class="m">E[X/Y]</span> is not <span class="m">E[X]/E[Y]</span>, even when they are independent. Averaging speeds is the classic trap: driving one mile at 30 mph and another at 60 mph is not an average of 45 mph.</span>`},
 {kind:'Example',title:'Collecting every coupon',html:`
  <p>Each cereal box contains one of n coupons, uniformly at random. How many boxes do you expect to buy before you have all n?</p>
  <p>Split the collection into phases. Phase i begins when you hold i distinct coupons and ends when you get a new one. During phase i, each box has probability <span class="m">(n − i)/n</span> of being new, so the length of phase i is geometric with mean <span class="m">n/(n − i)</span>. By linearity:</p>
  <span class="blk"><span class="m">E[boxes] = n/n + n/(n−1) + ⋯ + n/1 = n·Hₙ ≈ n ln n</span></span>
  <p>For 50 coupons, about 225 boxes. The sum is back-loaded: the first few coupons come almost for free, and the last one alone takes n boxes on average.</p>
  <p>This is not really about cereal. It is how long random load balancing takes to touch every server, how many random probes it takes to hit every host on a network, and why a test suite with random inputs takes far longer to hit every branch than to hit most of them.</p>`},
 {kind:'Try it',title:'Collect a full set, 500 times',widget:'coupons',html:`
  <p>Each run keeps drawing until it has seen all n coupons. The histogram shows how many draws that took; the highlighted bar contains the theoretical mean.</p>`},
 {kind:'Check',title:'Check yourself',q:'You roll a fair die until you see a 6. On average, how many rolls does it take?',
  options:['3.5','6','5','36'],
  answer:1, why:'Each roll succeeds independently with probability 1/6, so the number of rolls is geometric with mean 1/(1/6) = 6. The 3.5 answer is the expected value of a single roll, which is a different random variable entirely.'}
]},

{id:24,title:'Large Deviations',short:'Tail bounds',prereqs:[23],steps:[
 {kind:'Idea',title:'How unlikely is it to be far from average?',html:`
  <p>Expected value says what happens on average. Engineering usually needs something stronger: an assurance that a bad outcome is rare. Tail bounds provide it, and each one trades a stronger assumption for a sharper answer.</p>
  <p><span class="step-n">Markov's inequality.</span> If X is never negative, then for any <span class="m">c &gt; 0</span>:</p>
  <span class="blk"><span class="m">P(X ≥ c) ≤ E[X] / c</span></span>
  <p>Proof in one line: <span class="m">E[X] ≥ c · P(X ≥ c)</span>, since outcomes with X ≥ c contribute at least c each and the rest contribute at least 0. It uses nothing but the mean and non-negativity — and it is correspondingly weak.</p>
  <p><span class="step-n">Chebyshev's inequality.</span> Apply Markov to <span class="m">(X − μ)²</span>. With <span class="m">Var[X] = E[(X − μ)²]</span>:</p>
  <span class="blk"><span class="m">P(|X − μ| ≥ c) ≤ Var[X] / c²</span></span>
  <p>Variance of a sum of <em>independent</em> variables is the sum of their variances, so for n coin flips it is <span class="m">n/4</span>, and the chance of being a constant fraction away from the mean shrinks like <span class="m">1/n</span>.</p>`},
 {kind:'Example',title:'Chernoff: exponentially small tails',html:`
  <p>For a sum T of independent variables each between 0 and 1, the <em class="v">Chernoff bound</em> says that for <span class="m">c ≥ 1</span>:</p>
  <span class="blk"><span class="m">P(T ≥ c·E[T]) ≤ e^(−β(c)·E[T])</span>, where <span class="m">β(c) = c ln c − c + 1</span></span>
  <p>Note what sits in the exponent: the mean itself. As the number of trials grows, the probability of exceeding the mean by any fixed fraction falls <em>exponentially</em>, not polynomially.</p>
  <p>Take 1,000 fair coin flips, so <span class="m">E[T] = 500</span>, and ask for 600 or more heads (<span class="m">c = 1.2</span>). Then <span class="m">β(1.2) ≈ 0.0188</span> and the bound is <span class="m">e^(−9.4) ≈ 8 × 10⁻⁵</span>. Markov gives <span class="m">500/600 ≈ 0.83</span>, which is useless. Chebyshev gives <span class="m">250/100² = 0.025</span>. The true probability is about <span class="m">1.4 × 10⁻¹⁰</span>, so even Chernoff is loose here — but it has the right shape, and it improves exponentially with scale.</p>
  <p>The proof idea is worth knowing: apply Markov not to T but to <span class="m">e^(λT)</span>, whose expectation factorises across independent terms, then pick the λ that gives the best bound. Independence enters exactly once, and everything depends on it.</p>`},
 {kind:'Try it',title:'Compare the three bounds',widget:'tails',html:`
  <p>Flip n fair coins and ask how likely you are to see at least some fraction of heads. The table shows what each bound can promise alongside the exact probability.</p>`},
 {kind:'Check',title:'Check yourself',q:'Response times on a server are never negative and average 100 ms. With no other information, what is the best guaranteed bound on P(response ≥ 500 ms)?',
  options:['0 — it can’t happen','At most 1/5','At most 1/25','At most e⁻⁵'],
  answer:1, why:'Markov gives P(X ≥ 500) ≤ 100/500 = 1/5, and without more information you cannot do better — there are distributions with mean 100 that hit 500 exactly one time in five. Chebyshev would need the variance; Chernoff would need a sum of independent bounded pieces. Weak assumptions give weak bounds.'}
]},

{id:25,title:'Random Walks',short:'Random walks',prereqs:[15,22],steps:[
 {kind:'Idea',title:'One step at a time, with no memory',html:`
  <p>A <em class="v">random walk</em> moves step by step, each step chosen at random independently of the past. The simplest version lives on the integers: from position x, step to <span class="m">x + 1</span> with probability p and to <span class="m">x − 1</span> with probability <span class="m">q = 1 − p</span>.</p>
  <p>Read the position as a gambler's bankroll, each step as a one-dollar bet. The question is the <em class="v">gambler's ruin</em>: starting with n dollars, betting until reaching a target of T or going broke, what is the probability of reaching T?</p>
  <p>Let <span class="m">w(n)</span> be that probability. Condition on the first bet — win it and you are at <span class="m">n + 1</span>, lose it and you are at <span class="m">n − 1</span>:</p>
  <span class="blk"><span class="m">w(n) = p·w(n+1) + q·w(n−1)</span>, with <span class="m">w(0) = 0</span> and <span class="m">w(T) = 1</span></span>
  <p>A linear recurrence — the machinery from lecture 15 applies directly.</p>`},
 {kind:'Example',title:'Solving the ruin recurrence',html:`
  <p>The characteristic equation is <span class="m">p x² − x + q = 0</span>, with roots <span class="m">1</span> and <span class="m">q/p</span>.</p>
  <p><span class="step-n">Fair game, p = 1/2.</span> The roots coincide at 1, so the solution is <span class="m">w(n) = A + Bn</span>. The boundary conditions give <span class="m">w(n) = n/T</span>. Starting with $100 and aiming for $200, you win half the time. Aiming for $1,000, you win a tenth of the time. The expected change in your fortune is exactly zero, and the probabilities adjust to keep it that way.</p>
  <p><span class="step-n">Biased game, p ≠ 1/2.</span> With distinct roots, <span class="m">w(n) = A + B(q/p)ⁿ</span>, and the boundary conditions give:</p>
  <span class="blk"><span class="m">w(n) = ((q/p)ⁿ − 1) / ((q/p)ᵀ − 1)</span></span>
  <p>Now suppose the odds are only slightly against you, like a roulette bet on red: p = 18/38 ≈ 0.474. Start with $100, aim for $200. Then <span class="m">q/p ≈ 1.11</span>, and your chance of success is about <span class="m">1/(1.11)¹⁰⁰ ≈ 0.00003</span>. A slight disadvantage per bet becomes near-certain ruin over many bets.</p>
  <p>The counterintuitive lesson: in a game biased against you, the best strategy is to bet everything at once. Every extra bet gives the house edge another chance to compound. Grinding it out with small stakes is what the house hopes you will do.</p>
  <p>Random walks reach much further than casinos: they model diffusion, drive PageRank, and underlie the analysis of randomized algorithms like the one for 2-SAT, whose expected running time is a gambler's ruin in disguise.</p>`},
 {kind:'Try it',title:'Send out a thousand gamblers',widget:'ruin',html:`
  <p>Set the starting bankroll, the target, and the per-bet probability of winning. Twelve paths are drawn; the readout reports the success rate over all 1,000 alongside the exact formula. Try p = 0.49 and see how much a 1% edge matters.</p>`},
 {kind:'Check',title:'Check yourself',q:'In a fair game (p = 1/2), you start with $10. What is your probability of reaching $1,000,000 before going broke?',
  options:['1/2 — the game is fair','1 in 100,000','1 in 1,000','0 — you will certainly go broke'],
  answer:1, why:'In a fair game w(n) = n/T = 10/1,000,000 = 1 in 100,000. Fairness means your expected fortune stays at $10, so a tiny chance of winning a million must be balanced by a very large chance of losing ten. It is not zero, but every other outcome ends in ruin — and with no target at all, a fair walk reaches zero eventually with probability 1.'}
]}
];
