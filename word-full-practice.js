'use strict';
// Complete D/E/F practice. Separate records for input and multiple choice.
const wordFullKey='zizi-exam2-full-practice-v1';
const wordFullState={reading:{format:'choice',filter:'all',visible:[],focus:'',confirm:false,modes:{}},spelling:{format:'input',filter:'all',visible:[],focus:'',confirm:false,modes:{}}};
let wordFullSaveFailed=false,wordFullNotice='';
function wordFullData(type){return type==='reading'?examReadings:examSpellings;}
function wordFullEmpty(){return{draft:'',attempts:0,master:false,result:null};}
function wordFullRecords(type){const s=wordFullState[type];return s.modes[s.format];}
function wordFullLoad(){
 let saved={};try{saved=JSON.parse(localStorage.getItem(wordFullKey))||{};}catch{}
 for(const type of ['reading','spelling']){
  const s=wordFullState[type],old=saved[type]||{};
  if(['input','choice'].includes(old.format))s.format=old.format;
  for(const format of ['input','choice']){
   s.modes[format]={};
   for(const r of wordFullData(type)){
    const x=old.modes?.[format]?.[r.id],n=wordFullEmpty();
    if(x&&typeof x==='object'){
     n.draft=typeof x.draft==='string'?x.draft.slice(0,80):'';
     n.attempts=Number.isInteger(x.attempts)&&x.attempts>0?Math.min(x.attempts,100000):0;
     if(x.result&&typeof x.result==='object'&&typeof x.result.ok==='boolean'&&typeof x.result.hinted==='boolean'){
      n.result={ok:x.result.ok,hinted:x.result.hinted};n.attempts=Math.max(1,n.attempts);
      n.master=n.result.ok&&!n.result.hinted;
     }
    }
    s.modes[format][r.id]=n;
   }
  }
 }
}
function wordFullSave(){try{const save={};for(const type of ['reading','spelling'])save[type]={format:wordFullState[type].format,modes:wordFullState[type].modes};localStorage.setItem(wordFullKey,JSON.stringify(save));wordFullSaveFailed=false;}catch{wordFullSaveFailed=true;}}
function wordFullStats(type){const rows=wordFullData(type),records=wordFullRecords(type),covered=rows.filter(r=>records[r.id].attempts>0).length,correct=rows.filter(r=>records[r.id].master).length;return{total:rows.length,covered,correct,review:covered-correct,unseen:rows.length-covered,pending:rows.filter(r=>!records[r.id].result).length};}
function wordFullOptions(type,r){
 const opts=type==='reading'?toneOptions(r.answer):[...r.options];
 // Stable order keeps the saved selection in the same position after reload.
 let seed=[...r.id].reduce((n,c)=>n*31+c.charCodeAt(0),7)>>>0;
 for(let i=opts.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[opts[i],opts[j]]=[opts[j],opts[i]];}
 return opts;
}
function wordFullNormalize(text){return String(text).normalize('NFKC').toLowerCase().replace(/\s+/g,'').replace(/u:|v/g,'ü');}
function wordFullNumbered(pinyin){let tone='',base='';const marks=['āáǎà','ēéěè','īíǐì','ōóǒò','ūúǔù','ǖǘǚǜ'],vowels=['a','e','i','o','u','ü'];for(const c of pinyin.normalize('NFC')){const i=marks.findIndex(x=>x.includes(c));if(i<0)base+=c;else{base+=vowels[i];tone=String(marks[i].indexOf(c)+1);}}return base+(tone||'5');}
function wordFullCorrect(type,r,draft){
 const value=wordFullNormalize(draft);
 if(type==='spelling')return value===r.key||value===spellingSimplified[r.key];
 return value===wordFullNormalize(r.answer)||value===wordFullNumbered(r.answer)||value.replace(/ˉ/g,'')===wordFullNormalize(toZhuyin(r.answer));
}
function wordFullMark(type,r,ok){
 if(type==='spelling'){spellingMark(r,ok);return;}
 examPractice.master=examPractice.master.filter(id=>id!==r.id);examPractice.wrong=examPractice.wrong.filter(id=>id!==r.id);
 examPractice[ok?'master':'wrong'].push(r.id);saveExamPractice();
}
function wordFullCheck(type,id,reveal=false){
 const r=wordFullData(type).find(x=>x.id===id),rec=r&&wordFullRecords(type)[id];
 if(!rec||rec.result)return false;
 if(!reveal&&!rec.draft.trim())return false;
 rec.result={ok:!reveal&&wordFullCorrect(type,r,rec.draft),hinted:reveal};rec.attempts++;rec.master=rec.result.ok&&!reveal;
 wordFullMark(type,r,rec.master);wordFullSave();return true;
}
function wordFullFilter(type,filter){const s=wordFullState[type],records=wordFullRecords(type);s.filter=filter;s.visible=wordFullData(type).filter(r=>filter==='all'||(filter==='pending'?!records[r.id].result:records[r.id].attempts>0&&!records[r.id].master)).map(r=>r.id);}
function wordFullRetry(type,ids){const records=wordFullRecords(type);for(const id of ids){const rec=records[id];if(rec){rec.draft='';rec.result=null;rec.master=false;}}wordFullSave();}
function wordFullFeedback(type,r,rec){
 if(!rec.result)return '';
 const label=rec.result.hinted?'已看答案，留待獨立重練':rec.master?'✓ 獨立答對':'需要訂正，稍後再試';
 return '<div class="feedback '+(rec.master?'good':'bad')+'"><b>'+label+'</b><p>正確答案：'+(type==='reading'?readingHTML(r.answer):esc(r.key)+' · '+esc(r.word))+'</p></div><details class="wf-explanation"><summary>詞語解析・重點字義・記憶提示</summary>'+(type==='reading'?readingExplanation(r):spellingExplanation(r))+'</details><button data-wf-action="retry-one" data-wf-type="'+type+'" data-wf-id="'+r.id+'">遮住答案，再試這題</button>';
}
function wordFullRow(type,r,index){
 const st=wordFullState[type],rec=wordFullRecords(type)[r.id],locked=!!rec.result,field='wf-'+type+'-'+st.format+'-'+r.id,prompt=type==='reading'?esc(r.word).split(r.key).join('<mark>'+esc(r.key)+'</mark>'):spellingWord(r,true);
 let controls;
 if(st.format==='input')controls='<label for="'+field+'">'+(type==='reading'?'填寫標示字的讀音':'填入重點字（繁簡皆可）')+'</label><input id="'+field+'" data-wf-draft="'+r.id+'" data-wf-type="'+type+'" type="text" autocomplete="off" spellcheck="false" maxlength="24" '+(locked?'readonly':'')+' value="'+esc(rec.draft)+'" placeholder="'+(type==='reading'?'帶調拼音、拼音＋1–4，或注音':'一個重點字')+'">';
 else controls='<fieldset class="wf-options" '+(locked?'disabled':'')+'><legend>第 '+(index+1)+' 題選擇答案</legend>'+wordFullOptions(type,r).map((o,i)=>'<label class="wf-option"><input type="radio" name="'+field+'" data-wf-draft="'+r.id+'" data-wf-type="'+type+'" value="'+esc(o)+'" '+(rec.draft===o?'checked':'')+'><span><b>'+String.fromCharCode(65+i)+'</b> '+(type==='reading'?readingHTML(o):esc(o))+'</span></label>').join('')+'</fieldset>';
 return '<article class="wf-question" id="wf-row-'+r.id+'" data-wf-row="'+r.id+'" data-wf-type="'+type+'"><div class="card-top"><span class="tag">'+esc(r.kind)+' · '+esc(r.group)+' 欄</span><span>'+String(index+1).padStart(2,'0')+' / '+wordFullData(type).length+'</span></div><h3 class="wf-word">'+prompt+'</h3>'+controls+'<div class="dictation-actions">'+(!locked?'<button class="primary" data-wf-action="check-one" data-wf-type="'+type+'" data-wf-id="'+r.id+'">核對這題</button><button data-wf-action="reveal" data-wf-type="'+type+'" data-wf-id="'+r.id+'">不會，查看答案</button>':'')+'</div>'+wordFullFeedback(type,r,rec)+'</article>';
}
function wordFullStyles(){return '<style>'+`.wf-panel{margin-top:18px}.wf-heading{padding:24px;border:1px solid #d3dccd;border-radius:18px;background:#f8faef}.wf-heading h3{margin:5px 0 10px;font-size:23px}.wf-stats{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0}.wf-stats span{background:white;border:1px solid #dce2d8;border-radius:9px;padding:9px 13px}.wf-stats b{font-size:20px;margin-left:7px}.wf-progress{width:100%;height:12px;accent-color:#4a6953}.wf-toolbar{display:flex;flex-wrap:wrap;gap:9px;align-items:center;margin-top:14px}.wf-toolbar label{display:flex;gap:7px;align-items:center}.wf-toolbar button[aria-pressed=true]{background:#ddefa9;color:#243a2b}.wf-notice{min-height:1.5em;margin:12px 0}.wf-question{background:#fff;border:1px solid #dce2d8;border-radius:16px;padding:22px;margin:16px 0;scroll-margin-top:20px}.wf-question .card-top{padding:0 0 10px}.wf-word{font-family:serif;font-size:28px;line-height:1.6;margin:10px 0 18px}.wf-question>label{display:block;font-size:14px;margin-bottom:7px}.wf-question>input{width:min(100%,480px);padding:12px;border:1px solid #aebca9;border-radius:8px;font-size:18px;background:#fff;box-sizing:border-box}.wf-question>input[readonly]{background:#f3f5f1;color:#5b6457}.wf-options{border:0;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.wf-options legend{font-size:13px;margin-bottom:9px;color:#667263}.wf-option{border:1px solid #d5ddd1;border-radius:9px;padding:11px;display:flex;gap:10px;align-items:center;cursor:pointer;min-width:0}.wf-option:has(input:checked){background:#edf4d3;border-color:#6e8c58}.wf-option input{flex-shrink:0;width:18px;height:18px;accent-color:#4a6953}.wf-option b{font-size:12px;color:#687a61;margin-right:8px}.wf-option small{margin-left:8px}.wf-explanation{margin:14px 0}.wf-explanation summary{cursor:pointer;font-weight:600}.wf-confirm{padding:14px;background:#fff3dc;border:1px solid #e5cb93;border-radius:10px;margin-top:14px}.wf-complete{padding:13px;background:#e9f2df;border-radius:10px}.wf-heading button:focus-visible,.wf-question button:focus-visible,.wf-question input:focus-visible{outline:3px solid #77924e;outline-offset:3px}@media(max-width:600px){.wf-question,.wf-heading{padding:16px}.wf-options{grid-template-columns:1fr}.wf-stats{gap:6px}.wf-stats span{padding:7px;font-size:13px}.wf-stats b{font-size:17px}.wf-toolbar>button{flex:1 1 130px}}`+'</style>';}
function renderWordFullPractice(type){
 const s=wordFullState[type],stats=wordFullStats(type),rows=wordFullData(type),ids=s.filter==='all'?rows.map(r=>r.id):s.visible;
 const complete=stats.correct===stats.total?'<p class="wf-complete">✓ 本作答方式的 '+stats.total+' 組已全部獨立答對。可稍後全部重做，檢查是否仍記得。</p>':stats.covered===stats.total?'<p class="wf-complete">已過完全部 '+stats.total+' 組；還有 '+stats.review+' 組需要遮住答案再練。</p>':'';
 return wordFullStyles()+'<section class="wf-panel" aria-label="'+(type==='reading'?'讀音':'錯別字')+'全範圍練習"><div class="wf-heading"><span class="eyebrow">全部過一遍 · 每組都有記錄</span><h3>'+(type==='reading'?'39 組讀音':'74 組錯別字')+'完整練習</h3><p>'+ (type==='reading'?'一般詞語與成語':'一般詞語與四字詞語') +'的 D／E／F 全部列出，每組一次。可以逐題核對，或填完後一起核對。</p><div class="wf-toolbar">'+[['input','輸入填空'],['choice','選擇作答']].map(([v,t])=>'<button data-wf-format="'+v+'" data-wf-type="'+type+'" aria-pressed="'+(s.format===v)+'">'+t+'</button>').join('')+'</div><p class="muted">兩種作答方式分開保存進度。'+(type==='reading'&&s.format==='input'?'讀音須有聲調，例如 mā、ma1 或 ㄇㄚ；第一聲注音可不標調號。':'看過答案或答錯不算獨立答對；請遮住答案重練。')+'</p><div class="wf-stats"><span>已核對<b>'+stats.covered+' / '+stats.total+'</b></span><span>獨立答對<b>'+stats.correct+'</b></span><span>待重練<b>'+stats.review+'</b></span><span>未完成<b>'+stats.unseen+'</b></span></div><progress class="wf-progress" max="'+stats.total+'" value="'+stats.correct+'" aria-label="獨立答對進度"></progress>'+complete+'<div class="wf-toolbar"><button class="primary" data-wf-action="check-all" data-wf-type="'+type+'">核對全部已填答案</button><button data-wf-action="retry-wrong" data-wf-type="'+type+'" '+(!stats.review?'disabled':'')+'>遮答案重練未掌握（'+stats.review+'）</button><button data-wf-action="reset-request" data-wf-type="'+type+'">全部重做</button></div><div class="wf-toolbar"><label>顯示範圍<select data-wf-filter="'+type+'">'+[['all','全部 '+stats.total+' 組'],['pending','尚未核對的題目'],['review','待重練的題目']].map(([v,t])=>'<option value="'+v+'" '+(s.filter===v?'selected':'')+'>'+t+'</option>').join('')+'</select></label><small>篩選只改顯示；上方統計始終包含全部 '+stats.total+' 組。</small></div>'+(s.confirm?'<div class="wf-confirm"><p>重新開始這份'+(s.format==='input'?'填空':'選擇')+'練習？這份的作答與進度會清空。</p><button data-wf-action="reset-confirm" data-wf-type="'+type+'">確認全部重做</button> <button data-wf-action="reset-cancel" data-wf-type="'+type+'">保留進度</button></div>':'')+'<p class="wf-notice" role="status">'+esc(wordFullNotice||'')+'</p><small class="wf-save-status">'+(wordFullSaveFailed?'目前無法保存，請保持本頁開啟。':'進度與未核對草稿自動保存在同一瀏覽器，離開後可以繼續。')+'</small></div><div class="wf-list">'+(ids.length?rows.map((r,i)=>ids.includes(r.id)?wordFullRow(type,r,i):'').join(''):'<article class="empty"><h3>這個篩選目前沒有題目</h3><p>選「全部」即可回到完整範圍。</p></article>')+'</div></section>';
}
function wordFullVoiceContext(type){const s=wordFullState[type],r=wordFullData(type).find(x=>x.id===s.focus),rec=r&&wordFullRecords(type)[r.id];return r&&rec.result?{...wordVoiceContext(r),signature:'full-'+type+'-'+s.format+'-'+r.id+'-checked'}:{signature:'full-'+type+'-'+s.format+'-'+(r?.id||'idle'),hint:'全範圍練習核對答案後，可朗讀目前這題的詞語與解析。'};}
function initWordFullPractice(){
 wordFullLoad();const w=$('#workspace');
 w.addEventListener('input',e=>{const t=e.target,type=t.dataset.wfType,id=t.dataset.wfDraft;if(!id||!wordFullState[type])return;const rec=wordFullRecords(type)[id];if(!rec||rec.result)return;rec.draft=t.value;wordFullSave();w.querySelectorAll('.wf-save-status').forEach(n=>n.textContent=wordFullSaveFailed?'目前無法保存，請保持本頁開啟。':'已自動保存草稿；可以繼續作答。');});
 w.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.target.dataset.wfDraft&&e.target.type==='text'){e.preventDefault();e.target.closest('[data-wf-row]')?.querySelector('[data-wf-action="check-one"]')?.click();}});
 w.addEventListener('change',e=>{const type=e.target.dataset.wfFilter;if(!wordFullState[type])return;wordFullFilter(type,e.target.value);wordFullNotice='此篩選保留目前題目，核對後不會突然移走；再次選擇範圍可更新清單。';renderExam2();});
 w.addEventListener('focusin',e=>{const row=e.target.closest('[data-wf-row]');if(row&&wordFullState[row.dataset.wfType]){wordFullState[row.dataset.wfType].focus=row.dataset.wfRow;if(typeof syncVoiceUI==='function')syncVoiceUI();}});
 w.addEventListener('click',e=>{
  const b=e.target.closest('button'),d=b?.dataset,type=d?.wfType;if(!b||b.disabled||view!=='exam2'||!wordFullState[type])return;
  const s=wordFullState[type],records=wordFullRecords(type);wordFullNotice='';
  if(d.wfFormat){s.format=d.wfFormat;s.confirm=false;s.focus='';wordFullFilter(type,'all');wordFullSave();renderExam2();return;}
  if(!d.wfAction)return;
  switch(d.wfAction){
   case 'check-one':if(!wordFullCheck(type,d.wfId))wordFullNotice='先填寫或選擇這一題，再按核對。';s.focus=d.wfId;break;
   case 'reveal':wordFullCheck(type,d.wfId,true);s.focus=d.wfId;break;
   case 'check-all':{let n=0;for(const r of wordFullData(type))if(wordFullCheck(type,r.id))n++;const pending=wordFullStats(type).pending;wordFullNotice='本次核對 '+n+' 題；尚有 '+pending+' 題未核對。未填的題目保留，不會當成已完成。';break;}
   case 'retry-one':wordFullRetry(type,[d.wfId]);s.focus=d.wfId;wordFullNotice='答案已遮住，請再獨立作答。';break;
   case 'retry-wrong':{const ids=wordFullData(type).filter(r=>records[r.id].attempts>0&&!records[r.id].master).map(r=>r.id);wordFullRetry(type,ids);s.filter='review';s.visible=ids;s.focus='';wordFullNotice='已遮住 '+ids.length+' 題的答案。其他草稿與進度保留，獨立答對才移出待重練。';break;}
   case 'reset-request':s.confirm=true;break;
   case 'reset-cancel':s.confirm=false;break;
   case 'reset-confirm':for(const r of wordFullData(type))records[r.id]=wordFullEmpty();s.confirm=false;s.focus='';wordFullFilter(type,'all');wordFullSave();wordFullNotice='已開始新一輪完整練習。';break;
  }
  renderExam2();
  if(d.wfId){const row=document.getElementById('wf-row-'+d.wfId);row?.scrollIntoView({block:'nearest'});if(!wordFullRecords(type)[d.wfId]?.result)row?.querySelector('input')?.focus();}
  else document.querySelector('.wf-heading')?.scrollIntoView({block:'start'});
 });
}
