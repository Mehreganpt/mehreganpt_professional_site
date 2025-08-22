
(function(){
  // Language toggle
  const html = document.documentElement;
  const btnFa = document.getElementById('btn-fa');
  const btnEn = document.getElementById('btn-en');
  function setLang(lang){
    if(!html) return;
    html.classList.toggle('en', lang==='en');
    if(btnFa && btnEn){
      btnFa.classList.toggle('active', lang==='fa');
      btnEn.classList.toggle('active', lang==='en');
    }
    try{ localStorage.setItem('mehregan-lang', lang); }catch(e){}
  }
  if(btnFa && btnEn){
    btnFa.addEventListener('click', ()=>setLang('fa'));
    btnEn.addEventListener('click', ()=>setLang('en'));
  }
  try{
    const saved = localStorage.getItem('mehregan-lang');
    if(saved==='en') setLang('en'); else setLang('fa');
  }catch(e){}

  // Carousel
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel)=>{
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('img');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    let index = 0;

    slides.forEach((_,i)=>{
      const b=document.createElement('button');
      if(i===0) b.classList.add('active');
      b.addEventListener('click', ()=>go(i));
      dotsWrap.appendChild(b);
    });
    const dots = dotsWrap.querySelectorAll('button');

    function go(i){
      index = (i+slides.length)%slides.length;
      track.style.transform = `translateX(${-index*100}%)`;
      dots.forEach(d=>d.classList.remove('active'));
      if(dots[index]) dots[index].classList.add('active');
    }
    let timer = setInterval(()=>go(index+1), 4000);
    function reset(){ clearInterval(timer); timer=setInterval(()=>go(index+1), 4000); }
    if(prev) prev.addEventListener('click', ()=>{ go(index-1); reset(); });
    if(next) next.addEventListener('click', ()=>{ go(index+1); reset(); });

    // Set widths
    track.style.width = `${slides.length*100}%`;
    slides.forEach(s=> s.style.width = `${100/slides.length}%`);
  });
})();
