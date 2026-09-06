// ==UserScript==
// @name         Save button in overlay
// @namespace    hmm
// @version      1.0.2
// @author       MisthiPlayz
// @description  Adds a save button to the YouTube player overlay.
// @match        https://www.youtube.com/*
// @grant        GM_log
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @downloadURL https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/customytsavebutton.user.js
// @updateURL https://github.com/MisthiPlayz/violent-script/raw/refs/heads/main/customytsavebutton.user.js
// ==/UserScript==

(function(){
  'use strict';
  const q=(s,p=document)=>p.querySelector(s);
  const wait=(fn,d=500)=>setTimeout(fn,d);
  let lastUrl=location.href;
  let buttonCreated=false;
  
  new MutationObserver(()=>{
    if(location.href!==lastUrl){
      lastUrl=location.href;
      buttonCreated=false;
      wait(init,1e3);
    }
  }).observe(document,{subtree:true,childList:true});
  
  function init(){
    const existingButton=document.querySelector('.custom-save-button');
    if(existingButton||buttonCreated)return;
    
    const b=q('button[aria-label="Save to playlist"]');
    const l=q('.ytp-right-controls-left');
    if(!b||!l)return wait(init,500);
    
    const n=document.createElement('div');
    n.className='ytp-button custom-save-button';
    Object.assign(n.style,{display:'inline-flex',alignItems:'center',justifyContent:'center',height:'100%',padding:'0 4px',background:'transparent',border:'none',cursor:'pointer',verticalAlign:'middle'});
    n.setAttribute('aria-label','Save Video');
    n.setAttribute('title','Save Video');
    const s=document.createElementNS('http://www.w3.org/2000/svg','svg');
    s.setAttribute('viewBox','0 0 24 24');
    Object.assign(s.style,{pointerEvents:'none',display:'block',width:'24px',height:'24px',fill:'#fff',flexShrink:'0'});
    const p=document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('d','M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z');
    s.appendChild(p);n.appendChild(s);
    n.onclick=e=>{e.preventDefault();e.stopPropagation();b.click();};
    n.onmouseenter=function(){this.style.opacity='.8';};
    n.onmouseleave=function(){this.style.opacity='1';};
    const btns=l.querySelectorAll('button, button-view-model');
    btns.length>=2&&btns[1]?.parentNode===l?l.insertBefore(n,btns[1].nextSibling):l.appendChild(n);
    
    buttonCreated=true;
  }
  wait(init,1500);
})();
