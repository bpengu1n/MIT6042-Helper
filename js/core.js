/* ========================= tiny helpers ========================= */
const $ = (s,r=document)=>r.querySelector(s);
function el(tag,cls,html){const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;}
function svgEl(tag,attrs){const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const k in attrs)n.setAttribute(k,attrs[k]);return n;}
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;};

/* progress: per-viewer convenience only */
const STORE='mcs6042.progress.v1';
let progress={};
try{progress=JSON.parse(localStorage.getItem(STORE)||'{}')||{};}catch(e){progress={};}
function save(){try{localStorage.setItem(STORE,JSON.stringify(progress));}catch(e){}}
function mark(lec,step){
  const k=String(lec); progress[k]=progress[k]||[];
  if(!progress[k].includes(step)){progress[k].push(step);save();}
}
const stepsSeen=l=>(progress[String(l)]||[]).length;
const lecDone=l=>stepsSeen(l)>=LECTURES.find(x=>x.id===l).steps.length;

/* theme */
const tb=$('#themebtn');
tb.addEventListener('click',()=>{
  const cur=document.documentElement.getAttribute('data-theme');
  const darkNow = cur ? cur==='dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', darkNow?'light':'dark');
  try{localStorage.setItem('mcs6042.theme',darkNow?'light':'dark');}catch(e){}
});
try{const t=localStorage.getItem('mcs6042.theme'); if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}
$('#resetbtn').addEventListener('click',()=>{progress={};save();render();});
