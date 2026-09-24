import{t as e}from"./src.D4g-sLQa.js";var t=new e({container:`container`}),n={x:e=>e.month,y:e=>200-e.rank,shape:`smooth`};t.options({type:`view`,autoFit:!0,paddingRight:10,data:[{month:`一月`,rank:200},{month:`二月`,rank:160},{month:`三月`,rank:100},{month:`四月`,rank:80},{month:`五月`,rank:99},{month:`六月`,rank:36},{month:`七月`,rank:40},{month:`八月`,rank:20},{month:`九月`,rank:12},{month:`十月`,rank:15},{month:`十一月`,rank:6},{month:`十二月`,rank:1}],scale:{y:{nice:!0,tickMethod:()=>[0,50,100,170,199]}},axis:{y:{labelFormatter:e=>`第${200-e}名`}},children:[{type:`area`,encode:n,style:{opacity:.2},axis:{y:{labelFormatter:`~s`,title:!1}},style:{fill:`l(270) 0:#ffffff 0.9:#7ec2f3 1:#1890ff`,fillOpacity:.2},tooltip:!1},{type:`line`,encode:n,interaction:{tooltip:{render:(e,{title:t,items:n})=>`
<div style="display: flex; align-items: center;">
  <span>${t}：第</span>
  <h2
    style="
        margin-left: 8px;
        margin-right: 8px;
        margin-top:4px;
        font-size: 18px;
        line-height: 36px;
        font-weight: 500px"
  >
    ${200-n[0].value}
  </h2>
  <span>名</span>
</div>
          `}},style:{lineWidth:2}}]}),t.render();