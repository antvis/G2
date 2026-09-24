import{t as e}from"./src.D4g-sLQa.js";function t(...e){return e.map(e=>Object.entries(e).map(([e,t])=>e+`:`+t).join(`;`)).join(`;`)}var n=new e({container:`container`,autoFit:!0});n.options({type:`view`,data:[{time:`16`,north:0,south:0},{time:`18`,north:7,south:-8},{time:`20`,north:6,south:-7},{time:`22`,north:9,south:-8},{time:`00`,north:5,south:-7},{time:`02`,north:8,south:-5},{time:`04`,north:6,south:-7},{time:`06`,north:7,south:-8},{time:`08`,north:9,south:-9},{time:`10`,north:6,south:-9},{time:`12`,north:5,south:-9}],interaction:{tooltip:{css:{".g2-tooltip":{background:`transparent`,"box-shadow":`none`}},render:(e,{title:n,items:r})=>{let i=()=>({background:`#fff`,"border-radius":`4px`,padding:`12px`,"box-shadow":`0 6px 12px 0 rgba(0, 0, 0, 0.12)`}),a=e=>({display:`inline-block`,width:`8px`,height:`8px`,background:e,"border-radius":`50%`});return`
       <div>
          <div style="${t(i(),{"margin-bottom":`20px`})}">
            <span>${n}</span>
            </br>
            <span style="${t(a(r[0].color))}"></span>
            <span>${r[0].name}</span>
            <span style="float:right">${r[0].value}</span>
          </div>
          <div style="${t(i())}">
            <span>${n}</span>
            </br>
            <span style=${t(a(r[1].color))}></span>
            <span>${r[1].name}</span>
            <span style="float:right">${r[1].value}</span>
          </div>
      </div>
    `}}},children:[{type:`area`,encode:{x:e=>e.time,y:`north`,color:()=>`north`,shape:`smooth`}},{type:`area`,encode:{x:e=>e.time,y:`south`,color:()=>`south`,shape:`smooth`}}]}),n.render();