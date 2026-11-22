import{readFileSync as a,readdirSync as b,writeFileSync as c,mkdirSync as d,existsSync as e}from"node:fs";
let I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
let T="!2R%'+,0````````*******&***&***`***`````````````AEEA!```````````&)``````````````%%\"%";
let B=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>a==1<<31&&b==-1?a:a/b|0,(a,b)=>b==-1?0:a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b|0,0,(a,b)=>+(a==b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))];
function V(p,q){
let s=new Int32Array(256),t=0,C=new Int32Array(64),u=0,m=new Int32Array(256),o=new Uint8Array(65536),l=0,i=0,x=0,n=0,N=p.length;
let E=v=>[o.subarray(0,l),v];
for(;;){
if(n==1e6)return E(10);
if(x<0||x>=N)return E(9);
let O=p[x],v=T.charCodeAt(O)-33;
if(O>83||v==63)return E(5);
let y="0124"[v>>4]|0,j=v>>2&3,k=v&3;
if(x+y>=N)return E(9);
n++;
let z=x+1+y;
if(t<j)return E(2);
if(t-j+k>256)return E(3);
x=z;
if(!O)return E(0);
if(O==1)s[t++]=p[z-1]<<24>>24;
else if(O==2)s[t++]=p[z-4]|p[z-3]<<8|p[z-2]<<16|p[z-1]<<24;
else if(O==3)t--;
else if(O==4){s[t]=s[t-1];t++;}
else if(O==5){let A=s[t-1];s[t-1]=s[t-2];s[t-2]=A;}
else if(O==6){s[t]=s[t-2];t++;}
else if(O==7){let A=s[t-3];s[t-3]=s[t-2];s[t-2]=s[t-1];s[t-1]=A;}
else if(O==23)s[t-1]=-s[t-1]|0;
else if(O==27)s[t-1]=~s[t-1];
else if(O>15&&O<35){if(O>18&&O<23&&!s[t-1])return E(4);s[t-2]=B[O-16](s[t-2],s[t-1]);t--;}
else if(O>47&&O<51){let g=(p[z-2]|p[z-1]<<8)<<16>>16,w=1;if(O!=48){let v=s[--t];w=O==49?v==0:v!=0;}if(w)x=z+g;}
else if(O==51){if(u==64)return E(7);C[u++]=z;x=p[z-2]|p[z-1]<<8;}
else if(O==52){if(!u)return E(8);x=C[--u];}
else if(O==64){let A=s[t-1];if(A<0||A>255)return E(6);s[t-1]=m[A];}
else if(O==65){let A=s[t-1],v=s[t-2];if(A<0||A>255)return E(6);t-=2;m[A]=v;}
else if(O==80){let g=String(s[t-1]);if(l+g.length>65536)return E(11);t--;for(let h=0;h<g.length;h++)o[l++]=g.charCodeAt(h);}
else if(O==81){if(l>65535)return E(11);o[l++]=s[--t]&255;}
else if(O==82)s[t++]=i<q.length?q[i++]:-1;
else return E(s[--t]&255);
}
}
for(let f of b(I).sort()){
let P=I+"/"+f+"/program.bin",Q=I+"/"+f+"/input.bin",q=e(Q)?a(Q):Buffer.alloc(0),R=V(a(P),q),o=O+"/"+f;
d(o,{recursive:true});c(o+"/stdout.bin",R[0]);c(o+"/exit.txt",R[1]+"\n");
}
