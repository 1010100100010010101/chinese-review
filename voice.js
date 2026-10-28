'use strict';
let voiceStartTimer=null,voiceList=[],voiceRun=0,voiceUtterance=null,voiceActive=false,voicePaused=false,voiceSignature='',voiceSettings={rate:0.9,voice:''};
try{const s=JSON.parse(localStorage.getItem('zizi-voice-v1'));if(s){if([0.65,0.9,1,1.15].includes(s.rate))voiceSettings.rate=s.rate;if(typeof s.voice==='string')voiceSettings.voice=s.voice;}}catch{}
function voiceSupported(){return !!(window.speechSynthesis&&window.SpeechSynthesisUtterance)}
function voiceStatus(text){$('#voiceStatus').textContent=text;$('#voiceDockStatus').textContent=text}
function voiceControls(){for(const suffix of ['','Dock']){const pause=$('#voice'+suffix+'Pause'),stop=$('#voice'+suffix+'Stop');pause.textContent=voicePaused?'繼續':'暫停';pause.disabled=!voiceActive;stop.disabled=!voiceActive;}}
function clearVoiceStartTimer(){if(voiceStartTimer!==null){clearTimeout(voiceStartTimer);voiceStartTimer=null;}}
function showVoiceSettings(){const panel=$('#voicePanel');panel.querySelector('details').open=true;panel.scrollIntoView({behavior:'smooth',block:'start'});}

function saveVoiceSettings(){try{localStorage.setItem('zizi-voice-v1',JSON.stringify(voiceSettings))}catch{}}
function stopVoice(message='已停止朗讀'){clearVoiceStartTimer();voiceRun++;voiceActive=false;voicePaused=false;voiceUtterance=null;if(voiceSupported())window.speechSynthesis.cancel();voiceControls();if(message)voiceStatus(message)}
function refreshVoices(){if(!voiceSupported())return;voiceList=window.speechSynthesis.getVoices().filter(v=>/^(zh|cmn)(-|_|$)/i.test(v.lang)&&!/yue|cantonese|廣東|粤|粵/i.test(v.name)&&!/^zh[-_]HK$/i.test(v.lang));voiceList.sort((a,b)=>Number(/^zh[-_]CN$/i.test(b.lang))-Number(/^zh[-_]CN$/i.test(a.lang)));$('#voiceAvailable').textContent=voiceList.length?'已偵測到 '+voiceList.length+' 個中文聲音，可按「測試聲音」試聽。':'目前未偵測到中文聲音。可先測試；若無法播放，請加入普通話語音或更換瀏覽器。';const s=$('#voiceChoice');s.innerHTML='<option value="">自動選擇普通話</option>'+voiceList.map((v,i)=>'<option value="'+i+'" '+(v.voiceURI===voiceSettings.voice?'selected':'')+'>'+esc(v.name)+' · '+esc(v.lang)+'</option>').join('');}
// Only spoken text is adjusted for a few explicitly taught polyphonic readings.
// Original characters on screen and all marking answers remain untouched.
const voiceReplacements=[['將進酒','羌進酒'],['千金散盡','千金散盡'],['烹羊宰牛且為樂','烹羊宰牛且為樂'],['斗酒十千','抖酒十千'],['呼兒將出','呼兒江出'],['古來聖賢皆寂寞','古來聖賢皆寂寞'],['若夫','若扶'],['嗟夫','嗟扶'],['樂夫天命','樂扶天命'],['朝而往','招而往'],['朝暮','招暮'],['朝如青絲','招如青絲'],['輕飏','輕揚'],['樽','尊'],['罇','尊'],['悱惻','匪測'],['法家拂士','法家弼士'],['便宜行事','便宜行事'],['駘蕩','代蕩'],['簞食','丹食'],['賁門','奔門'],['蚌埠','泵埠'],['萬頭攢動','萬頭船動'],['燈影幢幢','燈影床床'],['鼎鐺玉石','鼎撐玉石'],['一蹴而就','一促而就']];
function voiceText(s){let t=String(s);for(const[a,b]of voiceReplacements)t=t.split(a).join(b);return t.replace(/[_＿]+/g,'，空格，').replace(/[→／]/g,'，').replace(/[《》「」]/g,'').replace(/\s+/g,' ').trim()}
function voiceChunks(t){const parts=voiceText(t).match(/[^。！？；\n]+[。！？；\n]?/g)||[];return parts.flatMap(p=>{const a=[];for(let i=0;i<p.length;i+=120)a.push(p.slice(i,i+120));return a}).filter(x=>x.trim())}
function speakVoice(text,label='朗讀'){
 stopVoice('');
 if(!voiceSupported()){voiceStatus('此瀏覽器不支援文字朗讀；請用支援朗讀的瀏覽器直接開啟網站。');return}
 const parts=voiceChunks(text);if(!parts.length){voiceStatus('請先打開詞卡、背默或唐宋詞；也可按「測試聲音」。');return}
 refreshVoices();const synth=window.speechSynthesis,selected=voiceList.find(v=>v.voiceURI===voiceSettings.voice)||voiceList[0],run=voiceRun;voiceActive=true;voiceControls();let i=0;
 function next(){
  if(run!==voiceRun)return;
  if(i>=parts.length){clearVoiceStartTimer();voiceActive=false;voiceUtterance=null;voiceControls();voiceStatus('朗讀完成：'+label);return}
  const u=new window.SpeechSynthesisUtterance(parts[i]);voiceUtterance=u;u.lang=selected?.lang||'zh-CN';if(selected)u.voice=selected;u.rate=voiceSettings.rate;u.volume=1;
  u.onstart=()=>{if(run===voiceRun){clearVoiceStartTimer();voiceStatus('正在播放：'+label+'（'+(i+1)+' / '+parts.length+'）')}};
  u.onend=()=>{if(run===voiceRun){clearVoiceStartTimer();i++;next()}};
  u.onerror=e=>{if(run!==voiceRun)return;stopVoice('');let message='播放失敗；請檢查分頁與裝置是否靜音，再按「測試聲音」。';if(['voice-unavailable','language-unavailable','synthesis-unavailable'].includes(e.error)||(e.error==='synthesis-failed'&&!voiceList.length))message='無法使用中文語音。請在「聲音設定」選擇聲音，或在裝置加入普通話語音後重開瀏覽器。';if(e.error==='not-allowed')message='瀏覽器未允許播放。請直接在瀏覽器開啟網站，再按一次「測試聲音」。';voiceStatus(message+'（'+e.error+'）')};
  voiceStatus('準備播放：'+label);
  voiceStartTimer=setTimeout(()=>{if(run===voiceRun&&voiceActive&&!voicePaused){stopVoice('');voiceStatus('語音未能啟動。請按「聲音設定」檢查中文聲音，再按「測試聲音」。')}},8000);
  try{if(synth.paused)synth.resume();synth.speak(u)}catch{stopVoice('');voiceStatus('無法啟動朗讀，請換用支援中文語音的瀏覽器。')}
 }
 next();
}
function ciUnitVoice(u){return u.title+'。'+u.summary+'。'+u.rows.map(r=>r.join('，')).join('。')+'。記憶提示。'+u.memory+'。'+u.note}
function wordVoiceContext(r,locked=false){if(r&&!r.meaning&&wordExplanations[r.word]){const e=wordExplanations[r.word];r={...r,meaning:e.meaning,keyMeaning:e.focus,tip:e.tip}}return{signature:r?.id||r?.word||'word',label:'朗讀詞語',text:locked?'':r?.word||'',explain:!locked&&r?.meaning?[r.meaning,r.keyMeaning,r.tip].join('。'):'',hint:locked?'讀音選擇題作答後才開放聽讀。':''}}
function voiceContext(){
 if(view==='study'){const r=data.filter(d=>d.cat===cat)[pos];return wordVoiceContext(r)}
 if(view==='quiz'){const r=quiz[qi];return r&&!finished?wordVoiceContext(r,r.cat<2&&chosen===null):{signature:'quiz-end'}}
 if(view==='essays'){const e=lesson(),s=e.segments[segmentIndex];return{signature:'essay-'+e.id+'-'+essayTab+'-'+segmentIndex,label:'朗讀這一句',text:s[0],full:e.recite,fullLabel:'連讀背默範圍',explain:s[2]+'。'+s[3]}}
 if(view!=='exam2')return{signature:view};
 if(examSection==='essays'){const e=examLesson(),s=e.segments[examSegment];return{signature:'exam-'+e.id+'-'+examTab+'-'+examSegment,label:'朗讀這一組',text:s[0],full:e.recite,fullLabel:'連讀背默範圍',explain:s[2]+'。'+s[3]}}
 if(examSection==='reading'){if(['teach','cards'].includes(readingMode))return wordVoiceContext(readingPool()[readingIndex]);if(readingMode==='quiz'){const s=practiceSessions.reading;return s&&!s.done?wordVoiceContext(s.items[s.index],s.choice===null):{signature:'reading-quiz'}}}
 if(examSection==='spelling'){if(['teach','cards','input'].includes(spellingMode))return wordVoiceContext(spellingPool()[spellingIndex]);if(spellingMode==='quiz'){const s=spellingQuiz;return s&&!s.done?wordVoiceContext(s.items[s.index]):{signature:'spelling-quiz'}}}
 if(examSection==='authors')return worksheetVoiceContext('authors');
 if(examSection==='culture')return cultureVoiceContext();
 if(examSection==='ci'){if(ciMode==='fill')return worksheetVoiceContext('ci');if(ciMode==='quiz'){const q=ciRound[ciPosition];return q&&!ciFinished?{signature:'ci-mc-'+ciPosition,label:'朗讀題目',text:q.prompt,explain:ciChoice!==null?q.answer+'。'+q.reason:''}:{signature:'ci-quiz'}}return{signature:'ci-notes',label:'朗讀九組重點',text:ciUnits.map(ciUnitVoice).join('。'),hint:'也可展開單一重點，按「朗讀這組」。'}}
 return{signature:'exam-'+examSection};
}
function syncVoiceUI(){const c=voiceContext();const signature=view+'-'+(view==='exam2'?examSection+'-'+(examSection==='reading'?readingMode:examSection==='spelling'?spellingMode:examSection==='ci'?ciMode:'')+'-':'')+(c.signature||'');if(signature!==voiceSignature){if(voiceActive)stopVoice();voiceSignature=signature;}for(const id of ['#voiceCurrent','#voiceDockCurrent']){$(id).textContent='▶ '+(c.label||'播放目前內容').replace('朗讀','播放');$(id).disabled=!c.text;}$('#voiceFull').hidden=!c.full;$('#voiceFull').textContent='▶ '+(c.fullLabel||'連續朗讀');$('#voiceExplain').disabled=!c.explain;$('#voiceContextHint').textContent=c.hint||(c.text?'點擊「▶ 播放」才發聲；底部播放列隨時可用。':'請先選擇詞卡、背默或唐宋詞；也可按「測試聲音」。');voiceControls();}
function initVoice(){
 const panel=$('#voicePanel'),dock=$('#voiceDock');
 function handleClick(e){
  const b=e.target.closest('[data-voice]');if(!b||b.disabled)return;const action=b.dataset.voice;
  if(action==='settings'){showVoiceSettings();return}
  if(action==='refresh'){refreshVoices();voiceStatus(voiceList.length?'已重新偵測語音，請按「測試聲音」。':'未偵測到中文聲音，請先在裝置加入普通話語音。');return}
  if(action==='test'){speakVoice('你好，這是中文朗讀測試。聽到這句話後，就可以播放詞語和課文了。','聲音測試');return}
  if(action==='stop'){stopVoice();return}
  if(action==='pause'){if(!voiceActive||!voiceSupported())return;voicePaused=!voicePaused;window.speechSynthesis[voicePaused?'pause':'resume']();voiceControls();voiceStatus(voicePaused?'已暫停':'繼續播放');return}
  const c=voiceContext();if(action==='current')speakVoice(c.text,c.label);if(action==='full')speakVoice(c.full,c.fullLabel);if(action==='explain')speakVoice(c.explain,'答案與解析');
 }
 panel.addEventListener('click',handleClick);dock.addEventListener('click',handleClick);
 panel.addEventListener('change',e=>{if(e.target.id==='voiceRate')voiceSettings.rate=Number(e.target.value);if(e.target.id==='voiceChoice')voiceSettings.voice=e.target.value===''?'':voiceList[Number(e.target.value)]?.voiceURI||'';saveVoiceSettings();if(voiceActive)stopVoice('設定已更新，請按播放重新開始。');});$('#voiceRate').value=String(voiceSettings.rate);
 $('#workspace').addEventListener('click',e=>{const b=e.target.closest('[data-voice-unit]');if(b){const u=ciUnits.find(u=>u.id===b.dataset.voiceUnit);if(u)speakVoice(ciUnitVoice(u),u.title)}});
 if(voiceSupported()){refreshVoices();window.speechSynthesis.addEventListener('voiceschanged',refreshVoices);voiceStatus(voiceList.length?'按「▶ 播放」開始；首次使用可先測試聲音。':'尚未偵測到中文聲音；請先按「測試聲音」。');}else{voiceStatus('此瀏覽器不支援文字朗讀；請用其他瀏覽器直接開啟網站。');$('#voiceAvailable').textContent='此瀏覽器不支援文字朗讀。';}
 if(typeof MutationObserver!=='undefined')new MutationObserver(syncVoiceUI).observe($('#workspace'),{childList:true,subtree:true});window.addEventListener('pagehide',()=>stopVoice(''));syncVoiceUI();
}
