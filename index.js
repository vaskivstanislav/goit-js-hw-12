import{a as y,S as g,i as c}from"./assets/vendor-Rdv7LHNr.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const b="https://pixabay.com/api/",L="46069437-f48122ef32c6bd1c27031b929";async function p(o,e=1){const n=`${b}?key=${L}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${e}`;try{return(await y.get(n)).data}catch{throw new Error("Sorry, there are no images matching your search query. Please try again!")}}const w=new g(".gallery a",{captionsData:"alt",captionDelay:200});function v({webformatURL:o,largeImageURL:e,tags:n,likes:s,views:t,comments:r,downloads:i}){return`
    <div class="card">
      <div class="card-image">
        <a href="${e}" class="gallery-item-link">
          <img src="${o}" alt="${n}" />
        </a>
      </div>
      <div class="card-body">
      <p class="card-text">
        <span class="card-text-label">Likes: </span>
        <span class="card-text-value">${s}</span>
      </p>
      <p class="card-text">
        <span class="card-text-label">Comments: </span>
        <span class="card-text-value">${r}</span>
      </p>
      <p class="card-text">
        <span class="card-text-label">Views: </span>
        <span class="card-text-value">${t}</span>
      </p>
      <p class="card-text">
        <span class="card-text-label">Downloads: </span>
        <span class="card-text-value">${i}</span>
      </p>
    </div>
    </div>`}function m(o,e,n=!1){const s=o.map(v).join("");n?e.insertAdjacentHTML("beforeend",s):e.innerHTML=s,w.refresh()}let l=1,d=null,u=0;const a={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadButton:document.querySelector(".load-button")};a.form.addEventListener("submit",x);a.loadButton.addEventListener("click",S);async function x(o){if(o.preventDefault(),d=o.currentTarget.elements.query.value.trim(),d===""){c.show({title:"Oops",message:"Sorry, there are no images matching your search query. Please try again!",color:"#ef4040",position:"bottomCenter"});return}l=1,a.gallery.innerHTML="",a.loadButton.classList.add("hidden"),f();try{const e=await p(d,l);e.hits.length===0?c.show({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",color:"#ef4040",position:"bottomCenter"}):(u=e.totalHits,m(e.hits,a.gallery),u>l*15&&a.loadButton.classList.remove("hidden"))}catch{c.show({title:"Error",message:"Something went wrong. Please try again later.",color:"#ef4040",position:"bottomCenter"})}finally{h(),a.form.reset()}}async function S(o){l+=1,f();try{const e=await p(d,l);m(e.hits,a.gallery,!0),C(),u<=l*15&&(a.loadButton.classList.add("hidden"),c.show({title:"Error",message:"We're sorry, but you've reached the end of search results.",color:"#ef4040",position:"bottomCenter"}))}catch{c.show({title:"Error",message:"Something went wrong. Please try again later.",color:"#ef4040",position:"bottomCenter"})}finally{h()}}function f(){a.loader.classList.remove("hidden")}function h(){a.loader.classList.add("hidden")}function C(){const e=a.gallery.lastElementChild.getBoundingClientRect().height;window.scrollBy({top:e*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
