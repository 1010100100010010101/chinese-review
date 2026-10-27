// Transcribe the existing Mandarin readings; do not change pronunciation standards.
function toZhuyin(pinyin) {
  let syllable = String(pinyin).toLowerCase(), tone = 0;
  const vowels = { a:'āáǎà', e:'ēéěè', i:'īíǐì', o:'ōóǒò', u:'ūúǔù', ü:'ǖǘǚǜ' };
  for (const [v, marks] of Object.entries(vowels)) {
    for (let i=0; i<marks.length; i++) {
      if (syllable.includes(marks[i])) { tone=i+1; syllable=syllable.replace(marks[i],v); }
    }
  }
  const numeral=syllable.match(/[1-5]$/);
  if(numeral){tone=Number(numeral[0]);syllable=syllable.slice(0,-1);}
  if (!/^[a-zü]+$/.test(syllable)) return '';
  const zeroInitial={yi:'i',ya:'ia',yo:'io',ye:'ie',yao:'iao',you:'iou',yan:'ian',yin:'in',yang:'iang',ying:'ing',yong:'iong',yu:'ü',yue:'üe',yuan:'üan',yun:'ün',wu:'u',wa:'ua',wo:'uo',wai:'uai',wei:'uei',wan:'uan',wen:'uen',wang:'uang',weng:'ueng'};
  syllable=zeroInitial[syllable]||syllable;
  const initials={zh:'ㄓ',ch:'ㄔ',sh:'ㄕ',b:'ㄅ',p:'ㄆ',m:'ㄇ',f:'ㄈ',d:'ㄉ',t:'ㄊ',n:'ㄋ',l:'ㄌ',g:'ㄍ',k:'ㄎ',h:'ㄏ',j:'ㄐ',q:'ㄑ',x:'ㄒ',r:'ㄖ',z:'ㄗ',c:'ㄘ',s:'ㄙ'};
  const finals={a:'ㄚ',o:'ㄛ',e:'ㄜ',ai:'ㄞ',ei:'ㄟ',ao:'ㄠ',ou:'ㄡ',an:'ㄢ',en:'ㄣ',ang:'ㄤ',eng:'ㄥ',ong:'ㄨㄥ',er:'ㄦ',i:'ㄧ',ia:'ㄧㄚ',io:'ㄧㄛ',ie:'ㄧㄝ',iao:'ㄧㄠ',iou:'ㄧㄡ',iu:'ㄧㄡ',ian:'ㄧㄢ',in:'ㄧㄣ',iang:'ㄧㄤ',ing:'ㄧㄥ',iong:'ㄩㄥ',u:'ㄨ',ua:'ㄨㄚ',uo:'ㄨㄛ',uai:'ㄨㄞ',uei:'ㄨㄟ',ui:'ㄨㄟ',uan:'ㄨㄢ',uen:'ㄨㄣ',un:'ㄨㄣ',uang:'ㄨㄤ',ueng:'ㄨㄥ',ü:'ㄩ',üe:'ㄩㄝ',üan:'ㄩㄢ',ün:'ㄩㄣ'};
  const initial=Object.keys(initials).find(i=>syllable.startsWith(i))||'';
  let final=syllable.slice(initial.length);
  if (['j','q','x'].includes(initial)&&final.startsWith('u')) final='ü'+final.slice(1);
  if (['zh','ch','sh','r','z','c','s'].includes(initial)&&final==='i') final='';
  if(final&&!finals[final])return '';
  const result=(initials[initial]||'')+(finals[final]||'');
  if(!result)return '';
  return tone===0||tone===5?'˙'+result:result+['','','ˊ','ˇ','ˋ'][tone];
}
