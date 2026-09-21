/* ========================= widgets ========================= */
const WIDGETS={};

/* --- L1: when does an implication fail --- */
WIDGETS.implication=host=>{
  let P=true,Q=true;
  const c=el('div','lab');
  const row=el('div','controls');
  const bp=el('button','toggle','P is true'), bq=el('button','toggle','Q is true');
  bp.setAttribute('aria-pressed','true'); bq.setAttribute('aria-pressed','true');
  row.append(el('span',null,'P: “n is divisible by 4.”  Q: “n is even.”'));
  c.append(row);
  const row2=el('div','controls'); row2.append(bp,bq); c.append(row2);
  const tbl=el('div','scroller'); c.append(tbl);
  const out=el('div','readout'); c.append(out);
  function draw(){
    bp.textContent=P?'P is true':'P is false'; bq.textContent=Q?'Q is true':'Q is false';
    bp.setAttribute('aria-pressed',String(P)); bq.setAttribute('aria-pressed',String(Q));
    const rows=[[true,true],[true,false],[false,true],[false,false]];
    tbl.innerHTML='<table class="grid"><tr><th>P</th><th>Q</th><th>P ⇒ Q</th></tr>'+
      rows.map(([p,q])=>`<tr class="${p===P&&q===Q?'on':''}"><td>${p?'T':'F'}</td><td>${q?'T':'F'}</td><td>${(!p||q)?'T':'F'}</td></tr>`).join('')+'</table>';
    const val=(!P||Q);
    out.className='readout '+(val?'good':'warn');
    if(P&&!Q) out.innerHTML='<strong>The claim is false.</strong> You found a number divisible by 4 that is not even — that would be a genuine counterexample. This is the only row where an implication breaks.';
    else if(P&&Q) out.innerHTML='<strong>True, and informative.</strong> The hypothesis fires and the conclusion holds. This is the row that does the work.';
    else out.innerHTML='<strong>True, but vacuously.</strong> P is false, so the implication makes no promise at all. A statement like “every purple elephant can fly” is true for exactly this reason.';
  }
  bp.onclick=()=>{P=!P;draw();}; bq.onclick=()=>{Q=!Q;draw();};
  draw(); host.append(c);
};

/* --- L2: dominoes --- */
WIDGETS.dominoes=host=>{
  const N=12; let base=true, broken=0; // 0 = no break
  const c=el('div','lab');
  const ctr=el('div','controls');
  const bb=el('button','toggle','Base case proved');
  bb.setAttribute('aria-pressed','true');
  const sel=el('select');
  sel.innerHTML='<option value="0">every step holds</option>'+
    Array.from({length:N-1},(_,i)=>`<option value="${i+1}">step ${i+1} → ${i+2} fails</option>`).join('');
  ctr.append(bb,el('label',null,'Inductive step: ').appendChild(sel).parentNode);
  c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 700 120',class:'fig'});
  c.append(fig);
  const out=el('div','readout'); c.append(out);
  function draw(){
    bb.textContent=base?'Base case proved':'Base case unproved';
    bb.setAttribute('aria-pressed',String(base));
    fig.innerHTML='';
    let reach=base?(broken===0?N:broken):0;
    for(let i=1;i<=N;i++){
      const x=20+(i-1)*56, fell=i<=reach;
      const g=svgEl('g',{transform:fell?`translate(${x+16},96) rotate(-62) translate(${-x},-96)`:''});
      g.style.transition='transform .28s ease';
      g.append(svgEl('rect',{x:x,y:30,width:16,height:66,rx:2,
        fill:fell?'var(--accent)':'var(--raise)',stroke:fell?'var(--accent)':'var(--rule)','stroke-width':1.5}));
      fig.append(g);
      const t=svgEl('text',{x:x+8,y:114,'text-anchor':'middle','font-size':'11',
        fill:'var(--dim)','font-family':'var(--sans)'}); t.textContent=i; fig.append(t);
    }
    out.className='readout '+(reach===N?'good':'warn');
    if(!base) out.innerHTML='<strong>Nothing falls.</strong> The inductive step is a chain of conditionals — it only transmits truth, it never creates it. Without P(1) you have an infinite row of promises and nothing to trigger them.';
    else if(broken===0) out.innerHTML='<strong>All of them fall.</strong> P(1) holds, and P(k) ⇒ P(k+1) for every k. That is the whole principle: one anchor plus one uniform rule reaches every natural number.';
    else out.innerHTML=`<strong>Falls up to ${reach}, then stops.</strong> One missing link severs everything past it. This is why the inductive step has to be proved for <em>every</em> k, not for the k you happened to check.`;
  }
  bb.onclick=()=>{base=!base;draw();};
  sel.onchange=()=>{broken=+sel.value;draw();};
  draw(); host.append(c);
};

/* --- L3: stamps / Chicken McNugget --- */
WIDGETS.stamps=host=>{
  let a=3,b=5,MAX=30;
  const c=el('div','lab');
  const ctr=el('div','controls');
  const ia=el('input'); ia.type='number'; ia.value=3; ia.min=1; ia.max=12;
  const ib=el('input'); ib.type='number'; ib.value=5; ib.min=1; ib.max=12;
  const la=el('label',null,'stamp A: '), lb=el('label',null,'stamp B: ');
  la.append(ia); lb.append(ib); ctr.append(la,lb); c.append(ctr);
  const grid=el('div','cellgrid'); c.append(grid);
  const out=el('div','readout'); c.append(out);
  function draw(){
    a=Math.max(1,+ia.value||1); b=Math.max(1,+ib.value||1);
    const ok=new Array(MAX+1).fill(false); ok[0]=true;
    for(let n=1;n<=MAX;n++) ok[n]=(n>=a&&ok[n-a])||(n>=b&&ok[n-b]);
    let run=MAX+1;
    for(let n=MAX;n>=0;n--){ if(!ok[n]){run=n+1;break;} if(n===0)run=0; }
    grid.innerHTML='';
    for(let n=0;n<=MAX;n++){
      const s=el('span',ok[n]?(n>=run?'run':'hit'):'',String(n)); grid.append(s);
    }
    const g=gcd(a,b);
    out.className='readout '+(g===1?'good':'warn');
    if(g!==1) out.innerHTML=`<strong>gcd(${a}, ${b}) = ${g}.</strong> Every total is a multiple of ${g}, so infinitely many values stay out of reach no matter how far you look. Coprime denominations are what make the threshold exist.`;
    else if(run===0) out.innerHTML=`<strong>Every total is reachable, with no gaps at all.</strong> A denomination of 1 makes the problem trivial — and ordinary induction handles it, since P(n) now follows from P(n−1) alone. Try two denominations above 1 to see why the stronger hypothesis is needed.`;
    else out.innerHTML=`<strong>Everything from ${run} upward is reachable</strong> (shown in yellow), and there are gaps below it. The largest unreachable total is ${run-1} — which matches ${a}·${b} − ${a} − ${b} = ${a*b-a-b}. Ordinary induction stalls here because P(n) needs P(n−${a}) and P(n−${b}), not P(n−1).`;
  }
  ia.oninput=draw; ib.oninput=draw; draw(); host.append(c);
};

/* --- L4: Euclid + Bezout --- */
WIDGETS.euclid=host=>{
  const c=el('div','lab');
  const ctr=el('div','controls');
  const ia=el('input'); ia.type='number'; ia.value=1387; ia.min=1;
  const ib=el('input'); ib.type='number'; ib.value=629; ib.min=1;
  const la=el('label',null,'a = '), lb=el('label',null,'b = ');
  la.append(ia); lb.append(ib);
  const go=el('button','btn key','Run the algorithm');
  ctr.append(la,lb,go); c.append(ctr);
  const tbl=el('div','scroller'); c.append(tbl);
  const out=el('div','readout'); c.append(out);
  function draw(){
    let a=Math.max(1,Math.floor(+ia.value||1)), b=Math.max(1,Math.floor(+ib.value||1));
    const A=a,B=b; const rows=[];
    let x0=1,y0=0,x1=0,y1=1;
    while(b>0){
      const q=Math.floor(a/b), r=a%b;
      rows.push({a,b,q,r});
      [a,b]=[b,r];
      [x0,x1]=[x1,x0-q*x1]; [y0,y1]=[y1,y0-q*y1];
    }
    tbl.innerHTML='<table class="grid"><tr><th>a</th><th>b</th><th>a = q·b + r</th><th>r</th></tr>'+
      rows.map(r=>`<tr><td>${r.a}</td><td>${r.b}</td><td>${r.a} = ${r.q}·${r.b} + ${r.r}</td><td>${r.r}</td></tr>`).join('')+'</table>';
    out.className='readout good';
    out.innerHTML=`<strong>gcd(${A}, ${B}) = ${a}</strong> in ${rows.length} divisions. `+
      `Running the bookkeeping backwards gives ${x0}·${A} + ${y0}·${B} = ${x0*A+y0*B}, `+
      `so the gcd is an integer combination of the two inputs. That is the fact everything downstream leans on: `+
      `the set of integer combinations of ${A} and ${B} is exactly the set of multiples of ${a}.`;
  }
  go.onclick=draw; draw(); host.append(c);
};

/* --- L5: modular arithmetic + inverse --- */
WIDGETS.modular=host=>{
  const c=el('div','lab');
  const ctr=el('div','controls');
  const ia=el('input'); ia.type='number'; ia.value=7; ia.min=1;
  const im=el('input'); im.type='number'; im.value=26; im.min=2;
  const la=el('label',null,'a = '), lm=el('label',null,'modulus n = ');
  la.append(ia); lm.append(im); ctr.append(la,lm); c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 260 260',class:'fig',style:'max-width:260px;margin:8px 0'});
  c.append(fig);
  const out=el('div','readout'); c.append(out);
  function draw(){
    const a=Math.max(1,Math.floor(+ia.value||1)), n=Math.max(2,Math.floor(+im.value||2));
    fig.innerHTML='';
    fig.append(svgEl('circle',{cx:130,cy:130,r:100,fill:'none',stroke:'var(--rule)','stroke-width':1.5}));
    const hits=new Set(); let k=0,v=0, inv=null;
    for(k=1;k<=n;k++){ v=(a*k)%n; hits.add(v); if(v===1&&inv===null)inv=k; if(v===0)break; }
    for(let i=0;i<n;i++){
      const ang=-Math.PI/2+2*Math.PI*i/n, x=130+100*Math.cos(ang), y=130+100*Math.sin(ang);
      const on=hits.has(i);
      fig.append(svgEl('circle',{cx:x,cy:y,r:n<=30?7:3,fill:on?'var(--accent)':'var(--raise)',
        stroke:on?'var(--accent)':'var(--rule)','stroke-width':1.2}));
      if(n<=26){
        const t=svgEl('text',{x:130+122*Math.cos(ang),y:130+122*Math.sin(ang)+4,'text-anchor':'middle',
          'font-size':'10',fill:on?'var(--chalk)':'var(--dim)','font-family':'var(--sans)'});
        t.textContent=i; fig.append(t);
      }
    }
    const g=gcd(a,n);
    out.className='readout '+(g===1?'good':'warn');
    if(g===1) out.innerHTML=`<strong>${a} has an inverse mod ${n}: it is ${inv}</strong>, since ${a}·${inv} = ${a*inv} ≡ 1 (mod ${n}). `+
      `Because gcd(${a}, ${n}) = 1, multiplying by ${a} permutes all ${n} residues — every point on the circle is lit. `+
      `Multiplication by ${a} is a reversible scrambling, which is exactly what a cipher needs.`;
    else out.innerHTML=`<strong>${a} has no inverse mod ${n}</strong>, because gcd(${a}, ${n}) = ${g} > 1. `+
      `Multiplying by ${a} collapses the ${n} residues onto just ${hits.size} of them, so information is destroyed and nothing can undo it. `+
      `Invertibility and coprimality are the same condition.`;
  }
  ia.oninput=draw; im.oninput=draw; draw(); host.append(c);
};

/* --- L6: graph colouring --- */
WIDGETS.colouring=host=>{
  const NODES=[['Algebra',60,60],['Bio',200,40],['Chem',150,160],['Discrete',300,140],
               ['Econ',430,70],['French',520,180],['Geology',390,240]];
  const E=[[0,1],[0,2],[1,2],[2,3],[1,3],[3,4],[4,5],[5,6],[4,6],[3,6]];
  const PAL=['var(--raise)','var(--accent)','var(--rose)','var(--ok)','var(--bad)'];
  const NAME=['unassigned','slot 1','slot 2','slot 3','slot 4'];
  let col=NODES.map(()=>0);
  const c=el('div','lab');
  const ctr=el('div','controls');
  const clr=el('button','btn','Clear all');
  ctr.append(el('span',null,'Click an exam to move it to the next time slot. Two exams joined by a line share a student.'),clr);
  c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 580 290',class:'fig'});
  c.append(fig);
  const out=el('div','readout'); c.append(out);
  function draw(){
    fig.innerHTML='';
    E.forEach(([a,b])=>{
      const bad = col[a]!==0 && col[a]===col[b];
      fig.append(svgEl('line',{x1:NODES[a][1],y1:NODES[a][2],x2:NODES[b][1],y2:NODES[b][2],
        stroke:bad?'var(--bad)':'var(--rule)','stroke-width':bad?3:1.5}));
    });
    NODES.forEach((n,i)=>{
      const g=svgEl('g',{class:'nd',tabindex:'0',role:'button','aria-label':n[0]+', '+NAME[col[i]]});
      g.append(svgEl('circle',{cx:n[1],cy:n[2],r:26,fill:PAL[col[i]],stroke:'var(--rule)','stroke-width':1.5}));
      const t=svgEl('text',{x:n[1],y:n[2]+44,'text-anchor':'middle','font-size':'12',
        fill:'var(--dim)','font-family':'var(--sans)'}); t.textContent=n[0];
      const k=svgEl('text',{x:n[1],y:n[2]+5,'text-anchor':'middle','font-size':'13','font-weight':'600',
        fill:col[i]?'var(--board)':'var(--dim)','font-family':'var(--sans)'});
      k.textContent=col[i]||'–';
      g.append(t,k);
      const hit=()=>{col[i]=(col[i]+1)%5;draw();};
      g.addEventListener('click',hit);
      g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();hit();}});
      fig.append(g);
    });
    const conflicts=E.filter(([a,b])=>col[a]!==0&&col[a]===col[b]).length;
    const used=new Set(col.filter(x=>x)).size;
    const unassigned=col.filter(x=>x===0).length;
    if(unassigned) {out.className='readout'; out.innerHTML=`${unassigned} exam${unassigned>1?'s':''} still unscheduled. ${conflicts?`<strong>${conflicts} clash${conflicts>1?'es':''}</strong> so far.`:'No clashes yet.'}`;}
    else if(conflicts){out.className='readout warn'; out.innerHTML=`<strong>${conflicts} clash${conflicts>1?'es':''}</strong> — some student sits two exams at once. The red lines show where.`;}
    else if(used>3){out.className='readout'; out.innerHTML=`<strong>Valid, using ${used} slots.</strong> It can be done in three. Look for the triangles: any three mutually-connected exams force three distinct slots, but nothing here forces a fourth.`;}
    else {out.className='readout good'; out.innerHTML=`<strong>Three slots, no clashes — that is optimal.</strong> The graph contains a triangle, so χ(G) ≥ 3; you have just shown χ(G) ≤ 3. Finding the chromatic number of an arbitrary graph is NP-hard, which is why real exam timetables are built by heuristic.`;}
  }
  clr.onclick=()=>{col=NODES.map(()=>0);draw();};
  draw(); host.append(c);
};

/* --- L7: Gale-Shapley --- */
WIDGETS.stable=host=>{
  const P=['Ana','Ben','Cleo','Dev'], R=['Rook','Sable','Tern','Vale'];
  const PP=[[0,1,2,3],[1,0,3,2],[0,1,3,2],[1,2,0,3]];
  const RP=[[3,2,1,0],[0,1,3,2],[1,0,2,3],[0,1,2,3]];
  let next,match,log,done;
  const c=el('div','lab');
  const ctr=el('div','controls');
  const step=el('button','btn key','Next proposal'), run=el('button','btn','Run to completion'), rst=el('button','btn','Reset');
  ctr.append(step,run,rst); c.append(ctr);
  const tbl=el('div','scroller'); c.append(tbl);
  const out=el('div','readout'); c.append(out);
  function reset(){ next=[0,0,0,0]; match=[null,null,null,null]; log=[]; done=false; draw(); }
  function one(){
    if(done)return;
    const free=P.map((_,i)=>i).filter(i=>!match.includes(i));
    if(!free.length){done=true;draw();return;}
    const p=free[0], r=PP[p][next[p]]; next[p]++;
    const cur=match[r];
    if(cur===null){ match[r]=p; log.push(`${P[p]} proposes to ${R[r]}, who is free and accepts.`); }
    else if(RP[r].indexOf(p)<RP[r].indexOf(cur)){ match[r]=p; log.push(`${P[p]} proposes to ${R[r]}, who prefers ${P[p]} over ${P[cur]} and trades up. ${P[cur]} is free again.`); }
    else { log.push(`${P[p]} proposes to ${R[r]}, who already has ${P[cur]} and turns ${P[p]} down.`); }
    if(!P.map((_,i)=>i).filter(i=>!match.includes(i)).length) done=true;
    draw();
  }
  function draw(){
    tbl.innerHTML='<table class="grid"><tr><th></th><th>prefers, in order</th><th>currently held by</th></tr>'+
      R.map((r,i)=>`<tr class="${match[i]!==null?'on':''}"><td>${r}</td><td>${RP[i].map(x=>P[x]).join(' › ')}</td><td>${match[i]===null?'—':P[match[i]]}</td></tr>`).join('')+
      '</table><table class="grid" style="margin-top:10px"><tr><th></th><th>proposes down this list</th></tr>'+
      P.map((p,i)=>`<tr><td>${p}</td><td>${PP[i].map((x,j)=>j<next[i]?`<s>${R[x]}</s>`:R[x]).join(' › ')}</td></tr>`).join('')+'</table>';
    step.disabled=done; run.disabled=done;
    out.className='readout '+(done?'good':'');
    out.innerHTML=(log.length?log.slice(-3).join('<br>'):'Every proposer starts free and works down their own list.')+
      (done?'<br><br><strong>Matched and stable.</strong> No pair would both rather leave their partners for each other: any receiver a proposer prefers to their current match has already rejected them for someone better.':'');
  }
  step.onclick=one; rst.onclick=reset;
  run.onclick=()=>{let g=0;while(!done&&g++<60)one();};
  reset(); host.append(c);
};

/* --- L8: Kruskal --- */
WIDGETS.mst=host=>{
  const N=[['A',60,50],['B',200,40],['C',130,160],['D',280,150],['E',400,60],['F',450,180]];
  const E=[[0,1,4],[0,2,3],[1,2,1],[1,3,5],[2,3,2],[2,4,6],[3,4,7],[3,5,8],[4,5,3]];
  let chosen=[], parent=[];
  const c=el('div','lab');
  const ctr=el('div','controls');
  const rst=el('button','btn','Start over');
  ctr.append(el('span',null,'Click edges to build a spanning tree as cheaply as you can.'),rst); c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 520 230',class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  const find=x=>parent[x]===x?x:(parent[x]=find(parent[x]));
  function rebuild(){ parent=N.map((_,i)=>i); chosen.forEach(k=>{const [a,b]=E[k];parent[find(a)]=find(b);}); }
  function draw(msg){
    rebuild();
    fig.innerHTML='';
    E.forEach(([a,b,w],k)=>{
      const on=chosen.includes(k);
      const g=svgEl('g',{class:'nd',tabindex:'0',role:'button','aria-label':`edge ${N[a][0]}–${N[b][0]}, weight ${w}`});
      g.append(svgEl('line',{x1:N[a][1],y1:N[a][2],x2:N[b][1],y2:N[b][2],
        stroke:on?'var(--accent)':'var(--rule)','stroke-width':on?4:1.5}));
      g.append(svgEl('line',{x1:N[a][1],y1:N[a][2],x2:N[b][1],y2:N[b][2],stroke:'transparent','stroke-width':16}));
      const mx=(N[a][1]+N[b][1])/2, my=(N[a][2]+N[b][2])/2;
      g.append(svgEl('circle',{cx:mx,cy:my,r:11,fill:'var(--panel)',stroke:on?'var(--accent)':'var(--rule)'}));
      const t=svgEl('text',{x:mx,y:my+4,'text-anchor':'middle','font-size':'11',
        fill:on?'var(--accent)':'var(--dim)','font-family':'var(--sans)'}); t.textContent=w;
      g.append(t);
      const hit=()=>{
        if(chosen.includes(k)){chosen=chosen.filter(z=>z!==k);draw('Edge removed.');return;}
        rebuild();
        if(find(a)===find(b)){draw(`Adding ${N[a][0]}–${N[b][0]} would close a cycle, so it cannot be in any tree.`);return;}
        chosen.push(k); draw(null);
      };
      g.addEventListener('click',hit);
      g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();hit();}});
      fig.append(g);
    });
    N.forEach(n=>{
      fig.append(svgEl('circle',{cx:n[1],cy:n[2],r:18,fill:'var(--raise)',stroke:'var(--rule)','stroke-width':1.5}));
      const t=svgEl('text',{x:n[1],y:n[2]+5,'text-anchor':'middle','font-size':'13',
        fill:'var(--chalk)','font-family':'var(--sans)'}); t.textContent=n[0]; fig.append(t);
    });
    const total=chosen.reduce((s,k)=>s+E[k][2],0);
    if(msg){out.className='readout warn'; out.innerHTML=msg; return;}
    if(chosen.length<N.length-1){out.className='readout'; out.innerHTML=`${chosen.length} of ${N.length-1} edges, weight ${total} so far.`;}
    else if(total===15){out.className='readout good'; out.innerHTML=`<strong>Weight 15 — that is the minimum.</strong> Taking the cheapest edge that does not close a cycle, every time, is provably optimal. The reason is the cut property: for any way of splitting the vertices in two, the lightest edge crossing the split belongs to some minimum spanning tree.`;}
    else {out.className='readout warn'; out.innerHTML=`<strong>A spanning tree of weight ${total}.</strong> Valid, but not minimal — 15 is achievable. Try always taking the cheapest edge that does not close a cycle.`;}
  }
  rst.onclick=()=>{chosen=[];draw(null);};
  draw(null); host.append(c);
};

/* --- L9: network comparison --- */
WIDGETS.networks=host=>{
  let k=3;
  const c=el('div','lab');
  const ctr=el('div','controls');
  const sl=el('input'); sl.type='range'; sl.min=1; sl.max=10; sl.value=3;
  const lab=el('label',null,'inputs N = '); lab.append(sl);
  const nread=el('span',null,''); ctr.append(lab,nread); c.append(ctr);
  const tbl=el('div','scroller'); c.append(tbl);
  const out=el('div','readout'); c.append(out);
  const fmt=x=>x>=1e6?x.toExponential(2):x.toLocaleString();
  function draw(){
    k=+sl.value; const N=2**k;
    nread.textContent=`2^${k} = ${fmt(N)}`;
    const rows=[
      ['Complete binary tree',2*k+2,2*N-1,N],
      ['2-D array',2*N,N*N,1],
      ['Butterfly',k+2,N*(k+1),Math.round(Math.sqrt(N))],
      ['Beneš',2*k+1,2*N*k,1]
    ];
    tbl.innerHTML='<table class="grid"><tr><th>network</th><th>diameter</th><th>switches</th><th>congestion</th></tr>'+
      rows.map(r=>`<tr><td style="text-align:left">${r[0]}</td><td>${fmt(r[1])}</td><td>${fmt(r[2])}</td><td>${fmt(r[3])}</td></tr>`).join('')+'</table>';
    out.className='readout good';
    out.innerHTML=`At N = ${fmt(N)}: the tree is cheap (${fmt(2*N-1)} switches) but every message funnels through one root, so congestion is ${fmt(N)}. `+
      `The array fixes congestion completely and pays ${fmt(N*N)} switches for it. `+
      `The butterfly lands in between — ${fmt(N*(k+1))} switches, congestion about ${fmt(Math.round(Math.sqrt(N)))}. `+
      `Beneš gets congestion 1 with only ${fmt(2*N*k)} switches, which is the result that makes the whole lecture worth sitting through.`;
  }
  sl.oninput=draw; draw(); host.append(c);
};

/* --- L10: planarity by hand --- */
WIDGETS.planar=host=>{
  const GRAPHS={
    'cube (planar)':{v:8,e:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],
      p:[[70,50],[230,50],[230,180],[70,180],[120,90],[180,90],[180,145],[120,145]]},
    'K₅':{v:5,e:[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],
      p:[[150,35],[255,110],[215,200],[85,200],[45,110]]},
    'K₃,₃':{v:6,e:[[0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5]],
      p:[[60,50],[150,50],[240,50],[60,190],[150,190],[240,190]]}
  };
  let name='cube (planar)', pts=GRAPHS[name].p.map(p=>[...p]);
  const c=el('div','lab');
  const ctr=el('div','controls');
  const sel=el('select'); sel.innerHTML=Object.keys(GRAPHS).map(k=>`<option>${k}</option>`).join('');
  const l=el('label',null,'graph: '); l.append(sel);
  const rst=el('button','btn','Reset positions');
  ctr.append(l,rst,el('span',null,'Drag the vertices to remove crossings.')); c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 300 240',class:'fig',style:'max-width:340px'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function seg(p,q,r,s){
    const d=(a,b,cc)=>Math.sign((b[0]-a[0])*(cc[1]-a[1])-(b[1]-a[1])*(cc[0]-a[0]));
    const d1=d(p,q,r),d2=d(p,q,s),d3=d(r,s,p),d4=d(r,s,q);
    return d1!==d2&&d3!==d4&&d1!==0&&d2!==0&&d3!==0&&d4!==0;
  }
  function crossings(){
    const E=GRAPHS[name].e; let n=0;
    for(let i=0;i<E.length;i++)for(let j=i+1;j<E.length;j++){
      const a=E[i],b=E[j];
      if(a[0]===b[0]||a[0]===b[1]||a[1]===b[0]||a[1]===b[1])continue;
      if(seg(pts[a[0]],pts[a[1]],pts[b[0]],pts[b[1]]))n++;
    }
    return n;
  }
  function toSvg(evt){
    const r=fig.getBoundingClientRect(), vb=fig.viewBox.baseVal;
    return [(evt.clientX-r.left)/r.width*vb.width,(evt.clientY-r.top)/r.height*vb.height];
  }
  function draw(){
    const G=GRAPHS[name]; fig.innerHTML='';
    G.e.forEach(([a,b])=>fig.append(svgEl('line',{x1:pts[a][0],y1:pts[a][1],x2:pts[b][0],y2:pts[b][1],
      stroke:'var(--rule)','stroke-width':1.6})));
    pts.forEach((p,i)=>{
      const cir=svgEl('circle',{cx:p[0],cy:p[1],r:11,fill:'var(--accent)',stroke:'var(--panel)',
        'stroke-width':2,style:'cursor:grab',tabindex:'0'});
      cir.addEventListener('pointerdown',e=>{
        e.preventDefault(); cir.setPointerCapture(e.pointerId);
        const move=ev=>{const [x,y]=toSvg(ev); pts[i]=[Math.max(14,Math.min(286,x)),Math.max(14,Math.min(226,y))]; draw();};
        const up=()=>{fig.removeEventListener('pointermove',move);fig.removeEventListener('pointerup',up);};
        fig.addEventListener('pointermove',move); fig.addEventListener('pointerup',up);
      });
      cir.addEventListener('keydown',e=>{
        const d={ArrowLeft:[-8,0],ArrowRight:[8,0],ArrowUp:[0,-8],ArrowDown:[0,8]}[e.key];
        if(d){e.preventDefault();pts[i]=[pts[i][0]+d[0],pts[i][1]+d[1]];draw();}
      });
      fig.append(cir);
    });
    const G2=GRAPHS[name], x=crossings(), v=G2.v, e=G2.e.length;
    if(x===0){
      out.className='readout good';
      out.innerHTML=`<strong>No crossings.</strong> With v = ${v} and e = ${e}, Euler's formula gives f = e − v + 2 = ${e-v+2} faces, counting the unbounded outer one. Check it against the drawing.`;
    } else {
      out.className='readout warn';
      const bound = name==='K₅' ? '3v − 6 = 9' : name==='K₃,₃' ? '2v − 4 = 8' : null;
      out.innerHTML=`<strong>${x} crossing${x>1?'s':''}.</strong> `+
        (bound ? `You will not reach zero: Euler's formula caps a planar ${name==='K₅'?'simple graph':'triangle-free graph'} at ${bound} edges, and this one has ${e}. The obstruction is arithmetic, not a lack of cleverness.`
               : `Keep going — this one can be drawn flat.`);
    }
  }
  sel.onchange=()=>{name=sel.value; pts=GRAPHS[name].p.map(p=>[...p]); draw();};
  rst.onclick=()=>{pts=GRAPHS[name].p.map(p=>[...p]);draw();};
  draw(); host.append(c);
};

/* ========================= helpers for 11–25 ========================= */
function inp(ctr,label,val,o={}){
  const l=el('label',null,label), i=el('input'); i.type=o.type||'number'; i.value=val;
  ['min','max','step'].forEach(k=>{if(o[k]!=null)i[k]=o[k];});
  l.append(i);
  if(i.type==='range'){const sp=el('span',null,String(val)); sp.style.minWidth='3.5em'; sp.style.color='var(--chalk)'; l.append(sp); i._show=sp;}
  ctr.append(l); return i;
}
const val=i=>{const v=+i.value; if(i._show)i._show.textContent=i._fmt?i._fmt(v):String(v); return v;};
function bars(fig,vals,o={}){
  const w=o.w||560,h=o.h||170; fig.setAttribute('viewBox',`0 0 ${w} ${h+26}`); fig.innerHTML='';
  const m=o.max||Math.max(...vals,1e-12), bw=w/vals.length;
  vals.forEach((v,i)=>{const bh=Math.max(0,v/m*h);
    fig.append(svgEl('rect',{x:i*bw+bw*.08,y:h-bh,width:Math.max(1,bw*.84),height:bh,
      fill:o.hl&&o.hl(i)?'var(--accent)':'var(--rule)'}));});
  (o.labels||[]).forEach(([i,t])=>{const tx=svgEl('text',{x:i*bw+bw/2,y:h+17,'text-anchor':'middle',
    'font-size':'11',fill:'var(--dim)','font-family':'var(--sans)'});tx.textContent=t;fig.append(tx);});
  if(o.overlay){ // overlay points (same scale)
    const d=o.overlay.map((v,i)=>`${i?'L':'M'}${i*bw+bw/2},${h-v/m*h}`).join(' ');
    fig.append(svgEl('path',{d,fill:'none',stroke:'var(--rose)','stroke-width':2}));
    o.overlay.forEach((v,i)=>fig.append(svgEl('circle',{cx:i*bw+bw/2,cy:h-v/m*h,r:3,fill:'var(--rose)'})));
  }
}
const LF=[0]; for(let i=1;i<=4000;i++)LF[i]=LF[i-1]+Math.log(i);
const lchoose=(n,k)=>LF[n]-LF[k]-LF[n-k];
function bigChoose(n,k){ if(k<0||k>n)return 0n; let r=1n; for(let i=1n;i<=BigInt(k);i++){r=r*(BigInt(n)-BigInt(k)+i)/i;} return r; }
function sci(logv){ // log (natural) -> pretty
  const l10=logv/Math.LN10; if(l10<6) return Math.round(Math.exp(logv)).toLocaleString();
  const e=Math.floor(l10), m=10**(l10-e); return `${m.toFixed(3)} × 10<sup>${e}</sup>`;
}
const pct=(x,d=1)=>(100*x).toFixed(d)+'%';
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

/* --- L11: scheduling a DAG --- */
WIDGETS.schedule=host=>{
  const T=['spec','schema','API','UI','auth','migrate','tests','docs','deploy','announce'];
  const D=[[0,1],[0,2],[0,3],[1,5],[2,4],[2,6],[3,6],[4,6],[6,8],[5,8],[0,7],[8,9],[7,9]];
  const pre=T.map((_,i)=>D.filter(e=>e[1]===i).map(e=>e[0]));
  const depthBelow=T.map(()=>0);
  (function(){ for(let r=0;r<T.length;r++) for(const [a,b] of D) depthBelow[a]=Math.max(depthBelow[a],depthBelow[b]+1); })();
  const chain=Math.max(...depthBelow)+1;
  const c=el('div','lab'); const ctr=el('div','controls');
  const pr=inp(ctr,'processors ',2,{type:'range',min:1,max:5});
  c.append(ctr);
  c.append(el('p',null,'<span class="step-n">Constraints:</span> '+D.map(([a,b])=>`${T[a]} ≺ ${T[b]}`).join(', ')));
  const tbl=el('div','scroller'); c.append(tbl);
  const out=el('div','readout'); c.append(out);
  function draw(){
    const p=val(pr), done=new Set(), steps=[];
    while(done.size<T.length){
      const ready=T.map((_,i)=>i).filter(i=>!done.has(i)&&pre[i].every(x=>done.has(x)))
        .sort((a,b)=>depthBelow[b]-depthBelow[a]).slice(0,p);
      ready.forEach(i=>done.add(i)); steps.push(ready);
    }
    tbl.innerHTML='<table class="grid"><tr><th>time step</th><th>running in parallel</th></tr>'+
      steps.map((s,i)=>`<tr><td>${i+1}</td><td style="text-align:left">${s.map(x=>T[x]).join(', ')}</td></tr>`).join('')+'</table>';
    const lb=Math.max(chain,Math.ceil(T.length/p));
    out.className='readout '+(steps.length===lb?'good':'');
    out.innerHTML=`<strong>${steps.length} steps with ${p} processor${p>1?'s':''}.</strong> Two lower bounds apply to any schedule: the longest chain (${chain} tasks, each waiting on the last) and the work bound ⌈${T.length}/${p}⌉ = ${Math.ceil(T.length/p)}. `+
      (steps.length===lb?`This schedule meets the larger of them, so it is optimal.`:`This schedule is ${steps.length-lb} step${steps.length-lb>1?'s':''} above that bound.`)+
      (p>=4?` Adding processors past this point buys nothing — the chain is now the binding constraint.`:'');
  }
  pr.oninput=draw; draw(); host.append(c);
};

/* --- L12: book stacking --- */
WIDGETS.books=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const nb=inp(ctr,'books ',4,{type:'range',min:1,max:40}); c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 560 240',class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function draw(){
    const n=val(nb), U=120, edge=230, H=200/Math.max(n,8);
    fig.innerHTML='';
    fig.append(svgEl('rect',{x:0,y:210,width:edge,height:30,fill:'var(--raise)',stroke:'var(--rule)'}));
    fig.append(svgEl('line',{x1:edge,y1:0,x2:edge,y2:240,stroke:'var(--rule)','stroke-dasharray':'4 4'}));
    let right=0; const ends=[];
    for(let k=n;k>=1;k--){ right+=1/(2*k); ends.push(right); }
    ends.forEach((r,idx)=>{ // idx 0 = bottom book
      const x=edge+r*U-U, y=210-(idx+1)*H;
      fig.append(svgEl('rect',{x,y,width:U,height:H-1,fill:idx===n-1?'var(--accent)':'var(--panel)',stroke:'var(--chalk)','stroke-width':.8}));
    });
    const Hn=ends[ends.length-1];
    let need2=0,s=0; while(s<2){need2++; s+=1/(2*need2);}
    out.className='readout '+(Hn>1?'good':'');
    out.innerHTML=`<strong>Overhang: ${Hn.toFixed(4)} book-lengths</strong> = H<sub>${n}</sub>/2, half the ${n}th harmonic number. `+
      (Hn>1?`The top book now sits entirely beyond the table edge. `:`Four books is enough to push the top book entirely past the edge. `)+
      `Because H<sub>n</sub> grows like ln n, any overhang is possible — but slowly: two full lengths needs ${need2} books, and ten lengths would need roughly 2.7 × 10<sup>8</sup>.`;
  }
  nb.oninput=draw; draw(); host.append(c);
};

/* --- L13: Stirling --- */
WIDGETS.stirling=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const ni=inp(ctr,'n = ',10,{type:'range',min:1,max:1000}); c.append(ctr);
  const out=el('div','readout'); c.append(out);
  c.append(el('p','step-n','Percentage error of Stirling’s formula for n = 1 to 30'));
  const fig=svgEl('svg',{class:'fig'}); c.append(fig);
  const st=n=>0.5*Math.log(2*Math.PI*n)+n*Math.log(n)-n;
  function draw(){
    const n=val(ni), ex=LF[n], ap=st(n), ratio=Math.exp(ex-ap);
    out.className='readout good';
    out.innerHTML=`<strong>${n}! = ${sci(ex)}</strong><br>√(2πn)(n/e)<sup>n</sup> = ${sci(ap)}<br>`+
      `ratio = ${ratio.toFixed(8)}, compared with the predicted correction 1 + 1/(12n) = ${(1+1/(12*n)).toFixed(8)}. `+
      `The relative error shrinks to zero, but the absolute error — about n!/(12n) — grows without bound. That is exactly what n! ∼ √(2πn)(n/e)<sup>n</sup> promises, and exactly what it does not.`;
    const errs=Array.from({length:30},(_,i)=>100*(1-Math.exp(st(i+1)-LF[i+1])));
    bars(fig,errs,{hl:i=>i+1===n,labels:[[0,'1'],[9,'10'],[19,'20'],[29,'30']]});
  }
  ni.oninput=draw; draw(); host.append(c);
};

/* --- L14: recursion tree --- */
WIDGETS.rtree=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const ai=inp(ctr,'a = ',2,{type:'range',min:1,max:9});
  const bi=inp(ctr,'b = ',2,{type:'range',min:2,max:4});
  const di=inp(ctr,'d = ',1,{type:'range',min:0,max:3});
  c.append(ctr);
  const eq=el('p',null,''); c.append(eq);
  const fig=svgEl('svg',{class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function draw(){
    const a=val(ai),b=val(bi),d=val(di),L=7;
    eq.innerHTML=`<span class="m">T(n) = ${a===1?'':a}T(n/${b}) + ${d===0?'1':d===1?'n':'n<sup>'+d+'</sup>'}</span>, drawn for n = ${b}<sup>${L}</sup>. Each bar is the total work done at one depth of the recursion.`;
    const w=Array.from({length:L+1},(_,i)=>a**i*(b**(L-i))**d);
    bars(fig,w,{hl:i=>w[i]===Math.max(...w),labels:w.map((_,i)=>[i,i===0?'root':i===L?'leaves':String(i)])});
    const r=a/b**d, ex=Math.log(a)/Math.log(b);
    out.className='readout good';
    if(Math.abs(r-1)<1e-9) out.innerHTML=`<strong>a / b<sup>d</sup> = 1: every level does the same work.</strong> There are log n levels, so T(n) = Θ(n<sup>${d}</sup> log n). Merge sort lives here.`;
    else if(r<1) out.innerHTML=`<strong>a / b<sup>d</sup> = ${r.toFixed(3)} &lt; 1: work shrinks geometrically going down.</strong> The root dominates and the whole tree costs a constant factor more than it, so T(n) = Θ(n<sup>${d}</sup>).`;
    else out.innerHTML=`<strong>a / b<sup>d</sup> = ${r.toFixed(3)} &gt; 1: work grows geometrically going down.</strong> The leaves dominate: there are a<sup>log<sub>b</sub> n</sup> = n<sup>log<sub>${b}</sub>${a}</sup> of them, so T(n) = Θ(n<sup>${ex.toFixed(3)}</sup>). Karatsuba (a = 3, b = 2, d = 1) lands here, beating the schoolbook n².`;
  }
  [ai,bi,di].forEach(i=>i.oninput=draw); draw(); host.append(c);
};

/* --- L15: linear recurrence --- */
WIDGETS.linrec=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const c1=inp(ctr,'f(n) = ',1,{min:-5,max:5}); const c2=inp(ctr,'· f(n−1) + ',1,{min:-5,max:5});
  ctr.append(el('span',null,'· f(n−2)'));
  const f0=inp(ctr,'f(0) = ',0,{min:-20,max:20}); const f1=inp(ctr,'f(1) = ',1,{min:-20,max:20});
  c.append(ctr);
  const seq=el('div','cellgrid'); c.append(seq);
  const out=el('div','readout'); c.append(out);
  const f=x=>Math.abs(x-Math.round(x))<1e-9?String(Math.round(x)):x.toFixed(4);
  function draw(){
    const A=+c1.value||0,B=+c2.value||0,x0=+f0.value||0,x1=+f1.value||0;
    const t=[x0,x1]; for(let i=2;i<16;i++)t.push(A*t[i-1]+B*t[i-2]);
    seq.innerHTML=t.map(v=>`<span style="width:auto;padding:5px 8px">${Math.abs(v)>1e7?v.toExponential(2):v}</span>`).join('');
    const disc=A*A+4*B;
    let msg=`Characteristic equation: <span class="m">x² = ${A}x + ${B}</span>, discriminant ${disc}. `;
    if(disc>0){
      const r1=(A+Math.sqrt(disc))/2, r2=(A-Math.sqrt(disc))/2;
      const Bc=(x1-r1*x0)/(r2-r1), Ac=x0-Bc;
      msg+=`Roots ${f(r1)} and ${f(r2)}, so <span class="m">f(n) = ${f(Ac)}·(${f(r1)})<sup>n</sup> + ${f(Bc)}·(${f(r2)})<sup>n</sup></span>. `+
        (Math.abs(Ac)>1e-12&&Math.abs(r1)>Math.abs(r2)?`The larger root takes over: the ratio of successive terms tends to ${f(r1)}.`:'');
      out.className='readout good';
    } else if(disc===0){
      const r=A/2; const Ac=x0, Bc=r?(x1/r-x0):0;
      msg+=`A repeated root at ${f(r)}, so the solution picks up a factor of n: <span class="m">f(n) = (${f(Ac)} + ${f(Bc)}n)·(${f(r)})<sup>n</sup></span>.`;
      out.className='readout good';
    } else {
      const mod=Math.sqrt(-B), ang=Math.atan2(Math.sqrt(-disc)/2,A/2);
      msg+=`Complex roots of modulus ${mod.toFixed(4)} and angle ${(ang*180/Math.PI).toFixed(1)}°. The sequence oscillates with period about ${(2*Math.PI/ang).toFixed(2)}, `+
        (mod>1?'growing.':mod<1?'decaying.':'with constant amplitude.');
      out.className='readout';
    }
    out.innerHTML=msg;
  }
  [c1,c2,f0,f1].forEach(i=>i.oninput=draw); draw(); host.append(c);
};

/* --- L16: stars and bars + the four counts --- */
WIDGETS.stars=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const ni=inp(ctr,'n kinds ',4,{type:'range',min:1,max:12});
  const ki=inp(ctr,'choose k ',6,{type:'range',min:0,max:14});
  const rb=el('button','btn','Another example'); ctr.append(rb); c.append(ctr);
  const ex=el('div','blk'); c.append(ex);
  const tbl=el('div','scroller'); c.append(tbl);
  function draw(){
    const n=val(ni),k=val(ki);
    const cells=shuffle(Array(k).fill('★').concat(Array(n-1).fill('|')));
    const cnt=[0]; cells.forEach(x=>x==='|'?cnt.push(0):cnt[cnt.length-1]++);
    ex.innerHTML=`<span class="lbl">A selection of ${k} from ${n} kinds, repetition allowed, order ignored</span>`+
      `<span style="font-size:22px;letter-spacing:.2em">${cells.join('')||'∅'}</span><br>reads as counts (${cnt.join(', ')}): the bars are the ${n-1} dividers between kinds.`;
    const P=(a,b)=>{let r=1n;for(let i=0;i<b;i++)r*=BigInt(a-i);return a<b?0n:r;};
    const rows=[
      ['order matters','with repetition',`n<sup>k</sup>`,(BigInt(n)**BigInt(k))],
      ['order matters','no repetition',`n!/(n−k)!`,P(n,k)],
      ['order ignored','no repetition',`C(n, k)`,bigChoose(n,k)],
      ['order ignored','with repetition',`C(n+k−1, k)`,bigChoose(n+k-1,k)]];
    tbl.innerHTML='<table class="grid"><tr><th>order</th><th>repetition</th><th>formula</th><th>count</th></tr>'+
      rows.map((r,i)=>`<tr class="${i===3?'on':''}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3].toLocaleString()}</td></tr>`).join('')+'</table>';
  }
  ni.oninput=draw; ki.oninput=draw; rb.onclick=draw; draw(); host.append(c);
};

/* --- L17: inclusion–exclusion with a Venn diagram --- */
WIDGETS.venn=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const Ni=inp(ctr,'up to N = ',1000,{min:1,max:100000});
  const ai=inp(ctr,'divisible by ',2,{min:1,max:100}), bi=inp(ctr,'or ',3,{min:1,max:100}), ci=inp(ctr,'or ',5,{min:1,max:100});
  c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 360 250',class:'fig',style:'max-width:380px'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  const lcm=(x,y)=>x/gcd(x,y)*y;
  function draw(){
    const N=Math.max(1,Math.min(100000,+Ni.value||1)), a=Math.max(1,+ai.value||1), b=Math.max(1,+bi.value||1), cc=Math.max(1,+ci.value||1);
    const reg={}; for(let x=1;x<=N;x++){const key=(x%a?'':'A')+(x%b?'':'B')+(x%cc?'':'C'); reg[key]=(reg[key]||0)+1;}
    fig.innerHTML='';
    [[140,105,'A',a],[220,105,'B',b],[180,170,'C',cc]].forEach(([x,y,t,v])=>{
      fig.append(svgEl('circle',{cx:x,cy:y,r:72,fill:'var(--accent)','fill-opacity':.09,stroke:'var(--accent-soft)','stroke-width':1.5}));
      const tt=svgEl('text',{x:t==='A'?52:t==='B'?308:180,y:t==='C'?245:40,'text-anchor':'middle','font-size':'12',fill:'var(--dim)','font-family':'var(--sans)'});
      tt.textContent=`÷${v}`; fig.append(tt);
    });
    const spots={A:[112,88],B:[248,88],C:[180,208],AB:[180,78],AC:[140,150],BC:[220,150],ABC:[180,125]};
    for(const k in spots){const t=svgEl('text',{x:spots[k][0],y:spots[k][1],'text-anchor':'middle','font-size':'13','font-family':'var(--sans)',fill:'var(--chalk)'});t.textContent=reg[k]||0;fig.append(t);}
    const f=d=>Math.floor(N/d);
    const s1=f(a)+f(b)+f(cc), s2=f(lcm(a,b))+f(lcm(a,cc))+f(lcm(b,cc)), s3=f(lcm(lcm(a,b),cc));
    const union=s1-s2+s3, brute=N-(reg['']||0);
    out.className='readout good';
    out.innerHTML=`|A ∪ B ∪ C| = (${f(a)} + ${f(b)} + ${f(cc)}) − (${f(lcm(a,b))} + ${f(lcm(a,cc))} + ${f(lcm(b,cc))}) + ${s3} = <strong>${union}</strong>. `+
      `Brute force agrees: ${brute}. Each number in the centre is counted three times, subtracted three times, and added back once — net once, as it should be. `+
      `The remaining ${reg['']||0} numbers up to ${N} are divisible by none of them.`;
  }
  [Ni,ai,bi,ci].forEach(i=>i.oninput=draw); draw(); host.append(c);
};

/* --- L18: Monty Hall --- */
WIDGETS.monty=host=>{
  let st={stay:0,sw:0,n:0,void:0};
  const c=el('div','lab'); const ctr=el('div','controls');
  const mode=el('select'); mode.innerHTML='<option value="know">host knows where the car is</option><option value="guess">host opens a door at random</option>';
  const l=el('label',null,''); l.append(mode);
  const b1=el('button','btn','Play once'), b2=el('button','btn key','Play 1,000 times'), rs=el('button','btn','Reset');
  ctr.append(l,b1,b2,rs); c.append(ctr);
  const fig=svgEl('svg',{class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function play(){
    const car=Math.floor(Math.random()*3), pick=Math.floor(Math.random()*3);
    let open;
    if(mode.value==='know'){ const opts=[0,1,2].filter(d=>d!==pick&&d!==car); open=opts[Math.floor(Math.random()*opts.length)]; }
    else { const opts=[0,1,2].filter(d=>d!==pick); open=opts[Math.floor(Math.random()*2)]; if(open===car){st.void++;return;} }
    const other=[0,1,2].find(d=>d!==pick&&d!==open);
    st.n++; if(pick===car)st.stay++; if(other===car)st.sw++;
  }
  function draw(){
    const n=st.n||1;
    bars(fig,[st.stay/n,st.sw/n],{w:360,h:120,max:1,hl:i=>i===1,labels:[[0,'stay wins'],[1,'switch wins']]});
    out.className='readout '+(st.n?'good':'');
    if(!st.n){out.innerHTML='No games played yet.';return;}
    out.innerHTML=`<strong>${st.n.toLocaleString()} games:</strong> staying won ${pct(st.stay/n)}, switching won ${pct(st.sw/n)}.`+
      (mode.value==='know'?` A host who knowingly avoids the car turns your 2/3 chance of having picked wrong into a 2/3 chance that the other closed door wins.`
        :` ${st.void.toLocaleString()} games were thrown out because the host revealed the car. Conditioned on a random reveal happening to show a goat, the two closed doors really are 50–50. The door opened is identical; the process behind it is not, and that changes the answer.`);
  }
  b1.onclick=()=>{play();draw();}; b2.onclick=()=>{for(let i=0;i<1000;i++)play();draw();};
  rs.onclick=()=>{st={stay:0,sw:0,n:0,void:0};draw();};
  mode.onchange=()=>{st={stay:0,sw:0,n:0,void:0};draw();};
  draw(); host.append(c);
};

/* --- L19: Bayes with natural frequencies --- */
WIDGETS.bayes=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const pv=inp(ctr,'prevalence ',1,{type:'range',min:0.1,max:30,step:0.1}); pv._fmt=v=>v+'%';
  const se=inp(ctr,'detection rate ',95,{type:'range',min:50,max:99.9,step:0.1}); se._fmt=v=>v+'%';
  const fp=inp(ctr,'false alarm rate ',5,{type:'range',min:0.1,max:30,step:0.1}); fp._fmt=v=>v+'%';
  c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 600 190',class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function draw(){
    const p=val(pv)/100,s=val(se)/100,f=val(fp)/100, N=1000;
    const sick=Math.round(N*p), tp=Math.round(sick*s), fpN=Math.round((N-sick)*f);
    fig.innerHTML=''; let i=0;
    const put=(k,col)=>{for(let j=0;j<k;j++,i++){const x=(i%50)*12,y=Math.floor(i/50)*9.5;
      fig.append(svgEl('rect',{x,y,width:10,height:7.5,fill:col,rx:1}));}};
    put(tp,'var(--accent)'); put(sick-tp,'var(--accent-soft)'); put(fpN,'var(--rose)'); put(N-sick-fpN,'var(--raise)');
    const post=tp/Math.max(1,tp+fpN);
    out.className='readout '+(post<0.5?'warn':'good');
    out.innerHTML=`Out of 1,000 people: <span style="color:var(--accent)">■</span> ${tp} true alarms, <span style="color:var(--accent-soft)">■</span> ${sick-tp} misses, <span style="color:var(--rose)">■</span> ${fpN} false alarms. `+
      `<strong>An alarm means a real case only ${pct(post)} of the time.</strong> `+
      (post<0.5?`When the condition is rare, the false alarms from the huge healthy majority outnumber the true ones from the tiny sick minority. P(alarm | case) and P(case | alarm) are different numbers, and confusing them is the base-rate fallacy.`
               :`The base rate is high enough, or the false-alarm rate low enough, that most alarms are real.`);
  }
  [pv,se,fp].forEach(x=>x.oninput=draw); draw(); host.append(c);
};

/* --- L20: birthday --- */
WIDGETS.birthday=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const ki=inp(ctr,'people ',23,{type:'range',min:2,max:80});
  const di=inp(ctr,'possible days ',365,{min:2,max:100000}); c.append(ctr);
  const fig=svgEl('svg',{class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  const P=(k,d)=>{let q=1;for(let i=0;i<k;i++)q*=(1-i/d);return 1-q;};
  function draw(){
    const k=val(ki), d=Math.max(2,+di.value||365);
    bars(fig,Array.from({length:80},(_,i)=>P(i+1,d)),{max:1,hl:i=>i+1===k,labels:[[0,'1'],[19,'20'],[39,'40'],[59,'60'],[79,'80']]});
    let half=1; while(P(half,d)<0.5)half++;
    out.className='readout good';
    out.innerHTML=`<strong>With ${k} people and ${d.toLocaleString()} days, P(some shared value) = ${pct(P(k,d),2)}.</strong> `+
      `The approximation 1 − e<sup>−k(k−1)/2d</sup> gives ${pct(1-Math.exp(-k*(k-1)/(2*d)),2)}. `+
      `It passes 50% at ${half} — near √(2d ln 2) ≈ ${Math.sqrt(2*d*Math.LN2).toFixed(1)}. The intuition that fails is counting people when you should count pairs: ${k} people form ${(k*(k-1)/2).toLocaleString()} pairs, each a chance at a match. `+
      `The same √d threshold is why a hash with a b-bit output starts colliding after about 2<sup>b/2</sup> inputs.`;
  }
  ki.oninput=draw; di.oninput=draw; draw(); host.append(c);
};

/* --- L21: binomial PMF --- */
WIDGETS.binom=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const ni=inp(ctr,'trials n ',20,{type:'range',min:1,max:100});
  const pi=inp(ctr,'success probability p ',0.3,{type:'range',min:0.01,max:0.99,step:0.01}); c.append(ctr);
  const fig=svgEl('svg',{class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function draw(){
    const n=val(ni),p=val(pi);
    const pmf=Array.from({length:n+1},(_,k)=>Math.exp(lchoose(n,k)+k*Math.log(p)+(n-k)*Math.log(1-p)));
    const mode=pmf.indexOf(Math.max(...pmf)), mu=n*p, sd=Math.sqrt(n*p*(1-p));
    bars(fig,pmf,{hl:k=>Math.abs(k-mu)<=sd,labels:[[0,'0'],[Math.round(n/2),String(Math.round(n/2))],[n,String(n)]]});
    const within=pmf.reduce((s,v,k)=>s+(Math.abs(k-mu)<=sd?v:0),0);
    out.className='readout good';
    out.innerHTML=`<strong>Mean np = ${mu.toFixed(2)}, standard deviation √(np(1−p)) = ${sd.toFixed(2)}</strong>, most likely value ${mode}. `+
      `Highlighted bars lie within one standard deviation of the mean and carry ${pct(within)} of the probability. `+
      `The distribution is a sum of ${n} independent indicator variables — that decomposition, not the formula C(n,k)p<sup>k</sup>(1−p)<sup>n−k</sup>, is what makes its mean and variance easy.`;
  }
  ni.oninput=draw; pi.oninput=draw; draw(); host.append(c);
};

/* --- L22: hat check / fixed points --- */
WIDGETS.hats=host=>{
  let hist=Array(8).fill(0), runs=0, total=0;
  const c=el('div','lab'); const ctr=el('div','controls');
  const ni=inp(ctr,'people n ',10,{type:'range',min:2,max:60});
  const go=el('button','btn key','Shuffle 2,000 times'); ctr.append(go); c.append(ctr);
  const fig=svgEl('svg',{class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function run(){
    const n=val(ni); hist=Array(8).fill(0); runs=0; total=0;
    const a=[...Array(n).keys()];
    for(let t=0;t<2000;t++){ shuffle(a); let f=0; for(let i=0;i<n;i++) if(a[i]===i) f++; hist[Math.min(7,f)]++; total+=f; runs++; }
    draw();
  }
  function draw(){
    const pois=hist.map((_,k)=>Math.exp(-1)/Math.exp(LF[k]));
    bars(fig,hist.map(h=>h/Math.max(1,runs)),{max:0.45,overlay:pois,hl:k=>k===1,labels:hist.map((_,k)=>[k,k===7?'7+':String(k)])});
    out.className='readout good';
    out.innerHTML=`<strong>Average number of people who got their own hat back: ${(total/Math.max(1,runs)).toFixed(3)}.</strong> `+
      `Bars are simulated frequencies; the curve is the limit e<sup>−1</sup>/k!. Nobody matched in ${pct(hist[0]/Math.max(1,runs))} of shuffles, close to 1/e ≈ 36.8%. `+
      `Change n and the average stays at 1. By linearity, E[matches] = n · (1/n) = 1, even though the individual matches are not independent — linearity never needs them to be.`;
  }
  ni.oninput=run; go.onclick=run; run(); host.append(c);
};

/* --- L23: coupon collector --- */
WIDGETS.coupons=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const ni=inp(ctr,'distinct coupons n ',20,{type:'range',min:2,max:100});
  const go=el('button','btn key','Collect 500 full sets'); ctr.append(go); c.append(ctr);
  const fig=svgEl('svg',{class:'fig'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function run(){
    const n=val(ni), draws=[];
    for(let t=0;t<500;t++){ const seen=new Uint8Array(n); let got=0,k=0; while(got<n){k++; const x=Math.floor(Math.random()*n); if(!seen[x]){seen[x]=1;got++;}} draws.push(k); }
    let H=0; for(let i=1;i<=n;i++)H+=1/i;
    const mean=draws.reduce((a,b)=>a+b,0)/draws.length, mx=Math.max(...draws), B=24, w=Math.ceil(mx/B)||1;
    const hist=Array(B).fill(0); draws.forEach(d=>hist[Math.min(B-1,Math.floor(d/w))]++);
    const mb=Math.floor(n*H/w);
    bars(fig,hist,{hl:i=>i===mb,labels:[[0,'0'],[Math.floor(B/2),String(Math.floor(B/2)*w)],[B-1,String((B-1)*w)]]});
    out.className='readout good';
    out.innerHTML=`<strong>Average draws to complete a set of ${n}: ${mean.toFixed(1)}</strong>, against the exact expectation n·H<sub>n</sub> = ${(n*H).toFixed(1)}. `+
      `Split the wait into phases: once you hold i distinct coupons, each draw is new with probability (n−i)/n, so that phase is geometric with mean n/(n−i). Summing gives n(1/n + 1/(n−1) + ⋯ + 1) = nH<sub>n</sub>. `+
      `The last coupon alone costs n draws on average — as much as the first half of the collection put together, roughly.`;
  }
  ni.oninput=run; go.onclick=run; run(); host.append(c);
};

/* --- L24: tail bounds --- */
WIDGETS.tails=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const ni=inp(ctr,'fair coin flips n ',100,{type:'range',min:10,max:2000,step:10});
  const ai=inp(ctr,'at least a fraction ',0.6,{type:'range',min:0.52,max:0.95,step:0.01});
  ctr.append(el('span',null,'heads')); c.append(ctr);
  const tbl=el('div','scroller'); c.append(tbl);
  const out=el('div','readout'); c.append(out);
  const show=x=>x>=1?'≥ 1 (useless)':x<1e-4?x.toExponential(2):x.toPrecision(3);
  function draw(){
    const n=val(ni), a=val(ai), k0=Math.ceil(a*n), mu=n/2;
    let lt=-Infinity; for(let k=k0;k<=n;k++){const lp=lchoose(n,k)-n*Math.LN2; lt=Math.max(lt,lp)+Math.log1p(Math.exp(Math.min(lt,lp)-Math.max(lt,lp)));}
    const exact=Math.exp(lt), cc=k0/mu, t=k0-mu;
    const markov=mu/k0, cheb=(n/4)/(t*t), chern=Math.exp(-(cc*Math.log(cc)-cc+1)*mu);
    const rows=[['Markov','needs only E[X]',markov],['Chebyshev','also uses Var[X]',cheb],['Chernoff','needs independence',chern],['exact','',exact]];
    tbl.innerHTML='<table class="grid"><tr><th>bound</th><th>assumes</th><th>P(X ≥ '+k0+')</th></tr>'+
      rows.map((r,i)=>`<tr class="${i===3?'on':''}"><td style="text-align:left">${r[0]}</td><td style="text-align:left">${r[1]}</td><td>${show(r[2])}</td></tr>`).join('')+'</table>';
    out.className='readout good';
    out.innerHTML=`Each bound buys accuracy with a stronger hypothesis. Markov is a fixed fraction regardless of n. Chebyshev decays like 1/n. `+
      `Chernoff decays <em>exponentially</em> in n — at n = ${n} it sits within a factor of ${(chern/exact).toFixed(1)} of the truth. `+
      `Double n and watch Chernoff and the exact tail fall together while Markov does not move. This is why a load balancer, a sampling estimate or a randomized algorithm can promise that disaster is not just unlikely but astronomically so.`;
  }
  ni.oninput=draw; ai.oninput=draw; draw(); host.append(c);
};

/* --- L25: gambler's ruin --- */
WIDGETS.ruin=host=>{
  const c=el('div','lab'); const ctr=el('div','controls');
  const si=inp(ctr,'start with $',10,{type:'range',min:1,max:59});
  const ti=inp(ctr,'quit at $',30,{type:'range',min:2,max:60});
  const pi=inp(ctr,'win probability per bet ',0.5,{type:'range',min:0.40,max:0.60,step:0.01});
  const go=el('button','btn key','Run 1,000 gamblers'); ctr.append(go); c.append(ctr);
  const fig=svgEl('svg',{viewBox:'0 0 600 200',class:'fig',preserveAspectRatio:'none',style:'width:100%;height:200px'}); c.append(fig);
  const out=el('div','readout'); c.append(out);
  function run(){
    let n=val(si), T=val(ti); const p=val(pi);
    if(n>=T){T=n+1; ti.value=T; val(ti);}
    const paths=[]; let wins=0, steps=0;
    for(let g=0;g<1000;g++){
      let x=n,k=0; const path=g<12?[x]:null;
      while(x>0&&x<T&&k<200000){x+=Math.random()<p?1:-1;k++; if(path&&path.length<3000)path.push(x);}
      if(x>=T)wins++; steps+=k; if(path)paths.push(path);
    }
    const maxLen=Math.max(...paths.map(q=>q.length));
    fig.innerHTML='';
    fig.append(svgEl('line',{x1:0,y1:10,x2:600,y2:10,stroke:'var(--ok)','stroke-dasharray':'4 4'}));
    fig.append(svgEl('line',{x1:0,y1:190,x2:600,y2:190,stroke:'var(--bad)','stroke-dasharray':'4 4'}));
    paths.forEach(q=>{
      const d=q.map((v,i)=>`${i?'L':'M'}${(i/(maxLen-1||1)*600).toFixed(1)},${(190-v/T*180).toFixed(1)}`).join(' ');
      fig.append(svgEl('path',{d,fill:'none',stroke:q[q.length-1]>=T?'var(--accent)':'var(--rule)','stroke-width':1.3,'vector-effect':'non-scaling-stroke'}));
    });
    const q=1-p, r=q/p;
    const exact=Math.abs(p-0.5)<1e-9?n/T:(Math.pow(r,n)-1)/(Math.pow(r,T)-1);
    out.className='readout '+(exact<0.5?'warn':'good');
    out.innerHTML=`<strong>Reached $${T} in ${pct(wins/1000)} of runs; the exact probability is ${pct(exact,2)}.</strong> Mean game length ${(steps/1000).toFixed(0)} bets. `+
      (Math.abs(p-0.5)<1e-9?`With a fair coin the chance is exactly start/target: the walk is a martingale, so your expected fortune never changes, and the only way to balance a chance of winning $${T-n} against a chance of losing $${n} is to make the odds ${n}:${T-n-0}.`
        : p<0.5?`A small edge against you compounds brutally. The ratio q/p = ${r.toFixed(3)} gets raised to the power of your bankroll, so bigger stakes make the house edge <em>worse</em>, not better.`
        :`An edge in your favour compounds just as hard in the other direction.`)+
      ` The upper line is the target, the lower line is ruin; yellow paths made it.`;
  }
  [si,ti,pi].forEach(i=>i.oninput=()=>{val(i);}); [si,ti,pi].forEach(i=>i.onchange=run); go.onclick=run; run(); host.append(c);
};
