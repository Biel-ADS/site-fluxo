(function(){
  "use strict";

  /* ---------- NAV + PROGRESS BAR ---------- */
  var nav = document.getElementById('nav');
  var progressBar = document.getElementById('progressBar');

  function onScroll(){
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
    if(scrollTop > 40){ nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- NODE NETWORK CANVAS (hero) ---------- */
  function initNodeCanvas(canvasId, opts){
    var canvas = document.getElementById(canvasId);
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var nodes = [];
    var count = opts.count || 60;
    var linkDist = opts.linkDist || 140;
    var color = opts.color || '201,255,61';
    var dark = opts.dark !== false;

    function resize(){
      var rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function makeNodes(){
      nodes = [];
      for(var i=0;i<count;i++){
        nodes.push({
          x: Math.random()*w,
          y: Math.random()*h,
          vx: (Math.random()-0.5)*0.35,
          vy: (Math.random()-0.5)*0.35,
          r: Math.random()*1.6+1
        });
      }
    }

    function step(){
      ctx.clearRect(0,0,w,h);
      for(var i=0;i<nodes.length;i++){
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if(n.x < 0 || n.x > w) n.vx *= -1;
        if(n.y < 0 || n.y > h) n.vy *= -1;
      }
      for(i=0;i<nodes.length;i++){
        for(var j=i+1;j<nodes.length;j++){
          var a = nodes[i], b = nodes[j];
          var dx = a.x-b.x, dy = a.y-b.y;
          var dist = Math.sqrt(dx*dx+dy*dy);
          if(dist < linkDist){
            var alpha = (1 - dist/linkDist) * (dark ? 0.35 : 0.5);
            ctx.strokeStyle = 'rgba(' + color + ',' + alpha + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }
      for(i=0;i<nodes.length;i++){
        var n2 = nodes[i];
        ctx.fillStyle = 'rgba(' + color + ',0.9)';
        ctx.beginPath();
        ctx.arc(n2.x, n2.y, n2.r, 0, Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize();
    makeNodes();
    step();
    window.addEventListener('resize', function(){ resize(); makeNodes(); });
  }

  initNodeCanvas('nodeCanvas', { count:70, linkDist:150, color:'201,255,61', dark:true });
  initNodeCanvas('ctaCanvas', { count:40, linkDist:130, color:'11,13,15', dark:false });

  /* ---------- GSAP SCROLL REVEALS ---------- */
  if(window.gsap){
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.reveal').forEach(function(el){
      gsap.to(el, {
        opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger:{ trigger: el, start:'top 88%' }
      });
    });

    document.querySelectorAll('.reveal-line').forEach(function(el, idx){
      var text = el.textContent;
      el.innerHTML = '';
      var span = document.createElement('span');
      span.textContent = text;
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(110%)';
      el.appendChild(span);
      gsap.to(span, {
        y:0, duration:0.9, delay: idx*0.08, ease:'power4.out',
        scrollTrigger:{ trigger: el, start:'top 95%', once:true }
      });
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- COUNTERS ---------- */
  var counters = document.querySelectorAll('.number-value');
  var counterObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseFloat(el.getAttribute('data-count'));
      var isDecimal = target % 1 !== 0;
      var start = 0;
      var duration = 1400;
      var startTime = null;
      function tick(ts){
        if(!startTime) startTime = ts;
        var progress = Math.min((ts-startTime)/duration, 1);
        var eased = 1 - Math.pow(1-progress, 3);
        var value = start + (target-start)*eased;
        el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold:0.5 });
  counters.forEach(function(c){ counterObserver.observe(c); });

  /* ---------- TABS ---------- */
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
      var panel = document.getElementById('panel-' + target);
      if(panel) panel.classList.add('active');
    });
  });

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(openItem){
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- MAGNETIC BUTTON ---------- */
  var magnetic = document.querySelector('.magnetic');
  if(magnetic && window.gsap){
    magnetic.addEventListener('mousemove', function(e){
      var rect = magnetic.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width/2;
      var y = e.clientY - rect.top - rect.height/2;
      gsap.to(magnetic, { x:x*0.25, y:y*0.4, duration:0.4, ease:'power3.out' });
    });
    magnetic.addEventListener('mouseleave', function(){
      gsap.to(magnetic, { x:0, y:0, duration:0.5, ease:'elastic.out(1,0.4)' });
    });
  }

  /* ---------- FORM (front-end only demo) ---------- */
  var form = document.getElementById('ctaForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      btn.textContent = 'Recebemos! Vamos te chamar em breve.';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    });
  }

})();
