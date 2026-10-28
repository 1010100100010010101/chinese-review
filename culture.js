'use strict';
let cultureMode='learn',cultureGroup='all',cultureRound=[],culturePos=0,cultureResult=null,cultureRevealed=false,cultureDraft='',cultureMatch=[],cultureOptions=[],culturePicks={},cultureMatchChecked=false,cultureWrong=new Set();
try{const ids=JSON.parse(localStorage.getItem('zizi-culture-wrong-v1'));if(Array.isArray(ids))cultureWrong=new Set(ids.filter(id=>cultureData.some(q=>q.id===id)))}catch{}
function cultureSave(){try{localStorage.setItem('zizi-culture-wrong-v1',JSON.stringify([...cultureWrong]))}catch{}}
function culturePool(){return cultureData.filter(q=>cultureGroup==='all'||q.cat===cultureGroup)}
function cultureShuffle(a){return [...a].sort(()=>0.5-Math.random())}
function cultureStart(wrongOnly=false){cultureRound=cultureShuffle(culturePool().filter(q=>!wrongOnly||cultureWrong.has(q.id)));culturePos=0;cultureReset();}
function cultureReset(){cultureResult=null;cultureRevealed=false;cultureDraft=''}
function cultureQuestion(){return cultureRound[culturePos]}
function cultureNormal(t){return t.normalize('NFKC').replace(/[\s，。、「」『』《》；：,.!?！？]/g,'')}
function cultureAccept(q,value){return q.terms.some(t=>cultureNormal(t)===cultureNormal(value))}
function cultureFeedback(q){return '<div class="culture-feedback"><strong>'+esc(q.terms.join('／'))+'</strong><p>'+esc(q.meaning)+'</p><p>記憶提示：'+esc(q.hint)+'</p><small>講義書頁 '+q.page+'</small></div>'}
function cultureMatchStart(){cultureMatch=cultureShuffle(culturePool()).slice(0,4);cultureOptions=cultureShuffle(cultureMatch);culturePicks={};cultureMatchChecked=false;}
function renderCulture(){
 if(!cultureRound.length&&cultureMode==='fill'&&culturePos===0)cultureStart();
 let h='<section class="culture"><div class="section-head"><div><h2>其他稱謂・年齡稱謂</h2><p>依新講義 P.227–229：32 組其他稱謂＋19 組年齡稱謂。</p></div></div><p class="muted">年齡以這份講義為準；孩提、齠齔等未指定確切歲數，不強加歲數。每題填一個合適稱謂即可。</p><div class="culture-toolbar">'+[['learn','① 圖解教學'],['fill','② 填空練習'],['match','四組配對'],['notes','重點詞卡'],['source','講義對照']].map(([v,t])=>'<button data-culture-mode="'+v+'" aria-pressed="'+(cultureMode===v)+'">'+t+'</button>').join('')+'</div><div class="culture-toolbar"><label>練習範圍 <select id="cultureGroup">'+[['all','全部稱謂'],['other','其他稱謂'],['age','年齡稱謂']].map(([v,t])=>'<option value="'+v+'" '+(cultureGroup===v?'selected':'')+'>'+t+'</option>').join('')+'</select></label><button data-culture-action="restart">重新抽題</button><button data-culture-action="wrong">錯題重練（'+cultureWrong.size+'）</button></div>';
 if(cultureMode==='learn')return '<section class="culture"><div class="section-head"><div><h2>稱謂圖解教室</h2><p class="muted">先看意象、理解字義，再用本節填空檢查記憶。</p></div><button data-culture-mode="fill">直接練習 →</button></div>'+renderCultureLesson()+'</section>';
 if(cultureMode==='source')return h+'<p>收錄本次指定的兩節；同頁「作品命名、國家官制」不列入這輪練習。</p>'+[227,228,229].map(n=>'<details><summary>查看講義第 '+n+' 頁</summary><a href="assets/handouts/culture-new-'+n+'.png" target="_blank" rel="noopener">開啟大圖 ↗</a><img loading="lazy" src="assets/handouts/culture-new-'+n+'.png" alt="使用者提供的講義第 '+n+' 頁"></details>').join('')+'</section>';
 if(cultureMode==='notes')return h+'<p>容易混淆：及笄＝女子十五歲；束髮＝男子十五歲。耆＝六十、艾＝五十；耄＝八九十、耋＝七八十。</p><div class="culture-notes">'+culturePool().map(q=>'<details><summary>'+esc(q.terms.join('／'))+'</summary>'+cultureFeedback(q)+'</details>').join('')+'</div></section>';
 if(cultureMode==='match'){
 if(!cultureMatch.length)cultureMatchStart();
 return h+'<article class="note-block"><h3>把四個稱謂與解釋配對</h3><p>每個答案使用一次，配對後核對。</p>'+cultureMatch.map(q=>'<div class="culture-match-row"><label for="cm-'+q.id+'">'+esc(q.terms[0])+'</label><select id="cm-'+q.id+'" data-culture-pick="'+q.id+'" '+(cultureMatchChecked?'disabled':'')+'><option value="">選擇對應解釋</option>'+cultureOptions.map(a=>'<option value="'+a.id+'" '+(culturePicks[q.id]===a.id?'selected':'')+'>'+esc(a.meaning)+'</option>').join('')+'</select>'+(cultureMatchChecked?'<p>'+(culturePicks[q.id]===q.id?'✓ 配對正確':'再記一次：配對有誤')+'</p>'+cultureFeedback(q):'')+'</div>').join('')+'<p id="cultureNotice" role="status"></p><button class="primary" data-culture-action="match-check" '+(cultureMatchChecked?'disabled':'')+'>核對配對</button> <button data-culture-action="match-next">換四組</button></article></section>';
 }
 const q=cultureQuestion();
 if(!q)return h+'<article class="note-block"><h3>這輪練習已完成</h3><p>可重練錯題，或重新抽題再試。</p></article></section>';
 return h+'<article class="note-block"><p class="eyebrow">'+(q.cat==='age'?'年齡稱謂':'其他稱謂')+' · '+(culturePos+1)+' / '+cultureRound.length+'</p><h3>'+esc(q.meaning)+'，可稱作甚麼？</h3><label for="cultureAnswer">填入稱謂（同義稱謂擇一）</label><input id="cultureAnswer" autocomplete="off" value="'+esc(cultureDraft)+'" '+(cultureResult?'disabled':'')+' placeholder="先回想，再輸入"><div class="culture-toolbar"><button class="primary" data-culture-action="check" '+(cultureResult?'disabled':'')+'>核對答案</button><button data-culture-action="reveal">查看答案</button><button data-culture-action="next">下一題 →</button></div><p id="cultureNotice" role="status">'+(cultureResult?(cultureResult.correct?'✓ 答對了'+(cultureRevealed?'；看過答案的題目會留在錯題，待獨立答對再移除。':'。'):'再記一次：答案未符合本題稱謂。'):'')+'</p>'+((cultureRevealed||cultureResult)?cultureFeedback(q):'')+'</article></section>';
}
function culturePaint(){renderExam2();if(typeof syncVoiceUI==='function')syncVoiceUI()}
function initCulture(){const w=$('#workspace');w.addEventListener('input',e=>{if(e.target.id==='cultureAnswer')cultureDraft=e.target.value});w.addEventListener('keydown',e=>{if(e.target.id==='cultureAnswer'&&e.key==='Enter'){e.preventDefault();w.querySelector('[data-culture-action="check"]').click()}});w.addEventListener('change',e=>{if(e.target.id==='cultureGroup'){cultureGroup=e.target.value;cultureStart();cultureMatchStart();culturePaint()}if(e.target.dataset.culturePick)culturePicks[e.target.dataset.culturePick]=e.target.value});w.addEventListener('click',e=>{
 const b=e.target.closest('[data-culture-mode],[data-culture-action]');if(!b)return;
 if(b.dataset.cultureMode){cultureMode=b.dataset.cultureMode;culturePaint();return}
 const a=b.dataset.cultureAction,q=cultureQuestion();
 if(a==='restart'){cultureStart();cultureMatchStart()}
 if(a==='wrong'){cultureMode='fill';cultureStart(true);if(!cultureRound.length)culturePos=1;}
 if(a==='check'&&q&&!cultureResult){if(!cultureNormal(cultureDraft)){$('#cultureNotice').textContent='請先輸入答案。';return}const correct=cultureAccept(q,cultureDraft);cultureResult={correct};if(correct&&!cultureRevealed)cultureWrong.delete(q.id);else cultureWrong.add(q.id);cultureSave()}
 if(a==='reveal'&&q){cultureRevealed=true;cultureWrong.add(q.id);cultureSave()}
 if(a==='next'&&q){if(!cultureResult){cultureWrong.add(q.id);cultureSave()}culturePos++;cultureReset()}
 if(a==='match-next')cultureMatchStart();
 if(a==='match-check'&&!cultureMatchChecked){if(cultureMatch.some(x=>!culturePicks[x.id])){$('#cultureNotice').textContent='請完成全部四組配對。';return}cultureMatchChecked=true;cultureMatch.forEach(q=>{if(culturePicks[q.id]!==q.id)cultureWrong.add(q.id)});cultureSave()}
 culturePaint();
 })}
function cultureVoiceContext(){if(cultureMode==='learn')return cultureLessonVoice();if(cultureMode==='fill'){const q=cultureQuestion();return q?{signature:q.id+'-'+!!cultureResult+'-'+cultureRevealed,label:'朗讀題目',text:q.meaning+'，可稱作甚麼？',explain:(cultureRevealed||cultureResult)?q.terms.join('、')+'。'+q.meaning+'。'+q.hint:''}:{signature:'culture-done'}}if(cultureMode==='notes')return{signature:'culture-notes-'+cultureGroup,label:'朗讀稱謂重點',text:culturePool().map(q=>q.terms.join('、')+'。'+q.meaning+'。'+q.hint).join('。')};return{signature:'culture-'+cultureMode}}
