import{t as e}from"./src.D4g-sLQa.js";var t=`This Is Just To Say
William Carlos Williams, 1934

I have eaten
the plums
that were in
the icebox

and which
you were probably
saving
for breakfast

Forgive me
they were delicious
so sweet
and so cold`.split(`
`).map(e=>({text:e})),n=new e({container:`container`,autoFit:!0});n.options({type:`text`,data:t,encode:{x:.5,y:(e,t)=>t,text:`text`,color:(e,t)=>t,opacity:(e,t)=>t},scale:{y:{type:`point`},color:{offset:e=>1-e}},style:{textAlign:`center`,textBaseline:`middle`,fontSize:16},axis:!1,legend:!1}),n.render();