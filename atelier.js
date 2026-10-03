/* Atelier edition: source-specific legends, restored typefaces and presentation motion. */
'use strict';
SLIDES[3].points[0]=['Human scale','Separate wings reduce the apparent size of the hospital.'];
SLIDES[19].photo='photos/CAN1338_N2_letter.jpg';
SLIDES[19].caption='Tata Medical Center · uploaded architectural rendering';
SLIDES[19].sources=[...SLIDES[19].sources,'P2'];
SOURCES.P2={title:'Uploaded Tata architectural rendering',file:'CAN1338_N2_letter.jpg',detail:'Image supplied for the upper figure on slide 20. Displayed uncropped as an architectural rendering. The source environmental section below is retained.'};
PHOTOS.push({path:'photos/CAN1338_N2_letter.jpg',title:'Tata Medical Center · uploaded architectural rendering',source:'CAN1338_N2_letter.jpg'});

// These keys explain the source colors. They do not rezone the drawings.
const SPECIAL_PLAN_KEYS={
 'tata-basement':{title:'Evacuation drawing · color key',note:'Red is the source room fill, not departmental zoning.',items:[['#8e3c45','Room fill in source'],['#cbe4e3','Circulation / waiting'],['#162f2c','Walls and room outlines','line']]},
 'tata-site':{title:'Site drawing · color key',items:[['#ffffff','Building roofs'],['#9b9c9b','Roads / parking'],['#c3bda2','Paved courts / paths'],['#869042','Planted landscape']]},
 'mvr-site':{title:'Source site · color key',items:[['#939591','Block B / canteen + MEP'],['#c0c1bb','Block A / service building'],['#bdcbd5','Road network'],['#aec2a0','Planted landscape'],['#568d85','Pond'],['#b62e24','Emergency approach','dash'],['#285b57','Service approaches','dash'],['#ffffff','Main / OPD approach','dash']]}
};
const OT_KEY={title:'OT circulation · source line key',note:'The colored dashed lines are retained from the team’s original detail.',items:[['#22c3d7','Sterile route','dash'],['#a5b500','Clean route','dash'],['#ac4c06','Dirty route','dash'],['#d8f3f5','Airlock / transfer threshold']]};
const DETAIL_KEYS={
 'radiotherapy':{title:'Source sketch · mark key',note:'Handwritten dimensions are source notes, not verified measurements.',items:[['#20221e','Room / maze outline','line'],['#9b2926','Dimension notes','line'],['#2b5977','Door / dimension marks','line'],['#398261','Maze sketch / notes','line'],['#906986','Dimension notes','line']]},
 'emergency':{title:'Department detail · source highlights',items:[['#ef974f','Observation / day care','dash'],['#eb8a91','Resuscitation / procedure','dash'],['#ed5256','Nearest lift highlight','dash'],['#1d2522','Plan linework','line']]}
};
function planKeyData(id){
 if(SPECIAL_PLAN_KEYS[id])return SPECIAL_PLAN_KEYS[id];
 const p=PLANS[id];if(!p)return null;
 const items=p.areas.map(a=>[a.color,a.name,'fill',a.n]);
 if(id.startsWith('mvr')&&!items.some(a=>a[0]==='#93ac8a'))items.push(['#93ac8a','Lift / stair cores']);
 return {title:'Source zoning · color key',note:'Colors belong to this floor; repeated colors can identify different departments.',items};
}
function keySwatch(color,kind='fill'){return `<i class="key-swatch ${kind}" style="--swatch:${color}" aria-hidden="true">${kind==='dash'||kind==='line'?'<span></span>':''}</i>`}
function colorKey(id,options={}){
 const data=typeof id==='string'?planKeyData(id):id;if(!data)return '';
 const planId=typeof id==='string'?id:null;
 return `<section class="color-key ${options.compact?'compact-key':''} ${options.large?'large-key':''}" ${planId?`data-legend-plan="${planId}"`:''} aria-label="${esc(data.title)}"><div class="key-heading"><b>${esc(data.title)}</b>${options.compact?'':`<span>${esc(data.note||'Read the swatch with the department or feature name.')}</span>`}</div><div class="key-items">${data.items.map(([color,label,kind,n],i)=>`${planId&&n?`<button data-area="${n}" data-id="${planId}" title="Inspect ${esc(label)}">`:'<span class="key-item">'}${keySwatch(color,kind)}<span>${esc(label)}</span>${planId&&n?'</button>':'</span>'}`).join('')}</div></section>`;
}
function keyForSlide(s){
 if(s.ot)return colorKey(OT_KEY,{large:true});
 if(s.id&&PLANS[s.id])return colorKey(s.id);
 if(s.plan&&PLANS[s.plan])return colorKey(s.plan);
 if(s.key==='mvr-circ-02')return colorKey('mvr-first');
 return '';
}

// Every full source-plan inspector also receives its own source color key.
const atelierBasePlan=plan;
plan=function(id,title=''){return atelierBasePlan(id,title).replace('<div class="plan-guidance">',colorKey(id,{compact:true})+'<div class="plan-guidance">')};

const atelierBaseRender=render;
render=function(){
 atelierBaseRender();document.body.classList.add('atelier');
 const s=SLIDES[current],stage=$('#stage'),slide=stage.querySelector('.slide');
 if(s.type==='annotated')slide.querySelector('.plate-foot').insertAdjacentHTML('beforebegin',colorKey(s.id));
 if(s.type==='roles'){
  slide.querySelector('.route-exhibit').insertAdjacentHTML('beforeend',colorKey(s.id));
  if(s.id==='mvr-site')slide.querySelector('.color-key .key-heading>span').textContent='Base drawing colors; the controls above identify the animated analysis routes.';
 }
 if(s.type==='team'&&!s.bubble)slide.querySelector('.team-exhibit').insertAdjacentHTML('beforeend',keyForSlide(s));
 if(s.type==='massing'){
  const id=s.hospital==='tata'?'tata-ground':'mvr-site';
  slide.querySelector('.figure-key').outerHTML=colorKey(id,{compact:true});
 }
 if(s.type==='stack'){
  slide.querySelectorAll('.program-floor').forEach(row=>{
   const id=row.dataset.openPlan,data=planKeyData(id);
   row.querySelector('.floor-program').innerHTML=`<span class="stack-color-label">${id==='tata-basement'?'Source drawing colors':'Source zoning key'}</span><span class="stack-color-items">${data.items.map(([c,l,k])=>`<span>${keySwatch(c,k)}${esc(l)}</span>`).join('')}</span>`;
  });
  slide.querySelector('.stack-method').textContent='Original floor plates and their source color keys · select a floor to inspect its named departments';
 }
 if(s.type==='network'){
  slide.querySelectorAll('.clinical-crop').forEach((crop,i)=>{const a=PLANS['tata-second'].areas[i];crop.querySelector('p').innerHTML=`${keySwatch(a.color)}<span>${esc(a.name)} · source legend ${a.n}</span>`});
 }
 if(s.type==='clinicaldetail'){
  const key=s.photo.includes('linac')?DETAIL_KEYS.radiotherapy:DETAIL_KEYS.emergency;
  slide.querySelector('.detail-source').insertAdjacentHTML('beforeend',colorKey(key,{compact:true}));
 }
 if(s.type==='synthesis'){
  slide.querySelectorAll('.synthesis-grid article').forEach(a=>{const im=a.querySelector('[data-open-plan]');im.insertAdjacentHTML('afterend',colorKey(im.dataset.openPlan,{compact:true}))});
 }
 if(current===19){
  const env=slide.querySelector('.environment'),im=env.querySelector('.photo');
  im.alt='Tata Medical Center · uploaded architectural rendering';
  im.dataset.photo=s.photo;
  const frame=document.createElement('div');frame.className='uploaded-rendering';im.before(frame);frame.append(im);
  frame.insertAdjacentHTML('beforeend','<span>Uploaded architectural rendering</span>');
 }
 if(s.ot){
  slide.querySelector('.team-figure').classList.add('ot-figure');
  slide.querySelectorAll('.point b').forEach((b,i)=>{if(i<3)b.insertAdjacentHTML('afterbegin',keySwatch(OT_KEY.items[i][0],'dash'))});
 }
 // A focus light moves only across the background; it never changes plan geometry.
 if(s.type!=='cover')slide.insertAdjacentHTML('afterbegin','<div class="ambient-light" aria-hidden="true"></div>');
 slide.querySelectorAll('.key-items>*').forEach((e,i)=>e.style.setProperty('--key-index',i));
 slide.querySelectorAll('.analysis-note').forEach((n,i)=>{n.style.setProperty('--note-delay',i*.12+'s')});
 if(current===48)slide.insertAdjacentHTML('beforeend','<div class="closing-signature">Observe carefully.<br><em>Design deliberately.</em></div>');
 stage.dataset.figureMode=s.type==='annotated'?'plan':s.route?'circulation':'story';
 fit();
};

const atelierBaseInspect=inspectFigure;
inspectFigure=function(){atelierBaseInspect();const s=SLIDES[current],container=$('.figure-inspector');if(container)container.insertAdjacentHTML('beforeend',keyForSlide(s))};
const atelierBaseSource=showSource;
showSource=function(path){atelierBaseSource(path);const ids=Object.keys(PLANS).filter(id=>PLANS[id].sheet===path);if(ids.length){$('.sheet-view img').insertAdjacentHTML('beforebegin',ids.map(id=>colorKey(id)).join(''))}else{const s=SLIDES.find(s=>s.key&&TEAM_ASSETS[s.key]?.path===path);if(s)$('.sheet-view img').insertAdjacentHTML('beforebegin',keyForSlide(s))}};

// Keyboard focus mode gives the drawing the whole presentation surface.
const atelierBaseAction=action;
action=function(a){if(a==='focus'){document.body.classList.toggle('focus-mode');$('#focus-button').classList.toggle('selected',document.body.classList.contains('focus-mode'));$('#focus-button').textContent=document.body.classList.contains('focus-mode')?'Exit focus':'Focus';fit();return}atelierBaseAction(a)};
$('#controls').insertAdjacentHTML('beforeend','<button data-action="focus" id="focus-button" title="Focus presentation (D)">Focus</button>');
document.addEventListener('keydown',e=>{if(!$('#modal').open&&e.key.toLowerCase()==='d')action('focus')});
document.addEventListener('pointermove',e=>{
 const r=$('#stage').getBoundingClientRect();
 $('#stage').style.setProperty('--ambient-x',Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100))+'%');
 $('#stage').style.setProperty('--ambient-y',Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100))+'%');
 document.body.classList.toggle('chrome-hover',e.clientY<58||e.clientY>innerHeight-78);
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('focus-mode')&&!$('#modal').open)action('focus')});

// The older type system is restored: P052 for display, Nimbus Sans for reading.
render();
