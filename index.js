import{a as m,S as d,i as n}from"./assets/vendor-B0XWlCgv.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const h="55861557-2268365b5b48955757ff78c80",y="https://pixabay.com/api/";function g(o){return m.get(y,{params:{key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const b=new d(".photo-container a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".gallery"),u=document.querySelector(".loader");function L(){b.refresh()}function v(o){const r=o.map(({webformatURL:s,largeImageURL:a,tags:e,likes:t,views:i,comments:f,downloads:p})=>`<li class="photo-container">
          <a class="photo-link" href="${a}"><img src="${s}" alt="${e}" class="photo-icon"/></a>
            <ul class="info-list">
            <li class="item-info">
                <p class="label">Likes</p>
                <p class="value">${t}</p></li>
            <li class="item-info">
                <p class="label">Views</p>
                <p class="value">${i}</p></li>
            <li class="item-info">
                <p class="label">Comments</p>
                <p class="value">${f}</p></li>
            <li class="item-info">
                <p class="label">Downloads</p>
                <p class="value">${p}</p></li>
            </ul></li>`).join("");c.innerHTML=r,L()}function S(){c.innerHTML=""}function w(){u.classList.add("is-visible")}function q(){u.classList.remove("is-visible")}const P=document.querySelector(".form"),l=document.querySelector("input");P.addEventListener("submit",E);function E(o){o.preventDefault();const r=l.value.trim();if(!r){n.warning({message:"Please, enter a search query"});return}l.value="",w(),S(),g(r).then(s=>{if(s.hits.length===0){n.warning({message:"Sorry, there are no images matching your search query. Please try again!"});return}v(s.hits)}).catch(s=>{n.error({message:"Something went wrong. Please try again later."})}).finally(()=>{q()})}
//# sourceMappingURL=index.js.map
