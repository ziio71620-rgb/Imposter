const sfx=(()=>{
  let ctx=null,on=true,last=-1;
  try{on=localStorage.getItem("imp-snd")!=="0"}catch(e){}
  function c(){try{if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();if(ctx.state==="suspended")ctx.resume();return ctx}catch(e){return null}}
  function tone(f,t0,d,type,v,slide){
    const a=c();if(!a||!on)return;const n=a.currentTime+t0,o=a.createOscillator(),g=a.createGain();
    o.type=type||"sine";o.frequency.setValueAtTime(f,n);if(slide)o.frequency.exponentialRampToValueAtTime(slide,n+d);
    g.gain.setValueAtTime(0.0001,n);g.gain.exponentialRampToValueAtTime(v||0.2,n+0.015);g.gain.exponentialRampToValueAtTime(0.0001,n+d);
    o.connect(g);g.connect(a.destination);o.start(n);o.stop(n+d+0.05);
  }
  const S={
    tap:()=>tone(660,0,.07,"triangle",.1),
    add:()=>{tone(523,0,.08,"triangle",.18);tone(784,.07,.1,"triangle",.18)},
    start:()=>[392,523,659,784].forEach((f,i)=>tone(f,i*.09,.16,"triangle",.2)),
    flip:()=>tone(300,0,.14,"sawtooth",.07,800),
    crew:()=>{tone(659,0,.12,"triangle",.2);tone(880,.1,.22,"triangle",.2)},
    imp:()=>{tone(220,0,.28,"sawtooth",.16,110);tone(165,.12,.4,"square",.08,82)},
    tick:()=>tone(1000,0,.04,"square",.05),
    alarm:()=>[0,.25,.5].forEach(t=>tone(880,t,.18,"square",.1)),
    vote:()=>tone(440,0,.1,"triangle",.18),
    win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,i*.12,.3,"triangle",.22)),
    lose:()=>[392,330,262,196].forEach((f,i)=>tone(f,i*.18,.3,"sawtooth",.1))
  };
  return{
    play(n){try{S[n]&&S[n]()}catch(e){}},
    sec(l){const p=last;last=l;if(l===p)return;if(l>0&&l<=10)this.play("tick");else if(l===0&&p>0)this.play("alarm")},
    get on(){return on},
    set(v){on=v;try{localStorage.setItem("imp-snd",v?"1":"0")}catch(e){}}
  };
})();
function confetti(n){
  try{
    const cv=document.createElement("canvas");cv.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:60;pointer-events:none";
    cv.width=innerWidth;cv.height=innerHeight;document.body.append(cv);
    const x=cv.getContext("2d"),cols=["#c1272d","#006233","#d9a441","#fbf5e9","#1d6fd1"];
    const p=Array.from({length:n||100},()=>({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.5,vx:(Math.random()-.5)*3,vy:2+Math.random()*4,r:4+Math.random()*5,a:Math.random()*6,c:cols[Math.floor(Math.random()*cols.length)]}));
    let f=0;(function d(){x.clearRect(0,0,cv.width,cv.height);p.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.a+=.1;x.save();x.translate(q.x,q.y);x.rotate(q.a);x.fillStyle=q.c;x.fillRect(-q.r,-q.r/2,q.r*2,q.r);x.restore()});if(++f<160)requestAnimationFrame(d);else cv.remove()})();
  }catch(e){}
}
function floaters(el){
  try{const E=["🍲","🐪","🕌","🍵","🥘","🏺","🌴","🎶","🫖","⭐"];
    for(let i=0;i<14;i++){const s=document.createElement("span");s.className="fl";s.textContent=E[i%E.length];
      s.style.cssText="left:"+Math.round(Math.random()*92)+"%;font-size:"+(20+Math.round(Math.random()*22))+"px;animation-duration:"+(9+Math.round(Math.random()*9))+"s;animation-delay:-"+Math.round(Math.random()*12)+"s";el.append(s)}}catch(e){}
}
try{if(document.addEventListener)document.addEventListener("click",e=>{if(e.target&&e.target.closest&&e.target.closest("button"))sfx.play("tap")},true)}catch(e){}
