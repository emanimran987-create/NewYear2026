const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let fireworks = [];

function random(min,max){ return Math.random()*(max-min)+min; }

function Firework(){
  this.x=random(0,canvas.width);
  this.y=canvas.height;
  this.targetY=random(0,canvas.height/2);
  this.radius=2;
  this.color=`hsl(${random(0,360)},100%,50%)`;
  this.speed=random(4,8);
  this.exploded=false;
  this.particles=[];
}

Firework.prototype.update=function(){
  if(this.y>this.targetY && !this.exploded){ this.y-=this.speed; }
  else if(!this.exploded){
    this.exploded=true;
    for(let i=0;i<30;i++){
      this.particles.push({
        x:this.x,
        y:this.y,
        vx:random(-5,5),
        vy:random(-5,5),
        alpha:1,
        color:`hsl(${random(0,360)},100%,50%)`
      });
    }
  }
  this.particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.1; p.alpha-=0.02;
  });
  this.particles=this.particles.filter(p=>p.alpha>0);
}

Firework.prototype.draw=function(){
  if(!this.exploded){
    ctx.beginPath(); ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); ctx.fillStyle=this.color; ctx.fill();
  }
  this.particles.forEach(p=>{
    ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle=p.color; ctx.globalAlpha=p.alpha; ctx.fill(); ctx.globalAlpha=1;
  });
}

function loop(){
  ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fillRect(0,0,canvas.width,canvas.height);
  if(Math.random()<0.05) fireworks.push(new Firework());
  fireworks.forEach(f=>{ f.update(); f.draw(); });
  fireworks=fireworks.filter(f=>f.particles.length>0 || !f.exploded);
  requestAnimationFrame(loop);
}

window.addEventListener('resize', ()=>{
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
});

loop();
