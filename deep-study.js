'use strict';
const memorySceneMap={
 guiqu:[{title:'放下富貴與仙境',start:0,end:0},{title:'獨行田間，除草培土',start:1,end:1},{title:'高岡長嘯，臨溪賦詩',start:2,end:2},{title:'順應四時，安頓生命',start:3,end:3}],
 jiangjin:[{title:'黃河與明鏡：感嘆光陰',start:0,end:1},{title:'月下舉杯：自信與行樂',start:2,end:3},{title:'朋友勸酒：不平與寄託',start:4,end:9},{title:'名馬換酒：愁的回聲',start:10,end:11}],
 bingche:[{title:'車馬送別：聲音與動作',start:0,end:2},{title:'白髮征人：點行頻繁',start:3,end:6},{title:'荒田與催租：生活被摧毀',start:7,end:11},{title:'生男之苦與青海哀聲',start:12,end:13}]
};
function memoryArtwork(e){
 const scenes=memorySceneMap[e.id],active=scenes.findIndex(s=>examSegment>=s.start&&examSegment<=s.end);
 return '<section class="memory-art" aria-label="'+esc(e.title)+'記憶圖"><div class="section-head"><div><span class="eyebrow">看圖 → 想意義 → 背原句</span><h3>四幅畫，串起整段記憶</h3></div><a href="assets/memory/'+e.id+'-memory.png" target="_blank" rel="noopener">放大圖片 ↗</a></div><figure><img src="assets/memory/'+e.id+'-memory.png" alt="'+esc(scenes.map((s,i)=>(i+1)+' '+s.title).join('；'))+'" loading="lazy"><figcaption>按左上、右上、左下、右下閱讀。插畫是記憶聯想；精確字句以課本原文為準。</figcaption></figure><div class="memory-scene-tabs">'+scenes.map((s,i)=>'<button data-memory-scene="'+s.start+'" aria-pressed="'+(active===i)+'" class="'+(active===i?'selected':'')+'"><span>0'+(i+1)+'</span><strong>'+esc(s.title)+'</strong><small>第 '+(s.start+1)+(s.end>s.start?'–'+(s.end+1):'')+' 組</small></button>').join('')+'</div><p class="memory-art-task">先用自己的話說出第 '+(active+1)+' 幅的意思，再往下試背；可選「只留首字」或「完全遮字」檢查記憶。</p></section>';
}
function deepText(value){return Array.isArray(value)?value.join(' → '):String(value||'')}
function renderDeepAnalysis(e){
 const d=typeof lessonDeepData!=='undefined'?lessonDeepData[e.id]:null;
 if(!d)return annotationReader(e)+'<article class="thesis"><h3>全文主旨</h3><p>'+esc(e.thesis)+'</p></article>';
 const notes=essayAnnotations[e.id]||[];
 return '<nav class="deep-jumps" aria-label="課文解析目錄"><a href="#deep-thesis">主旨與背景</a><a href="#deep-close">逐段細讀</a><a href="#deep-reader">原文點讀</a><a href="#deep-language">文言重點</a><a href="#deep-exam">引文作答</a></nav>'+
 '<article class="thesis" id="deep-thesis"><span class="tag">全文主旨</span><h3>《'+esc(e.title)+'》要表達甚麼？</h3><p>'+esc(e.thesis)+'</p></article><div class="deep-intro">'+[['作者與人格',d.authorNote],['文體與題解',d.genre],['寫作背景',d.background]].map(([t,v])=>'<article class="note-block"><h3>'+t+'</h3><p>'+esc(deepText(v))+'</p></article>').join('')+'</div>'+
 '<article class="deep-route"><span class="eyebrow">把篇章連起來</span><h3>結構與情感脈絡</h3><p>'+esc(deepText(d.emotionalRoute))+'</p></article>'+
 '<section id="deep-close"><div class="section-head"><div><h3>逐段細讀與答題重點</h3><p class="muted">由句意到寫法，再解釋它如何支持主旨。</p></div><button data-deep-expand="all">展開全部細讀</button></div><div class="deep-readings">'+(d.closeReading||[]).map((r,i)=>'<details class="deep-reading" '+(i===0?'open':'')+'><summary><span>'+String(i+1).padStart(2,'0')+'</span><strong>'+esc(r.title)+'</strong></summary><div><blockquote class="classical">'+esc(r.quote)+'</blockquote><dl><dt>句意</dt><dd>'+esc(r.translation)+'</dd><dt>怎樣理解</dt><dd>'+esc(r.analysis)+'</dd><dt>應試提醒</dt><dd>'+esc(r.examTip)+'</dd></dl><button data-deep-quote="'+esc(r.quote)+'">在原文查看這段 →</button></div></details>').join('')+'</div></section>'+
 '<section id="deep-reader">'+annotationReader(e)+'</section>'+
 '<section id="deep-language"><div class="section-head"><div><h3>文言重點整理</h3><p class="muted">點擊條目查看判斷理由、古今義對照、還原語序與作用。</p></div><button data-exam-section="grammar">先學判斷，再做專項題 →</button></div>'+['ancient','syntax','usage','rhetoric','words'].map(cat=>'<details class="deep-language-group"><summary>'+esc(annotationCategories[cat])+' · '+notes.filter(a=>a.category===cat).length+' 則</summary><div class="deep-note-list">'+notes.filter(a=>a.category===cat).map(a=>'<button data-annotation-ids="'+a.id+'"><strong>'+esc(a.quote)+'</strong><span>'+esc(a.title)+'</span></button>').join('')+'</div></details>').join('')+'</section>'+
 '<section id="deep-exam"><div class="section-head"><h3>把主旨連到背默原句</h3><button data-exam-section="training">進入整卷與問答練習 →</button></div><div class="deep-evidence">'+(d.examConnections||[]).map(r=>'<details class="note-block"><summary>'+esc(r.question)+'</summary><p class="classical">'+esc(r.quote)+'</p><p>'+esc(r.explanation)+'</p></details>').join('')+'</div></section>'+
 '<details class="lesson-details"><summary>課本與新筆記核對紀錄</summary><p>'+esc(deepText(d.sourceAudit))+'</p></details>'+classroomPhotos(e)+sourceLinks(e);
}
function initDeepStudy(){
 $('#workspace').addEventListener('click',event=>{
  const b=event.target.closest('button');if(!b||view!=='exam2')return;
  if(b.dataset.memoryScene!==undefined){examSegment=Number(b.dataset.memoryScene);examReveal=false;examExplain=false;renderExam2();document.querySelector('.recite-controls')?.scrollIntoView({block:'start',behavior:'smooth'});}
  if(b.dataset.deepExpand){const all=[...document.querySelectorAll('.deep-reading')],open=all.some(x=>!x.open);all.forEach(x=>x.open=open);b.textContent=open?'收起全部細讀':'展開全部細讀';}
  if(b.dataset.deepQuote){annotationFilter='all';document.querySelector('#annotated-paragraphs').innerHTML=annotationParagraphs(examLesson());const p=examLesson().full.findIndex(x=>x[0].includes(b.dataset.deepQuote)||b.dataset.deepQuote.includes(x[0].slice(0,8)));document.querySelectorAll('.annotation-paragraph')[Math.max(0,p)]?.scrollIntoView({block:'start',behavior:'smooth'});}
 });
}
