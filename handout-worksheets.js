'use strict';
const handoutStorageKey='zizi-full-handouts-v1';
let handoutState={};
try{const v=JSON.parse(localStorage.getItem(handoutStorageKey));if(v&&typeof v==='object'&&!Array.isArray(v))handoutState=v;}catch{}
let handoutResetPending='',handoutSaveFailed=false;
function handoutSheet(id){return handoutSheets.find(s=>s.id===id);}
function handoutFreshState(){return {drafts:{},checks:{},revealed:{},mode:'fill',wrongOnly:false};}
function handoutGetState(id){
 const s=handoutState[id];if(!s||typeof s!=='object'||Array.isArray(s))return handoutState[id]=handoutFreshState();
 for(const k of ['drafts','checks','revealed'])if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k]))s[k]={};
 if(!['fill','learn'].includes(s.mode))s.mode='fill';return s;
}
function handoutSave(){try{localStorage.setItem(handoutStorageKey,JSON.stringify(handoutState));handoutSaveFailed=false;}catch{handoutSaveFailed=true;}}
function handoutNormalize(value){return String(value||'').normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'').toLowerCase();}
function handoutAccepted(blank,value){
 const n=handoutNormalize(value);if(!n)return false;
 return blank.answers.some(a=>handoutNormalize(a)===n || (/^(太祖|仁宗|神宗|徽宗|欽宗|寧宗|理宗|帝昺)$/.test(a)&&handoutNormalize('宋'+a)===n));
}
function handoutStats(sheet){const st=handoutGetState(sheet.id),checked=sheet.blanks.filter(b=>st.checks[b.id]),correct=checked.filter(b=>st.checks[b.id].ok);return {checked:checked.length,correct:correct.length,wrong:checked.length-correct.length,total:sheet.blanks.length};}
function handoutFeedback(blank,st){
 const c=st.checks[blank.id],shown=st.revealed[blank.id];if(st.feedbackHidden||(!c&&!shown))return '';
 if(c?.ok)return '<span class="hws-feedback good">✓ 正確'+(shown?'（已看答案）':'')+'</span>';
 return '<span class="hws-feedback '+(c?'bad':'')+'">'+(c?(c.empty?'未填':'待訂正')+'；':'答案：')+'<strong>'+esc(blank.answer)+'</strong></span>';
}
function handoutCell(cell,sheet,st){return cell.parts.map(part=>{
 if(typeof part==='string')return esc(part);
 if(st.mode==='learn')return '<mark class="hws-key">'+esc(part.answer)+'</mark>';
 const checked=st.checks[part.id],cl=checked?(checked.ok?'hws-correct':'hws-incorrect'):'';
 const size=Math.max(4,Math.min(14,Array.from(part.answer).length+1));
 return '<span class="hws-slot '+cl+'" id="slot-'+part.id+'"><label class="sr-only" for="input-'+part.id+'">'+esc(part.label)+'</label><span class="hws-input-wrap"><input id="input-'+part.id+'" data-hws-input="'+part.id+'" data-hws-sheet="'+sheet.id+'" value="'+esc(st.drafts[part.id]||'')+'" maxlength="80" autocomplete="off" spellcheck="false" style="--slot-width:'+size+'em" placeholder="填寫" aria-describedby="feedback-'+part.id+'"><button type="button" data-hws-action="check-blank" data-hws-sheet="'+sheet.id+'" data-hws-blank="'+part.id+'" title="核對這一空" aria-label="核對：'+esc(part.label)+'">✓</button></span><span id="feedback-'+part.id+'" aria-live="polite">'+handoutFeedback(part,st)+'</span></span>';
 }).join('');}
function handoutRowWrong(row,st){return row.cells.some(c=>c.parts.some(p=>typeof p!=='string'&&st.checks[p.id]&&!st.checks[p.id].ok));}
function handoutSectionHTML(section,sheet,st){
 const rows=st.wrongOnly&&st.mode==='fill'?section.rows.filter(r=>handoutRowWrong(r,st)):section.rows;
 if(!rows.length)return '';
 return '<section class="hws-section" id="'+section.id+'"><div class="hws-section-head"><h3>'+esc(section.title)+'</h3><div class="hws-section-buttons"><button data-hws-action="speak-section" data-hws-sheet="'+sheet.id+'" data-hws-section="'+section.id+'">▶ 朗讀本節</button>'+(st.mode==='fill'?'<button data-hws-action="check-section" data-hws-sheet="'+sheet.id+'" data-hws-section="'+section.id+'">核對本節</button>':'')+'</div></div>'+(section.lead?'<p class="hws-lead">'+esc(section.lead)+'</p>':'')+'<div class="hws-table-scroll" role="region" aria-label="'+esc(section.title)+'" tabindex="0"><table class="hws-table"><thead><tr>'+section.heads.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr id="'+row.id+'">'+row.cells.map((cell,i)=>'<'+(i===0?'th scope="row"':'td')+'>'+handoutCell(cell,sheet,st)+'</'+(i===0?'th':'td')+'>').join('')+'</tr>').join('')+'</tbody></table></div>'+(section.note?'<p class="hws-note"><b>注意</b> '+esc(section.note)+'</p>':'')+(section.supplement?'<aside class="hws-supplement">'+esc(section.supplement)+'</aside>':'')+'</section>';
}
function renderHandoutWorksheet(id){
 const pdfName=id==='ci'?'tang-song-ci-worksheet.pdf':'authors-worksheet.pdf';
 const answerName=id==='ci'?'tang-song-ci-answers.pdf':'authors-answers.pdf';
 const sheet=handoutSheet(id),st=handoutGetState(id),stats=handoutStats(sheet),visible=sheet.sections.filter(s=>!st.wrongOnly||st.mode==='learn'||s.rows.some(r=>handoutRowWrong(r,st)));
 return '<div class="download-hub"><a href="assets/downloads/'+pdfName+'" download>下載整份填空 PDF ↓</a><a href="assets/downloads/'+answerName+'" download>下載講義答案 PDF ↓</a></div><article class="hws-document" data-hws-document="'+id+'"><header class="hws-header"><span class="eyebrow">WHOLE HANDOUT · 理解 → 填空 → 訂正</span><h2>'+esc(sheet.title)+'</h2><p>'+esc(sheet.intro)+'</p><p class="hws-source">'+esc(sheet.source)+'</p></header><div class="hws-toolbar"><div class="hws-mode"><button data-hws-action="fill" data-hws-sheet="'+id+'" aria-pressed="'+(st.mode==='fill')+'" class="'+(st.mode==='fill'?'selected':'')+'">整份填空</button><button data-hws-action="learn" data-hws-sheet="'+id+'" aria-pressed="'+(st.mode==='learn')+'" class="'+(st.mode==='learn'?'selected':'')+'">教學模式</button></div><div class="hws-controls">'+(st.mode==='fill'?'<button class="primary" data-hws-action="check-all" data-hws-sheet="'+id+'">核對整份</button><button data-hws-action="reveal-all" data-hws-sheet="'+id+'">顯示答案</button><button data-hws-action="hide-answers" data-hws-sheet="'+id+'">收起答案</button><label class="hws-wrong-toggle"><input type="checkbox" data-hws-wrong="'+id+'" '+(st.wrongOnly?'checked':'')+'> 只看錯空所在列</label>':'<p>綠色標記就是填空重點；先順著段落讀懂，再切換「整份填空」。</p>')+'<button data-hws-action="reset-request" data-hws-sheet="'+id+'">清空本份草稿</button></div></div><p class="hws-status" data-hws-status="'+id+'" role="status">已核對 '+stats.checked+' / '+stats.total+' 空 · 正確 '+stats.correct+' · 待訂正 '+stats.wrong+'。'+(handoutSaveFailed?'目前無法儲存，請複製備份。':'草稿自動保存在這個瀏覽器。')+'</p>'+(handoutResetPending===id?'<div class="hws-confirm" role="alert"><b>清空這份講義的所有填寫與核對紀錄？</b><p>只影響這份新版講義，其他練習和第一次測驗紀錄不受影響。</p><button data-hws-action="reset-confirm" data-hws-sheet="'+id+'">確認清空</button><button data-hws-action="reset-cancel" data-hws-sheet="'+id+'">保留草稿</button></div>':'')+'<nav class="hws-contents" aria-label="講義段落">'+visible.map(s=>'<a href="#'+s.id+'" data-hws-jump="'+s.id+'">'+esc(s.title)+'</a>').join('')+'</nav>'+(visible.length?sheet.sections.map(s=>handoutSectionHTML(s,sheet,st)).join(''):'<p class="hws-empty">目前沒有已批改的錯空。取消「只看錯空所在列」，可繼續填整份講義。</p>')+'<footer class="hws-footer"><p>核對時忽略標點、空格和書名號；沒有把握的空格先留白，整份核對後會標出需要訂正的位置。</p><p>這裡不把「看過答案」當作已掌握；訂正後可清空重做，檢查能否獨立填回。</p></footer></article>';
}
function renderCiWorksheet(){return renderHandoutWorksheet('ci');}
function renderAuthorWorksheet(){return renderHandoutWorksheet('authors');}
function handoutCheck(id,blankIds){
 const sheet=handoutSheet(id),st=handoutGetState(id),ids=new Set(blankIds);st.feedbackHidden=false;
 sheet.blanks.filter(b=>ids.has(b.id)).forEach(b=>{const val=st.drafts[b.id]||'';st.checks[b.id]={ok:handoutAccepted(b,val),empty:!handoutNormalize(val)};});handoutSave();
}
function handoutRefreshStatus(id){const el=document.querySelector('[data-hws-status="'+id+'"]');if(!el)return;const n=handoutStats(handoutSheet(id));el.textContent='已核對 '+n.checked+' / '+n.total+' 空 · 正確 '+n.correct+' · 待訂正 '+n.wrong+'。'+(handoutSaveFailed?'目前無法儲存，請複製備份。':'草稿自動保存在這個瀏覽器。');}
function handoutRerender(){if(typeof renderExam2==='function')renderExam2();}
function initHandoutWorksheets(){
 const w=document.getElementById('workspace');if(!w||w.dataset.handoutInit)return;w.dataset.handoutInit='1';
 w.addEventListener('input',e=>{const id=e.target.dataset.hwsInput,sid=e.target.dataset.hwsSheet;if(!id||!sid)return;const sheet=handoutSheet(sid);if(!sheet?.blanks.some(b=>b.id===id))return;const st=handoutGetState(sid);st.drafts[id]=e.target.value;delete st.checks[id];const slot=document.getElementById('slot-'+id);slot?.classList.remove('hws-correct','hws-incorrect');const feedback=document.getElementById('feedback-'+id);if(feedback)feedback.innerHTML=handoutFeedback(sheet.blanks.find(b=>b.id===id),st);handoutSave();handoutRefreshStatus(sid);});
 w.addEventListener('change',e=>{const id=e.target.dataset.hwsWrong;if(!id)return;handoutGetState(id).wrongOnly=e.target.checked;handoutSave();handoutRerender();});
 w.addEventListener('click',e=>{
  const jump=e.target.closest('[data-hws-jump]');if(jump){e.preventDefault();document.getElementById(jump.dataset.hwsJump)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  const b=e.target.closest('button[data-hws-action]');if(!b||b.disabled)return;const d=b.dataset,id=d.hwsSheet,sheet=handoutSheet(id);if(!sheet)return;const st=handoutGetState(id);
  switch(d.hwsAction){
   case 'fill':case 'learn':st.mode=d.hwsAction;handoutResetPending='';break;
   case 'check-blank':handoutCheck(id,[d.hwsBlank]);break;
   case 'check-section':handoutCheck(id,sheet.blanks.filter(x=>x.sectionId===d.hwsSection).map(x=>x.id));break;
   case 'check-all':handoutCheck(id,sheet.blanks.map(x=>x.id));break;
   case 'reveal-all':st.feedbackHidden=false;sheet.blanks.forEach(x=>st.revealed[x.id]=true);break;
   case 'hide-answers':st.revealed={};st.feedbackHidden=true;break;
   case 'speak-section':st.voiceSection=d.hwsSection;handoutSave();if(typeof speakVoice==='function'){const v=worksheetVoiceContext(id,d.hwsSection);speakVoice(v.text,v.label);}return;
   case 'reset-request':handoutResetPending=id;break;
   case 'reset-cancel':handoutResetPending='';break;
   case 'reset-confirm':if(handoutResetPending!==id)return;handoutState[id]=handoutFreshState();handoutResetPending='';break;
   default:return;
  }
  handoutSave();const scrollTop=window.scrollY;handoutRerender();if(d.hwsAction==='check-blank'){document.getElementById('input-'+d.hwsBlank)?.focus({preventScroll:true});}window.scrollTo({top:scrollTop,behavior:'instant'});
 });
 w.addEventListener('keydown',e=>{if(e.key!=='Enter'||!e.target.dataset.hwsInput)return;e.preventDefault();const id=e.target.dataset.hwsSheet,blank=e.target.dataset.hwsInput;handoutCheck(id,[blank]);handoutRerender();document.getElementById('input-'+blank)?.focus({preventScroll:true});});
}

function worksheetVoiceContext(id,sectionId){
 const sheet=handoutSheet(id);if(!sheet)return {signature:'handout-empty'};
 const st=handoutGetState(id),selected=sectionId||st.voiceSection;
 const sections=selected?sheet.sections.filter(s=>s.id===selected):sheet.sections;
 const body=sections.map(s=>s.title+'。'+s.lead+'。'+s.rows.filter(r=>!st.wrongOnly||st.mode==='learn'||handoutRowWrong(r,st)).map(r=>r.cells.map(c=>c.parts.map(p=>typeof p==='string'?p:(st.mode==='learn'?p.answer:'，空格，')).join('')).join('。')).join('。')).join('。');
 return {signature:'handout-'+id+'-'+st.mode+'-'+(selected||'all')+'-'+!!st.wrongOnly,label:selected?'朗讀本節講義':'朗讀整份講義',text:body,explain:st.mode==='learn'?sections.map(s=>s.note+'。'+s.supplement).join('。'):'',hint:st.mode==='fill'?'填空位置讀作「空格」，不朗讀標準答案。每節也有獨立播放按鈕。':'教學模式會朗讀完整重點；可按每節的播放按鈕分段聽讀。'};
}
