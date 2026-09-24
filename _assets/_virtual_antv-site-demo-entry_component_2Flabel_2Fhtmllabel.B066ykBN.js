import{t as e}from"./src.D4g-sLQa.js";var t=new e({container:`container`,autoFit:!0});t.options({type:`interval`,data:[{repo:`G`,star:918},{repo:`G2`,star:11688},{repo:`G6`,star:10045},{repo:`L7`,star:3125},{repo:`F2`,star:7820},{repo:`S2`,star:1231},{repo:`X6`,star:4755}],encode:{x:`repo`,y:`star`,color:`repo`},labels:[{text:`star`,render:(e,t)=>`
        <div style="left:-50%;top:-20px;position:relative;font-size:14px;">
          <span>${t.repo}</span>
          :
          <a href="https://github.com/antvis/${t.repo}" target="_blank">${t.star}</a>
        </div>
      `}],legend:!1}),t.render();