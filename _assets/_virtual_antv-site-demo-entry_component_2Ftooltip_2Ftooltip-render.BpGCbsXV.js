import{t as e}from"./src.D4g-sLQa.js";var t=new e({container:`container`});t.options({type:`interval`,interaction:{tooltip:{render:(e,{title:t,items:n})=>`
  <div
    style="
      width: 300px;
      background: #f2f2f2;
      border-radius: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      margin: -12px;
    "
  >
    <h2
      style="
        margin-bottom: 9px; 
        font-size: 18px; 
        line-height: 30px; 
        font-weight: 500px"
    >
      Letter: ${t}
    </h2>
    ${n.map(e=>`<div style="font-size: 16px; color: #666">name: ${e.name}
          <br/>
          value: 
          <div style="width:${e.value*1e3}px;height:10px;display:inline-block;background:${e.color}"></div>
          ${e.value}
        </div>`).join(``)}
  </div>
  `}},data:{type:`fetch`,value:`https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv`},transform:[{type:`sortX`,by:`y`,reverse:!0}],encode:{x:`letter`,y:`frequency`}}),t.render();