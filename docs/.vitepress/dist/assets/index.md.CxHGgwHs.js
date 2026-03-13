import{p as i,o as s,c as r,ak as n,j as o,t as l,y as p}from"./chunks/framework.Bbl5ol3_.js";const d={id:"hitokoto",style:{position:"fixed",left:"0",right:"0",bottom:"10rem","text-align":"center","font-size":"1.05rem","pointer-events":"none"}},u=JSON.parse('{"title":"https://vitepress.dev/reference/default-theme-home-page","description":"","frontmatter":{},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),c={name:"index.md"},f=Object.assign(c,{setup(h){const t=p(":D 你今天过得如何？");return i(async()=>{try{const e=await(await fetch("https://v1.hitokoto.cn")).json();t.value=e.hitokoto}catch(a){console.error(a),t.value="加载失败，请稍后重试。"}}),(a,e)=>(s(),r("div",null,[e[0]||(e[0]=n(`<hr><h1 id="https-vitepress-dev-reference-default-theme-home-page" tabindex="-1"><a href="https://vitepress.dev/reference/default-theme-home-page" target="_blank" rel="noreferrer">https://vitepress.dev/reference/default-theme-home-page</a> <a class="header-anchor" href="#https-vitepress-dev-reference-default-theme-home-page" aria-label="Permalink to “https://vitepress.dev/reference/default-theme-home-page”">​</a></h1><p>layout: home</p><p>hero:</p><p>name: &quot;Ayaskt 工作站\\nAya&#39;s Sky City&quot; text: &quot;课堂笔记 / 资源汇总&quot;</p><p>tagline: 今天或许是个不错的日子。</p><p>actions:</p><pre><code>- theme: brand
  text: 非课内学习笔记目录
  link: /Guides/Outclass

- theme: brand
  text: 第三学年笔记目录
  link: /Guides/Y3

- theme: alt
  text: 第二学年笔记目录
  link: /Guides/Y2

- theme: alt
  text: 第一学年笔记目录
  link: /Guides/Y2
</code></pre><p>features:</p><ul><li>title: Feature A details: Lorem ipsum dolor sit amet, consectetur adipiscing elit</li><li>title: Feature B details: Lorem ipsum dolor sit amet, consectetur adipiscing elit</li><li>title: Feature C details: Lorem ipsum dolor sit amet, consectetur adipiscing elit</li></ul><hr>`,11)),o("p",d,l(t.value),1)]))}});export{u as __pageData,f as default};
