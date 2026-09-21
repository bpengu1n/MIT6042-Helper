/* ========================= map layout ========================= */
const POS={1:[80,62],2:[240,62],3:[400,62],4:[560,62],5:[720,62],
 6:[80,200],7:[240,150],8:[240,220],9:[400,220],10:[240,290],11:[80,290],
 12:[80,400],13:[240,400],14:[400,400],15:[560,400],
 16:[80,500],17:[240,500],18:[400,500],19:[560,500],20:[720,500],21:[880,500],
 22:[880,580],23:[720,580],24:[560,580],25:[720,650]};
const EDGES=[[1,2],[2,3],[3,4],[4,5],[1,6],[6,7],[6,8],[8,9],[6,10],[6,11],
 [12,13],[13,14],[14,15],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[22,25]];
const BANDS=[[26,'Proof and number theory'],[118,'Graphs'],[364,'Sums and recurrences'],[464,'Counting, then probability']];

/* ========================= views ========================= */
let view={screen:'map',lec:1,step:0};

function renderMap(){
  const app=$('#app'); app.innerHTML='';
  const lede=el('div','lede');
  lede.innerHTML=`<p class="big">Twenty-five lectures of discrete mathematics, taken one claim at a time.</p>
  <p>Each lecture here is four screens: the central idea, a proof worked all the way through, a widget you can push on until the idea stops being abstract, and one question that is easy to get wrong for an interesting reason.</p>`;
  app.append(lede);
  app.append(el('p','maphint','Pick a lecture. Arrows point from a topic to the ones that lean on it; each lecture page lists everything it draws on.'));

  const box=el('div','mapbox');
  const svg=svgEl('svg',{viewBox:'0 0 960 690',role:'group','aria-label':'Lecture prerequisite map'});
  const defs=svgEl('defs');
  defs.innerHTML='<marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--rule)"/></marker>';
  svg.append(defs);
  const W=118,H=42;
  BANDS.forEach(([y,t])=>{const b=svgEl('text',{x:560,y:y,class:'band'});b.textContent=t;svg.append(b);});
  EDGES.forEach(([a,b])=>{
    const [x1,y1]=POS[a],[x2,y2]=POS[b];
    const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);
    const sx=x1+dx/len*(W/2+4), sy=y1+dy/len*(H/2+4);
    const ex=x2-dx/len*(W/2+10), ey=y2-dy/len*(H/2+10);
    svg.append(svgEl('line',{x1:sx,y1:sy,x2:ex,y2:ey,class:'edge','marker-end':'url(#ar)'}));
  });
  LECTURES.forEach(L=>{
    const [x,y]=POS[L.id];
    const g=svgEl('g',{class:'nd'+(lecDone(L.id)?' done':''),tabindex:'0',role:'button',
      'aria-label':`Lecture ${L.id}: ${L.title}`});
    g.append(svgEl('rect',{x:x-W/2,y:y-H/2,width:W,height:H}));
    const n=svgEl('text',{x:x-W/2+10,y:y-H/2+16,class:'n'}); n.textContent=(lecDone(L.id)?'✓ ':'')+L.id;
    const t=svgEl('text',{x:x-W/2+10,y:y+H/2-12,class:'t'}); t.textContent=L.short;
    g.append(n,t);
    const open=()=>{view={screen:'lec',lec:L.id,step:0};render();window.scrollTo(0,0);};
    g.addEventListener('click',open);
    g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    svg.append(g);
  });
  box.append(svg); app.append(box);

  const total=LECTURES.reduce((s,L)=>s+L.steps.length,0);
  const seen=LECTURES.reduce((s,L)=>s+stepsSeen(L.id),0);
  app.append(el('p','maphint',seen?`${seen} of ${total} screens visited.`:'Nothing visited yet — lecture 1 is the place to start.'));
}

function renderLecture(){
  const app=$('#app'); app.innerHTML='';
  const L=LECTURES.find(x=>x.id===view.lec);
  const S=L.steps[view.step];
  mark(L.id,view.step);

  const cr=el('div','crumbs');
  const back=el('button',null,'All lectures'); back.onclick=()=>{view.screen='map';render();window.scrollTo(0,0);};
  cr.append(back, document.createTextNode(' · Lecture '+L.id));
  app.append(cr);
  app.append(el('h2','lec',L.title));
  app.append(el('p','lecmeta',L.prereqs.length?'Leans on: '+L.prereqs.map(p=>LECTURES.find(x=>x.id===p).short).join(', '):'No prerequisites — this is the entry point.'));

  const rail=el('div','rail');
  L.steps.forEach((st,i)=>{
    const b=el('button',(progress[String(L.id)]||[]).includes(i)?'seen':'',st.kind);
    if(i===view.step)b.setAttribute('aria-current','true');
    b.onclick=()=>{view.step=i;render();};
    rail.append(b);
  });
  app.append(rail);

  const card=el('div','card');
  card.append(el('h3',null,S.title));
  if(S.html) card.append(el('div',null,S.html));
  if(S.widget && WIDGETS[S.widget]) WIDGETS[S.widget](card);
  if(S.kind==='Check') buildCheck(card,S);
  app.append(card);

  const pager=el('nav','pager');
  const prev=el('button','btn','← Previous'), next=el('button','btn key','Next →');
  prev.disabled = view.step===0 && L.id===1;
  prev.onclick=()=>{
    if(view.step>0)view.step--;
    else{const p=LECTURES.find(x=>x.id===L.id-1); view.lec=p.id; view.step=p.steps.length-1;}
    render();window.scrollTo(0,0);
  };
  const last = view.step===L.steps.length-1 && L.id===LECTURES.length;
  next.textContent = last?'Back to the map':'Next →';
  next.onclick=()=>{
    if(last){view.screen='map';}
    else if(view.step<L.steps.length-1)view.step++;
    else{view.lec=L.id+1;view.step=0;}
    render();window.scrollTo(0,0);
  };
  pager.append(prev,next);
  pager.append(el('span','spacer',`${S.kind} — ${view.step+1} of ${L.steps.length}`));
  app.append(pager);
}

function buildCheck(card,S){
  card.append(el('p',null,S.q));
  const box=el('div');
  const fb=el('div','readout'); fb.style.display='none';
  S.options.forEach((o,i)=>{
    const b=el('button','opt',o);
    b.onclick=()=>{
      [...box.children].forEach((c,j)=>{c.disabled=true; if(j===S.answer)c.classList.add('right'); else if(j===i)c.classList.add('wrong');});
      fb.style.display='block';
      fb.className='readout '+(i===S.answer?'good':'warn');
      fb.innerHTML=(i===S.answer?'<strong>Right.</strong> ':'<strong>Not quite.</strong> ')+S.why;
    };
    box.append(b);
  });
  card.append(box,fb);
}

function render(){ view.screen==='map'?renderMap():renderLecture(); }
render();
