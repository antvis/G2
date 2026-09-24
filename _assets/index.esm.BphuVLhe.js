import{_ as e,b as t,h as n,r,s as i,v as a,y as o}from"./asyncToGenerator.CSkX2PRb.js";import{$t as s,An as c,En as l,Fn as u,Kt as d,Ln as f,Mn as p,On as m,Pn as h,Sn as g,Tn as _,Vn as v,Xn as y,bn as b,kn as x,qn as S,r as C,t as w,xn as T}from"./index.esm.CamqqS99.js";import{O as E,a as D,i as O,l as k,t as A,u as j,v as M,y as N}from"./index.esm.BsOTILMY.js";var P=function(t){function r(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),t=y(this,r,[e,n]),t.flipYMatrix=f(u(),m(1,-1,1)),t.topology=t.createTopology(),t}return n(r,t),e(r,[{key:`applyMa4Position`,value:function(e,t){for(var n=b(),r=0;r<t.byteLength/4;r+=3)n[0]=t[r],n[1]=t[r+1],n[2]=t[r+2],n[3]=1,T(n,n,e),t[r]=n[0],t[r+1]=n[1],t[r+2]=n[2];this.updateVertexBuffer(k.POSITION,j.POSITION,0,new Uint8Array(t.buffer))}},{key:`applyMa4Normal`,value:function(e,t){var n=b(),r=h(u(),e);v(r,r),S(r,r);for(var i=0;i<t.byteLength/4;i+=3)n[0]=t[i],n[1]=t[i+1],n[2]=t[i+2],n[3]=1,T(n,n,r),t[i]=n[0],t[i+1]=n[1],t[i+2]=n[2];this.updateVertexBuffer(k.NORMAL,j.NORMAL,0,new Uint8Array(t.buffer))}},{key:`rebuildPosition`,value:function(){this.topology=this.createTopology();var e=Float32Array.from(this.topology.positions);this.applyMa4Position(this.flipYMatrix,e),this.dirty=!0}},{key:`applyMat4`,value:function(e){this.applyMa4Position(e,this.vertices[k.POSITION]),this.applyMa4Normal(e,this.vertices[k.NORMAL])}},{key:`computeBoundingBox`,value:function(){for(var e=this.topology.positions,t=-1/0,n=-1/0,r=-1/0,i=1/0,a=1/0,o=1/0,s=0;s<e.length;s+=3){var c=e[s],l=e[s+1],u=e[s+2];t=Math.max(t,c),n=Math.max(n,l),r=Math.max(r,u),i=Math.min(i,c),a=Math.min(a,l),o=Math.min(o,u)}var d=new w;return d.setMinMax([i,a,o],[t,n,r]),d}},{key:`build`,value:function(){var e=this.topology,t=e.indices,n=e.positions,r=e.normals,i=e.uvs;this.setIndexBuffer(new Uint32Array(t)),this.vertexCount=t.length,this.setVertexBuffer({bufferIndex:k.POSITION,byteStride:12,stepMode:E.VERTEX,attributes:[{format:N.F32_RGB,bufferByteOffset:0,location:j.POSITION}],data:Float32Array.from(n)}),this.setVertexBuffer({bufferIndex:k.NORMAL,byteStride:12,stepMode:E.VERTEX,attributes:[{format:N.F32_RGB,bufferByteOffset:0,location:j.NORMAL}],data:Float32Array.from(r)}),this.setVertexBuffer({bufferIndex:k.UV,byteStride:8,stepMode:E.VERTEX,attributes:[{format:N.F32_RG,bufferByteOffset:0,location:j.UV}],data:Float32Array.from(i)}),this.applyMat4(this.flipYMatrix),this.dirty=!0}}])}(A),F=4/64,I=1-F*2;function L(e,t,n,r,i,a){var o,s,u,d,f,h,g,v=_(),y=_(),b=_(),S,C,w,T=[],E=[],D=[],O=[],k=[],A,j,M,N,P,L,R,z,B,V,H;if(n>0)for(o=0;o<=r;o++)for(s=0;s<=i;s++){A=s/i*2*Math.PI-Math.PI,M=Math.sin(A),j=Math.cos(A),C=m(M*e,-n/2,j*e),S=m(M*t,n/2,j*t),x(v,C,S,o/r),c(y,p(y,S,C)),w=m(j,0,-M),c(b,l(b,w,y)),T.push(v[0],v[1],v[2]),E.push(b[0],b[1],b[2]),h=s/i,g=o/r,D.push(h,1-g);var U=g;g=h,h=U,h/=3,h=h*I+F,g=g*I+F,O.push(h,1-g),o<r&&s<i&&(R=o*(i+1)+s,z=o*(i+1)+(s+1),B=(o+1)*(i+1)+s,V=(o+1)*(i+1)+(s+1),k.push(R,z,B),k.push(z,V,B))}if(a){var W,G,K=Math.floor(i/2),q=i,J=n/2;for(W=0;W<=K;W++)for(A=W*Math.PI*.5/K,M=Math.sin(A),j=Math.cos(A),G=0;G<=q;G++)N=G*2*Math.PI/q-Math.PI/2,P=Math.sin(N),L=Math.cos(N),u=L*M,d=j,f=P*M,h=1-G/q,g=1-W/K,T.push(u*t,d*t+J,f*t),E.push(u,d,f),D.push(h,1-g),h/=3,g/=3,h=h*I+F,g=g*I+F,h+=1/3,O.push(h,1-g);for(H=(r+1)*(i+1),W=0;W<K;++W)for(G=0;G<q;++G)R=W*(q+1)+G,z=R+q+1,k.push(H+R+1,H+z,H+R),k.push(H+R+1,H+z+1,H+z);for(W=0;W<=K;W++)for(A=Math.PI*.5+W*Math.PI*.5/K,M=Math.sin(A),j=Math.cos(A),G=0;G<=q;G++)N=G*2*Math.PI/q-Math.PI/2,P=Math.sin(N),L=Math.cos(N),u=L*M,d=j,f=P*M,h=1-G/q,g=1-W/K,T.push(u*t,d*t-J,f*t),E.push(u,d,f),D.push(h,1-g),h/=3,g/=3,h=h*I+F,g=g*I+F,h+=2/3,O.push(h,1-g);for(H=(r+1)*(i+1)+(q+1)*(K+1),W=0;W<K;++W)for(G=0;G<q;++G)R=W*(q+1)+G,z=R+q+1,k.push(H+R+1,H+z,H+R),k.push(H+R+1,H+z+1,H+z)}else{if(H=(r+1)*(i+1),e>0)for(o=0;o<i;o++)A=o/i*2*Math.PI,u=Math.sin(A),d=-n/2,f=Math.cos(A),h=1-(u+1)/2,g=(f+1)/2,T.push(u*e,d,f*e),E.push(0,-1,0),D.push(h,1-g),h/=3,g/=3,h=h*I+F,g=g*I+F,h+=1/3,O.push(h,1-g),o>1&&k.push(H,H+o,H+o-1);if(H+=i,t>0)for(o=0;o<i;o++)A=o/i*2*Math.PI,u=Math.sin(A),d=n/2,f=Math.cos(A),h=1-(u+1)/2,g=(f+1)/2,T.push(u*t,d,f*t),E.push(0,1,0),D.push(h,1-g),h/=3,g/=3,h=h*I+F,g=g*I+F,h+=2/3,O.push(h,1-g),o>1&&k.push(H,H+o-1,H+o)}return{positions:T,normals:E,uvs:D,uvs1:O,indices:k}}var R=function(t){function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),y(this,r,[e,o({width:1,height:1,depth:1,widthSegments:1,heightSegments:1,depthSegments:1},t)])}return n(r,t),e(r,[{key:`width`,get:function(){return this.props.width},set:function(e){this.props.width!==e&&(this.props.width=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`depth`,get:function(){return this.props.depth},set:function(e){this.props.depth!==e&&(this.props.depth=e,this.rebuildPosition())}},{key:`widthSegments`,get:function(){return this.props.widthSegments},set:function(e){this.props.widthSegments!==e&&(this.props.widthSegments=e,this.build())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`depthSegments`,get:function(){return this.props.depthSegments},set:function(e){this.props.depthSegments!==e&&(this.props.depthSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.widthSegments,n=t===void 0?1:t,r=e.heightSegments,i=r===void 0?1:r,a=e.depthSegments,o=a===void 0?1:a,s=e.height,c=s===void 0?1:s,l=e.width,u=l===void 0?1:l,d=e.depth,f=d===void 0?1:d,h=n,v=i,y=o,b=u/2,S=c/2,C=f/2,w=[m(-b,-S,C),m(b,-S,C),m(b,S,C),m(-b,S,C),m(b,-S,-C),m(-b,-S,-C),m(-b,S,-C),m(b,S,-C)],T=[[0,1,3],[4,5,7],[3,2,6],[1,0,4],[1,4,2],[5,0,6]],E=[[0,0,1],[0,0,-1],[0,1,0],[0,-1,0],[1,0,0],[-1,0,0]],D={FRONT:0,BACK:1,TOP:2,BOTTOM:3,RIGHT:4,LEFT:5},O=[],k=[],A=[],j=[],M=[],N=0,P=function(e,t,n){for(var r,i,a=0,o;a<=t;a++)for(o=0;o<=n;o++){var s=_(),c=_(),l=_(),u=_();x(s,w[T[e][0]],w[T[e][1]],a/t),x(c,w[T[e][0]],w[T[e][2]],o/n),p(l,c,w[T[e][0]]),g(u,s,l),r=a/t,i=o/n,O.push(u[0],u[1],u[2]),k.push(E[e][0],E[e][1],E[e][2]),A.push(r,1-i),r/=3,i/=3,r=r*I+F,i=i*I+F,r+=e%3/3,i+=Math.floor(e/3)/3,j.push(r,1-i),a<t&&o<n&&(M.push(N+n+1,N+1,N),M.push(N+n+1,N+n+2,N+1)),N++}};return P(D.FRONT,h,v),P(D.BACK,h,v),P(D.TOP,h,y),P(D.BOTTOM,h,y),P(D.RIGHT,y,v),P(D.LEFT,y,v),{indices:M,positions:O,normals:k,uvs:A,uv1s:j}}}])}(P),z=function(t){function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),y(this,r,[e,o({radius:.5,latitudeBands:16,longitudeBands:16},t)])}return n(r,t),e(r,[{key:`radius`,get:function(){return this.props.radius},set:function(e){this.props.radius!==e&&(this.props.radius=e,this.build())}},{key:`latitudeBands`,get:function(){return this.props.latitudeBands},set:function(e){this.props.latitudeBands!==e&&(this.props.latitudeBands=e,this.build())}},{key:`longitudeBands`,get:function(){return this.props.longitudeBands},set:function(e){this.props.longitudeBands!==e&&(this.props.longitudeBands=e,this.build())}},{key:`createTopology`,value:function(){var e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h=this.props,g=h.radius,_=g===void 0?.5:g,v=h.latitudeBands,y=v===void 0?16:v,b=h.longitudeBands,x=b===void 0?16:b,S=[],C=[],w=[],T=[];for(t=0;t<=y;t++)for(n=t*Math.PI/y,r=Math.sin(n),i=Math.cos(n),e=0;e<=x;e++)a=e*2*Math.PI/x-Math.PI/2,o=Math.sin(a),s=Math.cos(a),u=s*r,d=i,f=o*r,p=1-e/x,m=1-t/y,S.push(u*_,d*_,f*_),C.push(u,d,f),w.push(p,1-m);for(t=0;t<y;++t)for(e=0;e<x;++e)c=t*(x+1)+e,l=c+x+1,T.push(c+1,l,c),T.push(c+1,l+1,l);return{indices:T,positions:S,normals:C,uvs:w,uv1s:w}}}])}(P),B=function(t){function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),y(this,r,[e,o({tubeRadius:.2,ringRadius:.3,segments:30,sides:20},t)])}return n(r,t),e(r,[{key:`tubeRadius`,get:function(){return this.props.tubeRadius},set:function(e){this.props.tubeRadius!==e&&(this.props.tubeRadius=e,this.build())}},{key:`ringRadius`,get:function(){return this.props.ringRadius},set:function(e){this.props.ringRadius!==e&&(this.props.ringRadius=e,this.build())}},{key:`segments`,get:function(){return this.props.segments},set:function(e){this.props.segments!==e&&(this.props.segments=e,this.build())}},{key:`sides`,get:function(){return this.props.sides},set:function(e){this.props.sides!==e&&(this.props.sides=e,this.build())}},{key:`createTopology`,value:function(){var e,t,n,r,i,a,o,s,c,l,u=this.props,d=u.tubeRadius,f=d===void 0?.2:d,p=u.ringRadius,m=p===void 0?.3:p,h=u.segments,g=h===void 0?30:h,_=u.sides,v=_===void 0?20:_,y=f,b=m,x=[],S=[],C=[],w=[];for(c=0;c<=v;c++)for(l=0;l<=g;l++)if(e=Math.cos(2*Math.PI*l/g)*(b+y*Math.cos(2*Math.PI*c/v)),t=Math.sin(2*Math.PI*c/v)*y,n=Math.sin(2*Math.PI*l/g)*(b+y*Math.cos(2*Math.PI*c/v)),r=Math.cos(2*Math.PI*l/g)*Math.cos(2*Math.PI*c/v),i=Math.sin(2*Math.PI*c/v),a=Math.sin(2*Math.PI*l/g)*Math.cos(2*Math.PI*c/v),o=c/v,s=1-l/g,x.push(e,t,n),S.push(r,i,a),C.push(o,1-s),c<v&&l<g){var T=c*(g+1)+l,E=(c+1)*(g+1)+l,D=c*(g+1)+(l+1),O=(c+1)*(g+1)+(l+1);w.push(T,E,D),w.push(E,O,D)}return{indices:w,positions:x,normals:S,uvs:C,uv1s:C}}}])}(P),V=function(t){function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),y(this,r,[e,o({width:1,depth:1,widthSegments:5,depthSegments:5},t)])}return n(r,t),e(r,[{key:`width`,get:function(){return this.props.width},set:function(e){this.props.width!==e&&(this.props.width=e,this.rebuildPosition())}},{key:`depth`,get:function(){return this.props.depth},set:function(e){this.props.depth!==e&&(this.props.depth=e,this.rebuildPosition())}},{key:`widthSegments`,get:function(){return this.props.widthSegments},set:function(e){this.props.widthSegments!==e&&(this.props.widthSegments=e,this.build())}},{key:`depthSegments`,get:function(){return this.props.depthSegments},set:function(e){this.props.depthSegments!==e&&(this.props.depthSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=[],t=[],n=[],r=[],i=this.props,a=i.widthSegments,o=a===void 0?5:a,s=i.depthSegments,c=s===void 0?5:s,l=i.width,u=l===void 0?1:l,d=i.depth,f=d===void 0?1:d,p={x:u/2,y:f/2},m=o,h=c,g,_,v,y,b,x,S,C=0;for(g=0;g<=m;g++)for(_=0;_<=h;_++)v=-p.x+2*p.x*g/m,y=0,b=-(-p.y+2*p.y*_/h),x=g/m,S=_/h,e.push(v,y,b),t.push(0,1,0),n.push(x,1-S),g<m&&_<h&&(r.push(C+h+1,C+1,C),r.push(C+h+1,C+h+2,C+1)),C++;return{indices:r,positions:e,normals:t,uvs:n,uv1s:n}}}])}(P),H=function(t){function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),y(this,r,[e,o({radius:.5,height:1,heightSegments:5,capSegments:20},t)])}return n(r,t),e(r,[{key:`radius`,get:function(){return this.props.radius},set:function(e){this.props.radius!==e&&(this.props.radius=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`capSegments`,get:function(){return this.props.capSegments},set:function(e){this.props.capSegments!==e&&(this.props.capSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.radius,n=e.height,r=e.heightSegments,i=e.capSegments,a=L(t,t,n,r,i,!1);return{indices:a.indices,positions:a.positions,normals:a.normals,uvs:a.uvs,uv1s:a.uvs1}}}])}(P),U=function(t){function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),y(this,r,[e,o({baseRadius:.5,peakRadius:0,height:1,heightSegments:5,capSegments:18},t)])}return n(r,t),e(r,[{key:`baseRadius`,get:function(){return this.props.baseRadius},set:function(e){this.props.baseRadius!==e&&(this.props.baseRadius=e,this.rebuildPosition())}},{key:`peakRadius`,get:function(){return this.props.peakRadius},set:function(e){this.props.peakRadius!==e&&(this.props.peakRadius=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`capSegments`,get:function(){return this.props.capSegments},set:function(e){this.props.capSegments!==e&&(this.props.capSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.baseRadius,n=e.peakRadius,r=e.height,i=e.heightSegments,a=e.capSegments,o=L(t,n,r,i,a,!1);return{indices:o.indices,positions:o.positions,normals:o.normals,uvs:o.uvs,uv1s:o.uvs1}}}])}(P),W=function(t){function r(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return a(this,r),y(this,r,[e,o({radius:.5,height:1,heightSegments:1,sides:20},t)])}return n(r,t),e(r,[{key:`radius`,get:function(){return this.props.radius},set:function(e){this.props.radius!==e&&(this.props.radius=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`sides`,get:function(){return this.props.sides},set:function(e){this.props.sides!==e&&(this.props.sides=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.radius,n=e.height,r=e.heightSegments,i=e.sides,a=L(t,t,n-2*t,r,i,!0);return{indices:a.indices,positions:a.positions,normals:a.normals,uvs:a.uvs,uv1s:a.uvs1}}}])}(P),G=[`style`],K=function(t){function i(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.style,s=r(t,G);return a(this,i),e=y(this,i,[o({style:o({fill:`black`},n)},s)]),e.define=`NUM_AMBIENT_LIGHTS`,e.order=-1,e}return n(i,t),e(i,[{key:`uploadUBO`,value:function(e,t){var n=this.parsedStyle.fill;if(d(n)){var r=[Number(n.r)/255,Number(n.g)/255,Number(n.b)/255];e.push({name:`u_AmbientLightColor`,value:r})}}}])}(O),q=[`style`],J=function(t){function i(){var e,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.style,s=r(t,q);return a(this,i),e=y(this,i,[o({style:o({direction:m(0,-1,0)},n)},s)]),e.define=`NUM_DIR_LIGHTS`,e.order=10,e}return n(i,t),e(i,[{key:`getUniformWordCount`,value:function(){return 8}},{key:`uploadUBO`,value:function(e,t){var n=this.parsedStyle,r=n.fill,i=n.direction,a=n.intensity;if(d(r)){var o=[Number(r.r)/255,Number(r.g)/255,Number(r.b)/255];e.push({name:`directionalLights[${t}].direction`,value:i}),e.push({name:`directionalLights[${t}].intensity`,value:a}),e.push({name:`directionalLights[${t}].color`,value:o})}}}])}(O);J.PARSED_STYLE_LIST=new Set([].concat(i(O.PARSED_STYLE_LIST),[`direction`]));var ee=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec4 u_Placeholder;
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

void main() {
  // WGSL will remove unused uniforms.
  float a = u_Placeholder.x;

  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  gl_Position = project(vec4(a_Position, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,te=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec4 u_Placeholder;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#ifdef USE_WIREFRAME
  in vec3 v_Barycentric;

  float edgeFactor() {
    vec3 d = fwidth(v_Barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * u_WireframeLineWidth, v_Barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }
#endif

#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;
    vec4 diffuseColor = outputColor;

    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    reflectedLight.indirectDiffuse += vec3( 1.0 );
    reflectedLight.indirectDiffuse *= outputColor.rgb;

    vec3 outgoingLight = reflectedLight.indirectDiffuse;
    
    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_WIREFRAME
  vec3 color = mix(outputColor.xyz, u_WireframeLineColor, (1.0 - edgeFactor()));
  outputColor.xyz = color;
#endif
    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,Y=function(e){return e.MAP=`u_Map`,e.PLACE_HOLDER=`u_Placeholder`,e}(Y||{}),X=function(r){function i(e,n){var r;a(this,i),r=y(this,i,[e,o({vertexShader:ee,fragmentShader:te,cullMode:M.BACK},n)]),r.defines=o(o({},r.defines),{},{USE_UV:!0,USE_MAP:!1,USE_WIREFRAME:!1,USE_FOG:!1,USE_LIGHT:!1});var s=n||{},c=s.map,l=s.wireframe;return c&&(r.map=c),r.wireframe=l,r.setUniforms(t({},Y.PLACE_HOLDER,[0,0,0,0])),r}return n(i,r),e(i,[{key:`map`,get:function(){return this.props.map},set:function(e){this.props.map!==e&&(this.props.map=e,this.programDirty=!0),this.setUniforms(t({},Y.MAP,e))}},{key:`aoMap`,get:function(){return this.props.aoMap},set:function(e){this.props.aoMap=e}}])}(D),ne=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;
  float u_Shininess;
  vec3 u_Specular;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#if defined(USE_BUMPMAP) && defined(USE_LIGHT)
  uniform sampler2D u_BumpMap;

  // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
  // http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

  // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

  vec2 dHdxy_fwd() {
    vec2 dSTdx = dFdx( v_Uv );
    vec2 dSTdy = dFdy( v_Uv );

    float Hll = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv ).x;
    float dBx = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdx ).x - Hll;
    float dBy = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdy ).x - Hll;

    return vec2( dBx, dBy );
  }

  vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

    vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
    vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
    vec3 vN = surf_norm;		// normalized

    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );

    float fDet = dot( vSigmaX, R1 ) * faceDirection;

    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );
  }
#endif
#ifdef USE_SPECULARMAP
  uniform sampler2D u_SpecularMap;
#endif
vec3 BRDF_Lambert(vec3 diffuseColor) {
  return RECIPROCAL_PI * diffuseColor;
}

vec3 F_Schlick(
  vec3 f0,
  float f90,
  float dotVH
) {
  // Original approximation by Christophe Schlick '94
  // float fresnel = pow( 1.0 - dotVH, 5.0 );

  // Optimized variant (presented by Epic at SIGGRAPH '13)
  // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}

float G_BlinnPhong_Implicit( /* float dotNL, float dotNV */ ) {
  // geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
  return 0.25;
}

float D_BlinnPhong(
  float shininess,
  float dotNH
) {
  return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}

vec3 BRDF_BlinnPhong(
  vec3 lightDir,
  vec3 viewDir,
  vec3 normal,
  vec3 specularColor,
  float shininess
) {
  vec3 halfDir = normalize( lightDir + viewDir );

  float dotNH = saturate( dot( normal, halfDir ) );
  float dotVH = saturate( dot( viewDir, halfDir ) );

  vec3 F = F_Schlick( specularColor, 1.0, dotVH );

  float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

  float D = D_BlinnPhong( shininess, dotNH );

  return F * ( G * D );
}

#ifdef USE_WIREFRAME
  in vec3 v_Barycentric;

  float edgeFactor() {
    vec3 d = fwidth(v_Barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * u_WireframeLineWidth, v_Barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }
#endif

#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

#ifdef USE_LIGHT
  void getDirectionalLightInfo(
    DirectionalLight directionalLight, 
    GeometricContext geometry,
    out IncidentLight light
  ) {
    light.color = directionalLight.color * directionalLight.intensity;
    light.direction = normalize(directionalLight.direction);
    light.visible = true;
  }

  vec3 getAmbientLightIrradiance( vec3 ambientLightColor ) {
    vec3 irradiance = ambientLightColor;
    return irradiance;
  }
#endif
struct BlinnPhongMaterial {
  vec3 diffuseColor;
  vec3 specularColor;
  float specularShininess;
  float specularStrength;
};

void RE_Direct_BlinnPhong(
  IncidentLight directLight,
  GeometricContext geometry,
  BlinnPhongMaterial material,
  inout ReflectedLight reflectedLight
) {
  float dotNL = saturate(dot(geometry.normal, directLight.direction));
  vec3 irradiance = dotNL * directLight.color;

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

  reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}

void RE_IndirectDiffuse_BlinnPhong(
  vec3 irradiance,
  GeometricContext geometry,
  BlinnPhongMaterial material,
  inout ReflectedLight reflectedLight
) {
  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

#define RE_Direct           RE_Direct_BlinnPhong
#define RE_IndirectDiffuse  RE_IndirectDiffuse_BlinnPhong

in vec3 v_ViewPosition;
in vec3 v_Normal;

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}

  // diffusemap
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif
  // specularmap
  float specularStrength = 1.0;

#ifdef USE_SPECULARMAP
  vec4 texelSpecular = texture(SAMPLER_2D(u_SpecularMap), v_Uv);
  specularStrength = texelSpecular.r;
#endif
  // bumpmap & normalmap
  float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
vec3 normal = normalize(v_Normal);
#ifdef USE_DOUBLESIDE
  normal = normal * faceDirection;
#endif

// #ifdef USE_TANGENT
//   vec3 tangent = normalize( vTangent );
//   vec3 bitangent = normalize( vBitangent );

//   #ifdef DOUBLE_SIDED
//     tangent = tangent * faceDirection;
//     bitangent = bitangent * faceDirection;
//   #endif

// #if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )

// mat3 vTBN = mat3( tangent, bitangent, normal );

// #endif
// #endif
  #ifdef OBJECTSPACE_NORMALMAP
  // normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

  // #ifdef FLIP_SIDED
  //   normal = - normal;
  // #endif

  // #ifdef DOUBLE_SIDED
  //   normal = normal * faceDirection;
  // #endif

  // normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
  // vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
  // mapN.xy *= normalScale;

  // #ifdef USE_TANGENT
  //   normal = normalize( vTBN * mapN );
  // #else
  //   normal = perturbNormal2Arb( - v_ViewPosition, normal, mapN, faceDirection );
  // #endif

#elif defined(USE_BUMPMAP) && defined(USE_LIGHT)
  normal = perturbNormalArb( - v_ViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;

    vec4 diffuseColor = outputColor;
    ReflectedLight reflectedLight = ReflectedLight(vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ));
    vec3 totalEmissiveRadiance = u_Emissive;

    // calculate lighting accumulation
    BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = u_Specular;
material.specularShininess = u_Shininess;
material.specularStrength = specularStrength;
    GeometricContext geometry;
geometry.position = - v_ViewPosition;
geometry.normal = normal;
geometry.viewDir = u_IsOrtho == 1.0 ? vec3(0, 0, 1) : normalize(v_ViewPosition);

IncidentLight directLight;
#if defined( NUM_DIR_LIGHTS ) && ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
  DirectionalLight directionalLight;
  #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
  #endif

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

    directionalLight = directionalLights[ i ];

    getDirectionalLightInfo( directionalLight, geometry, directLight );

    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
    #endif

    RE_Direct( directLight, geometry, material, reflectedLight );
  }
  #pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )
  vec3 iblIrradiance = vec3(0.0);
  vec3 ambient = vec3(0.0);
  #ifdef NUM_AMBIENT_LIGHTS
    ambient = u_AmbientLightColor;
  #endif
  vec3 irradiance = getAmbientLightIrradiance(ambient);

  // irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
  // #if ( NUM_HEMI_LIGHTS > 0 )
  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
  //     irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
  //   }
  //   #pragma unroll_loop_end
  // #endif
#endif

#if defined( RE_IndirectSpecular )
  vec3 radiance = vec3( 0.0 );
  vec3 clearcoatRadiance = vec3( 0.0 );
#endif

    #if defined( RE_IndirectDiffuse )
  RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif

#if defined( RE_IndirectSpecular )
  RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif

    vec3 outgoingLight = reflectedLight.directDiffuse +
      reflectedLight.indirectDiffuse + 
      reflectedLight.directSpecular + 
      reflectedLight.indirectSpecular + 
      totalEmissiveRadiance;

    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_WIREFRAME
  vec3 color = mix(outputColor.xyz, u_WireframeLineColor, (1.0 - edgeFactor()));
  outputColor.xyz = color;
#endif
    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,re=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;
  float u_Shininess;
  vec3 u_Specular;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = NORMAL) in vec3 a_Normal;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

out vec3 v_ViewPosition;
out vec3 v_Normal;

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  vec4 position = vec4(a_Position, 1.0);

  gl_Position = project(position, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  vec4 mvPosition = u_ViewMatrix * u_ModelMatrix * position;
  v_ViewPosition = - mvPosition.xyz;

  // v_ViewPosition = vec3(mvPosition) / mvPosition.w;

  mat3 normalWorld = mat3(transposeMat3(inverseMat3(mat3(u_ViewMatrix * u_ModelMatrix))));
  v_Normal = normalize(normalWorld * a_Normal);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,Z=function(e){return e.EMISSIVE=`u_Emissive`,e.SHININESS=`u_Shininess`,e.SPECULAR=`u_Specular`,e.BUMP_SCALE=`u_BumpScale`,e.SPECULAR_MAP=`u_SpecularMap`,e.BUMP_MAP=`u_BumpMap`,e}(Z||{}),ie=function(r){function i(e,n){var r;a(this,i),r=y(this,i,[e,o({vertexShader:re,fragmentShader:ne,emissive:`black`,shininess:30,specular:`#111111`,bumpScale:1,doubleSide:!1},n)]);var c=r,l=c.specularMap,u=c.bumpMap,d=c.doubleSide,f=c.emissive,p=c.shininess,m=c.specular,h=s(f),g=s(m);return r.setUniforms(t(t(t({u_Placeholder:null},Z.EMISSIVE,[Number(h.r)/255,Number(h.g)/255,Number(h.b)/255]),Z.SHININESS,p),Z.SPECULAR,[Number(g.r)/255,Number(g.g)/255,Number(g.b)/255])),l&&(r.specularMap=l),u&&(r.bumpMap=u),r.doubleSide=d,r.defines=o(o({},r.defines),{},{USE_LIGHT:!0}),r}return n(i,r),e(i,[{key:`emissive`,get:function(){return this.props.emissive},set:function(e){this.props.emissive=e;var n=s(e);this.setUniforms(t({},Z.EMISSIVE,[Number(n.r)/255,Number(n.g)/255,Number(n.b)/255]))}},{key:`shininess`,get:function(){return this.props.shininess},set:function(e){this.props.shininess=e,this.setUniforms(t({},Z.SHININESS,e))}},{key:`specular`,get:function(){return this.props.specular},set:function(e){this.props.specular=e;var n=s(e);this.setUniforms(t({},Z.SPECULAR,[Number(n.r)/255,Number(n.g)/255,Number(n.b)/255]))}},{key:`specularMap`,get:function(){return this.props.specularMap},set:function(e){this.props.map!==e&&(this.props.specularMap=e,this.programDirty=!0),this.defines.USE_SPECULARMAP=!!e,this.setUniforms(t({},Z.SPECULAR_MAP,e))}},{key:`bumpMap`,get:function(){return this.props.bumpMap},set:function(e){this.props.map!==e&&(this.props.bumpMap=e,this.programDirty=!0),this.defines.USE_BUMPMAP=!!e,this.setUniforms(t(t({},Z.BUMP_MAP,e),Z.BUMP_SCALE,this.bumpScale))}},{key:`bumpScale`,get:function(){return this.props.bumpScale},set:function(e){this.props.bumpScale=e,this.setUniforms(t({},Z.BUMP_SCALE,e))}},{key:`doubleSide`,get:function(){return this.props.doubleSide},set:function(e){this.props.doubleSide=e,this.defines.USE_DOUBLESIDE=e}}])}(X),ae=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#if defined(USE_BUMPMAP) && defined(USE_LIGHT)
  uniform sampler2D u_BumpMap;

  // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
  // http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

  // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

  vec2 dHdxy_fwd() {
    vec2 dSTdx = dFdx( v_Uv );
    vec2 dSTdy = dFdy( v_Uv );

    float Hll = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv ).x;
    float dBx = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdx ).x - Hll;
    float dBy = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdy ).x - Hll;

    return vec2( dBx, dBy );
  }

  vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

    vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
    vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
    vec3 vN = surf_norm;		// normalized

    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );

    float fDet = dot( vSigmaX, R1 ) * faceDirection;

    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );
  }
#endif
#ifdef USE_SPECULARMAP
  uniform sampler2D u_SpecularMap;
#endif
vec3 BRDF_Lambert(vec3 diffuseColor) {
  return RECIPROCAL_PI * diffuseColor;
}

vec3 F_Schlick(
  vec3 f0,
  float f90,
  float dotVH
) {
  // Original approximation by Christophe Schlick '94
  // float fresnel = pow( 1.0 - dotVH, 5.0 );

  // Optimized variant (presented by Epic at SIGGRAPH '13)
  // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}

float G_BlinnPhong_Implicit( /* float dotNL, float dotNV */ ) {
  // geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
  return 0.25;
}

float D_BlinnPhong(
  float shininess,
  float dotNH
) {
  return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}

vec3 BRDF_BlinnPhong(
  vec3 lightDir,
  vec3 viewDir,
  vec3 normal,
  vec3 specularColor,
  float shininess
) {
  vec3 halfDir = normalize( lightDir + viewDir );

  float dotNH = saturate( dot( normal, halfDir ) );
  float dotVH = saturate( dot( viewDir, halfDir ) );

  vec3 F = F_Schlick( specularColor, 1.0, dotVH );

  float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

  float D = D_BlinnPhong( shininess, dotNH );

  return F * ( G * D );
}

#ifdef USE_WIREFRAME
  in vec3 v_Barycentric;

  float edgeFactor() {
    vec3 d = fwidth(v_Barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * u_WireframeLineWidth, v_Barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }
#endif

#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

#ifdef USE_LIGHT
  void getDirectionalLightInfo(
    DirectionalLight directionalLight, 
    GeometricContext geometry,
    out IncidentLight light
  ) {
    light.color = directionalLight.color * directionalLight.intensity;
    light.direction = normalize(directionalLight.direction);
    light.visible = true;
  }

  vec3 getAmbientLightIrradiance( vec3 ambientLightColor ) {
    vec3 irradiance = ambientLightColor;
    return irradiance;
  }
#endif
struct LambertMaterial {
  vec3 diffuseColor;
  float specularStrength;
};

void RE_Direct_Lambert(
  IncidentLight directLight,
  GeometricContext geometry,
  LambertMaterial material,
  inout ReflectedLight reflectedLight
) {
  float dotNL = saturate(dot(geometry.normal, directLight.direction));
  vec3 irradiance = dotNL * directLight.color;

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert(material.diffuseColor);
}

void RE_IndirectDiffuse_Lambert(
  vec3 irradiance,
  GeometricContext geometry,
  LambertMaterial material,
  inout ReflectedLight reflectedLight
) {
  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert(material.diffuseColor);
}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert

in vec3 v_ViewPosition;
in vec3 v_Normal;

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}

  // diffusemap
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif
  // specularmap
  float specularStrength = 1.0;

#ifdef USE_SPECULARMAP
  vec4 texelSpecular = texture(SAMPLER_2D(u_SpecularMap), v_Uv);
  specularStrength = texelSpecular.r;
#endif
  // bumpmap & normalmap
  float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
vec3 normal = normalize(v_Normal);
#ifdef USE_DOUBLESIDE
  normal = normal * faceDirection;
#endif

// #ifdef USE_TANGENT
//   vec3 tangent = normalize( vTangent );
//   vec3 bitangent = normalize( vBitangent );

//   #ifdef DOUBLE_SIDED
//     tangent = tangent * faceDirection;
//     bitangent = bitangent * faceDirection;
//   #endif

// #if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )

// mat3 vTBN = mat3( tangent, bitangent, normal );

// #endif
// #endif
  #ifdef OBJECTSPACE_NORMALMAP
  // normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

  // #ifdef FLIP_SIDED
  //   normal = - normal;
  // #endif

  // #ifdef DOUBLE_SIDED
  //   normal = normal * faceDirection;
  // #endif

  // normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
  // vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
  // mapN.xy *= normalScale;

  // #ifdef USE_TANGENT
  //   normal = normalize( vTBN * mapN );
  // #else
  //   normal = perturbNormal2Arb( - v_ViewPosition, normal, mapN, faceDirection );
  // #endif

#elif defined(USE_BUMPMAP) && defined(USE_LIGHT)
  normal = perturbNormalArb( - v_ViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;

    vec4 diffuseColor = outputColor;
    ReflectedLight reflectedLight = ReflectedLight(vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ));
    vec3 totalEmissiveRadiance = u_Emissive;

    // calculate lighting accumulation
    LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
    GeometricContext geometry;
geometry.position = - v_ViewPosition;
geometry.normal = normal;
geometry.viewDir = u_IsOrtho == 1.0 ? vec3(0, 0, 1) : normalize(v_ViewPosition);

IncidentLight directLight;
#if defined( NUM_DIR_LIGHTS ) && ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
  DirectionalLight directionalLight;
  #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
  #endif

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

    directionalLight = directionalLights[ i ];

    getDirectionalLightInfo( directionalLight, geometry, directLight );

    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
    #endif

    RE_Direct( directLight, geometry, material, reflectedLight );
  }
  #pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )
  vec3 iblIrradiance = vec3(0.0);
  vec3 ambient = vec3(0.0);
  #ifdef NUM_AMBIENT_LIGHTS
    ambient = u_AmbientLightColor;
  #endif
  vec3 irradiance = getAmbientLightIrradiance(ambient);

  // irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
  // #if ( NUM_HEMI_LIGHTS > 0 )
  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
  //     irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
  //   }
  //   #pragma unroll_loop_end
  // #endif
#endif

#if defined( RE_IndirectSpecular )
  vec3 radiance = vec3( 0.0 );
  vec3 clearcoatRadiance = vec3( 0.0 );
#endif

    #if defined( RE_IndirectDiffuse )
  RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif

#if defined( RE_IndirectSpecular )
  RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif

    vec3 outgoingLight = reflectedLight.directDiffuse +
      reflectedLight.indirectDiffuse + 
      totalEmissiveRadiance;

    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_WIREFRAME
  vec3 color = mix(outputColor.xyz, u_WireframeLineColor, (1.0 - edgeFactor()));
  outputColor.xyz = color;
#endif
    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,oe=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = NORMAL) in vec3 a_Normal;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

out vec3 v_ViewPosition;
out vec3 v_Normal;

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  vec4 position = vec4(a_Position, 1.0);

  gl_Position = project(position, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  vec4 mvPosition = u_ViewMatrix * u_ModelMatrix * position;
  v_ViewPosition = - mvPosition.xyz;

  // v_ViewPosition = vec3(mvPosition) / mvPosition.w;

  mat3 normalWorld = mat3(transposeMat3(inverseMat3(mat3(u_ViewMatrix * u_ModelMatrix))));
  v_Normal = normalize(normalWorld * a_Normal);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,Q=function(e){return e.EMISSIVE=`u_Emissive`,e.BUMP_SCALE=`u_BumpScale`,e.BUMP_MAP=`u_BumpMap`,e}(Q||{}),se=function(r){function i(e,n){var r;a(this,i),r=y(this,i,[e,o({vertexShader:oe,fragmentShader:ae,emissive:`black`,bumpScale:1,doubleSide:!1},n)]);var c=r,l=c.bumpMap,u=c.doubleSide,d=c.emissive,f=s(d);return r.setUniforms(t({u_Placeholder:null},Q.EMISSIVE,[Number(f.r)/255,Number(f.g)/255,Number(f.b)/255])),l&&(r.bumpMap=l),r.doubleSide=u,r.defines=o(o({},r.defines),{},{USE_LIGHT:!0}),r}return n(i,r),e(i,[{key:`emissive`,get:function(){return this.props.emissive},set:function(e){this.props.emissive=e;var n=s(e);this.setUniforms(t({},Q.EMISSIVE,[Number(n.r)/255,Number(n.g)/255,Number(n.b)/255]))}},{key:`bumpMap`,get:function(){return this.props.bumpMap},set:function(e){this.props.map!==e&&(this.props.bumpMap=e,this.programDirty=!0),this.defines.USE_BUMPMAP=!!e,this.setUniforms(t(t({},Q.BUMP_MAP,e),Q.BUMP_SCALE,this.bumpScale))}},{key:`bumpScale`,get:function(){return this.props.bumpScale},set:function(e){this.props.bumpScale=e,this.setUniforms(t({},Q.BUMP_SCALE,e))}},{key:`doubleSide`,get:function(){return this.props.doubleSide},set:function(e){this.props.doubleSide=e,this.defines.USE_DOUBLESIDE=e}}])}(X),ce=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  float u_Size;
  vec4 u_Placeholder;
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  gl_PointSize = u_Size;
  gl_Position = project(vec4(a_Position, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,le=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  float u_Size;
  vec4 u_Placeholder;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
	vec4 mapTexel = texture(SAMPLER_2D(u_Map), uv);
  u_Color *= mapTexel;
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;
    vec4 diffuseColor = outputColor;

    vec3 outgoingLight = diffuseColor.rgb;
    
    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,$=function(e){return e.MAP=`u_Map`,e.PLACE_HOLDER=`u_Placeholder`,e.SIZE=`u_Size`,e}($||{}),ue=function(r){function i(e,n){var r;a(this,i),r=y(this,i,[e,o({vertexShader:ce,fragmentShader:le,cullMode:M.BACK},n)]),r.defines=o(o({},r.defines),{},{USE_UV:!0,USE_MAP:!1,USE_WIREFRAME:!1,USE_FOG:!1,USE_LIGHT:!1});var s=n||{},c=s.map,l=s.size;return c&&(r.map=c),r.setUniforms(t(t({},$.PLACE_HOLDER,[0,0,0,0]),$.SIZE,l||1)),r}return n(i,r),e(i,[{key:`map`,get:function(){return this.props.map},set:function(e){this.props.map!==e&&(this.props.map=e,this.programDirty=!0),this.setUniforms(t({},$.MAP,e))}},{key:`size`,get:function(){return this.props.size},set:function(e){this.props.size=e,this.setUniforms(t({},$.SIZE,e))}}])}(D),de=function(t){function r(){var e;a(this,r);var t=[...arguments];return e=y(this,r,[].concat(t)),e.name=`3d`,e}return n(r,t),e(r,[{key:`init`,value:function(){}},{key:`destroy`,value:function(){}}])}(C);export{H as a,se as c,de as d,ue as f,B as h,R as i,ie as l,z as m,W as n,J as o,P as p,U as r,X as s,K as t,V as u};