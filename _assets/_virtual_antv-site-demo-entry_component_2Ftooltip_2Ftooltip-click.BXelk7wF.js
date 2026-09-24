import{t as e}from"./src.D4g-sLQa.js";function t(...e){return e.map(e=>Object.entries(e).map(([e,t])=>e+`:`+t).join(`;`)).join(`;`)}var n=new e({container:`container`,autoFit:!0});n.options({type:`interval`,data:{type:`fetch`,value:`https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv`},encode:{x:`letter`,y:`frequency`},axis:{y:{labelFormatter:`.0%`}},interaction:{tooltip:{disableNative:!0,bounding:{x:-1/0,y:-1/0,width:1/0,height:1/0},css:{".g2-tooltip":{background:`transparent`,"box-shadow":`none`,transform:`translate(-50%, -100%)`}},offset:[0,-10],mount:`body`,render:(e,{title:r,items:i})=>{let a=n.getContext().canvas.document.getElementsByClassName(`plot`)[0].getRenderBounds(),o=e.target.getRenderBounds().min[1]-a.min[1];return`<div>
        <div style="${t({position:`relative`,background:`#fff`,"box-shadow":`0 6px 12px 0 rgba(0, 0, 0, 0.12)`,"z-index":999,padding:`12px`,"min-width":`120px`})}">
          <h2
            style="${t({"margin-bottom":`9px`,"font-size":`18px`,"line-height":`30px`,"font-weight":`500px`})}"
          >
            Letter: ${r}
          </h2>
          ${i.map(e=>`<div style="font-size: 16px; color: #666">
                  <span style="${t({height:`10px`,width:`10px`,background:e.color,display:`inline-block`,"border-radius":`50%`})}"></span>
                  <span>${e.name}</span>
                  <span>${e.value}</span>
                </div>`).join(``)}
        </div>
        <div style="${t({width:`1px`,height:o+`px`,background:`#aaa`,position:`absolute`,left:`50%`,top:`90%`,"z-index":500})}"></div>
      </div>`}}}}),n.on(`element:click`,({data:e})=>n.emit(`tooltip:show`,{data:e,offsetY:0})),n.on(`plot:click`,()=>n.emit(`tooltip:hide`)),n.render();