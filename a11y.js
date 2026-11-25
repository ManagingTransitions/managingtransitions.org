/* Reader display options and read-aloud. No tracking, no external requests except the optional
   Atkinson Hyperlegible font (loaded from Google Fonts only if the reader chooses it).
   Preferences are kept in this browser only (localStorage), never sent anywhere. */
(function(){
  'use strict';
  var KEY='mt-a11y', root=document.documentElement;
  var DEFAULTS={size:'0',font:'default',contrast:'default',tint:'default',spacing:'default',links:'off',ruler:'off',rate:'1'};
  var prefs=load();

  function load(){
    var p={}, k;
    for(k in DEFAULTS) p[k]=DEFAULTS[k];
    try{ var s=JSON.parse(localStorage.getItem(KEY)||'{}'); for(k in s){ if(k in DEFAULTS) p[k]=String(s[k]); } }catch(e){}
    return p;
  }
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(prefs)); }catch(e){} }

  function apply(){
    root.setAttribute('data-size',prefs.size);
    root.setAttribute('data-font',prefs.font);
    root.setAttribute('data-contrast',prefs.contrast);
    root.setAttribute('data-tint',prefs.tint);
    root.setAttribute('data-spacing',prefs.spacing);
    root.setAttribute('data-links',prefs.links);
    root.setAttribute('data-ruler',prefs.ruler);
    if(prefs.font==='hyper') loadFont();
  }
  var fontLoaded=false;
  function loadFont(){
    if(fontLoaded) return; fontLoaded=true;
    var l=document.createElement('link'); l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap';
    document.head.appendChild(l);
  }
  apply(); /* before first paint where possible */

  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }

  ready(function(){
    /* ---------- build UI ---------- */
    var btn=document.createElement('button');
    btn.type='button'; btn.id='a11y-open'; btn.setAttribute('aria-haspopup','dialog'); btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-controls','a11y-panel');
    btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="4.5" r="2.3" fill="currentColor"/><path d="M4 8.5h16M12 8.5v5.5m0 0-3.5 6.5M12 14l3.5 6.5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Display and reading options</span>';

    var panel=document.createElement('div');
    panel.id='a11y-panel';
    panel.innerHTML=
'<div class="box" role="dialog" aria-modal="true" aria-labelledby="a11y-title" tabindex="-1">'+
'<h2 id="a11y-title">Display and reading options</h2>'+
'<p class="intro">Changes apply straight away and are remembered in this browser only. Nothing is sent anywhere. Your browser\'s own zoom and settings also work on this site.</p>'+
'<form id="a11y-form" onsubmit="return false">'+
 fs('size','Text size',[['0','Default'],['1','Large'],['2','Larger'],['3','Largest']])+
 fs('font','Typeface',[['default','Standard'],['hyper','Atkinson Hyperlegible']])+
 fs('contrast','Contrast',[['default','Standard'],['high','High contrast (black and white)']])+
 fs('tint','Page background',[['default','Default'],['cream','Cream'],['grey','Soft grey'],['blue','Pale blue']])+
 '<fieldset><legend>Reading aids</legend><div class="opts">'+
  cb('spacing','Wider line, letter and word spacing','wide')+
  cb('links','Highlight all links','on')+
  cb('ruler','Reading guide that follows the pointer','on')+
 '</div></fieldset>'+
 '<fieldset><legend>Read this page aloud</legend>'+
  '<p style="margin:0 0 0.5rem;font-size:0.9rem;">Uses your device\'s built-in voice. It reads the main content of the page.</p>'+
  '<div class="row" style="margin-top:0"><button type="button" id="a11y-play" class="primary">Read aloud</button><button type="button" id="a11y-pause">Pause</button><button type="button" id="a11y-stop">Stop</button></div>'+
  '<div class="opts" style="margin-top:0.6rem"><span style="align-self:center;margin-right:0.3rem">Speed</span>'+
   rate('0.8','Slower')+rate('1','Normal')+rate('1.25','Faster')+'</div>'+
 '</fieldset>'+
 '<div class="row"><button type="button" id="a11y-reset">Reset all options</button><button type="button" id="a11y-close" class="primary">Close</button></div>'+
 '<p class="sr-status" id="a11y-status" role="status" aria-live="polite"></p>'+
 '<p style="margin:0.4rem 0 0;font-size:0.9rem;"><a href="/accessibility.html">Accessibility statement</a></p>'+
'</form></div>';
    document.body.appendChild(btn);
    document.body.appendChild(panel);
    var ruler=document.createElement('div'); ruler.id='a11y-ruler'; ruler.setAttribute('aria-hidden','true'); document.body.appendChild(ruler);

    function fs(name,legend,opts){
      return '<fieldset><legend>'+legend+'</legend><div class="opts">'+opts.map(function(o){
        return '<label class="opt"><input type="radio" name="'+name+'" value="'+o[0]+'"> <span>'+o[1]+'</span></label>';
      }).join('')+'</div></fieldset>';
    }
    function cb(name,label,on){ return '<label class="opt"><input type="checkbox" name="'+name+'" value="'+on+'"> <span>'+label+'</span></label>'; }
    function rate(v,l){ return '<label class="opt"><input type="radio" name="rate" value="'+v+'"> <span>'+l+'</span></label>'; }

    var form=panel.querySelector('#a11y-form'), box=panel.querySelector('.box'), status=panel.querySelector('#a11y-status');
    var lastFocus=null;

    function sync(){
      Array.prototype.forEach.call(form.elements,function(el){
        if(!el.name) return;
        if(el.type==='radio') el.checked=(prefs[el.name]===el.value);
        else if(el.type==='checkbox') el.checked=(prefs[el.name]===el.value);
      });
    }
    sync();

    form.addEventListener('change',function(e){
      var el=e.target; if(!el.name) return;
      if(el.type==='checkbox') prefs[el.name]=el.checked?el.value:DEFAULTS[el.name];
      else prefs[el.name]=el.value;
      save(); apply();
      status.textContent='Setting changed: '+(el.parentNode.textContent||'').trim()+'.';
    });

    function openPanel(){
      lastFocus=document.activeElement;
      panel.classList.add('open'); btn.setAttribute('aria-expanded','true');
      var first=form.querySelector('input'); (first||box).focus();
      document.body.style.overflow='hidden';
    }
    function closePanel(){
      panel.classList.remove('open'); btn.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
      (lastFocus&&lastFocus.focus?lastFocus:btn).focus();
    }
    btn.addEventListener('click',openPanel);
    panel.querySelector('#a11y-close').addEventListener('click',closePanel);
    panel.addEventListener('mousedown',function(e){ if(e.target===panel) closePanel(); });
    panel.addEventListener('keydown',function(e){
      if(e.key==='Escape'){ e.preventDefault(); closePanel(); return; }
      if(e.key!=='Tab') return;
      var f=panel.querySelectorAll('input,button,a[href]'); if(!f.length) return;
      var a=f[0], z=f[f.length-1];
      if(e.shiftKey && document.activeElement===a){ e.preventDefault(); z.focus(); }
      else if(!e.shiftKey && document.activeElement===z){ e.preventDefault(); a.focus(); }
    });
    panel.querySelector('#a11y-reset').addEventListener('click',function(){
      prefs=load.call(null); for(var k in DEFAULTS) prefs[k]=DEFAULTS[k];
      save(); apply(); sync(); stopSpeech(); status.textContent='All options reset to default.';
    });

    /* reading guide follows pointer, touch and keyboard focus */
    function moveRuler(y){ ruler.style.top=Math.max(0,y-28)+'px'; }
    document.addEventListener('mousemove',function(e){ if(prefs.ruler==='on') moveRuler(e.clientY); });
    document.addEventListener('touchmove',function(e){ if(prefs.ruler==='on' && e.touches[0]) moveRuler(e.touches[0].clientY); },{passive:true});
    document.addEventListener('focusin',function(e){ if(prefs.ruler==='on' && e.target.getBoundingClientRect && !panel.contains(e.target)){ var r=e.target.getBoundingClientRect(); moveRuler(r.top+r.height/2); } });
    moveRuler(window.innerHeight/3);

    /* ---------- read aloud ---------- */
    var synth=window.speechSynthesis, speaking=false;
    var playBtn=panel.querySelector('#a11y-play'), pauseBtn=panel.querySelector('#a11y-pause'), stopBtn=panel.querySelector('#a11y-stop');
    if(!synth || !window.SpeechSynthesisUtterance){
      playBtn.disabled=pauseBtn.disabled=stopBtn.disabled=true;
      playBtn.parentNode.parentNode.querySelector('p').textContent='Your browser does not support read-aloud. Your device\'s own screen reader or "speak screen" feature will read this page.';
    }
    function mainText(){
      var m=document.getElementById('main')||document.body, c=m.cloneNode(true);
      Array.prototype.forEach.call(c.querySelectorAll('script,style,iframe,nav,[aria-hidden="true"],.note b'),function(n){ n.remove(); });
      return (c.innerText||c.textContent||'').replace(/\s+\n/g,'\n').replace(/\n{2,}/g,'\n\n').trim();
    }
    function chunks(t){
      var out=[], parts=t.split(/\n+/), cur='';
      parts.forEach(function(p){ if((cur+' '+p).length>220 && cur){ out.push(cur); cur=p; } else cur=(cur?cur+' ':'')+p; });
      if(cur) out.push(cur); return out;
    }
    function startSpeech(){
      if(!synth) return; stopSpeech();
      var list=chunks(mainText()), i=0, r=parseFloat(prefs.rate)||1;
      speaking=true; status.textContent='Reading aloud.';
      (function next(){
        if(!speaking || i>=list.length){ speaking=false; status.textContent='Finished reading.'; return; }
        var u=new SpeechSynthesisUtterance(list[i++]); u.lang='en-GB'; u.rate=r;
        u.onend=next; u.onerror=function(){ speaking=false; };
        synth.speak(u);
      })();
    }
    function stopSpeech(){ speaking=false; if(synth){ synth.cancel(); } }
    if(synth){
      playBtn.addEventListener('click',startSpeech);
      pauseBtn.addEventListener('click',function(){
        if(synth.paused){ synth.resume(); pauseBtn.textContent='Pause'; status.textContent='Resumed.'; }
        else { synth.pause(); pauseBtn.textContent='Resume'; status.textContent='Paused.'; }
      });
      stopBtn.addEventListener('click',function(){ stopSpeech(); pauseBtn.textContent='Pause'; status.textContent='Stopped.'; });
      window.addEventListener('beforeunload',stopSpeech);
    }
  });
})();
