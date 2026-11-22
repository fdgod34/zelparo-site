const strings = {
  tr: {},
  en: {
    skip:'Skip to content',navLabel:'Main navigation',navGames:'Our games',navStudio:'The studio',navSupport:'Support',
    heroLabel:'HELLO, WE ARE ZELPARO.',heroLine1:'Little breaks.',heroLine2:'New worlds.',
    heroBody:'A little discovery, a little excitement, and games that make you say “just one more level.”',discover:'Discover our first game',heroNote:'A small beginning. A growing world.',
    inDevelopment:'IN DEVELOPMENT',firstGame:'OUR FIRST GAME',heroAlt:'A little Garden Rush shop on the Istanbul waterfront',
    strip1:'START WITH CURIOSITY.',strip2:'GROW THROUGH PLAY.',strip3:'WITH ZELPARO.',
    gameLabel:'01 / OUR FIRST ADVENTURE',gameGenre:'MOBILE · AREA CAPTURE · DISCOVERY',gameHeading:'Start with a garden.<br>Discover the world.',
    gameBody:'Draw your line, close the loop, and bring a garden back to life. Every completed job is a step towards growing your little shop and setting off for a new city.',
    howLink:'See the transformation',releaseNote:'A new adventure is growing.<br>A release date has not been announced yet.',
    homeAlt:'Garden Rush home screen',gameplayAlt:'Actual Garden Rush gameplay screen',homeCaption:'YOUR OWN LITTLE SHOP',playCaption:'YOUR NEXT JOB AWAITS',
    factCities:'DIFFERENT CITIES',factGardens:'GARDENS, FRESH STARTS',factStory:'YOUR GROWING STORY',
    beforeAlt:'An Istanbul garden before restoration',afterAlt:'The same Istanbul garden restored',afterTag:'BACK TO LIFE',beforeTag:'BEFORE',sliderLabel:'Compare the garden before and after',dragHint:'Slide to see the change.',artNote:'In-game garden artwork',
    howLabel:'SMALL MOVES. BIG CHANGES.',howTitle:'Leave a little <br>beauty behind.',howBody:'A little courage, the right turn, and a line closed just in time. Every garden has a new path waiting to be found.',
    step1Title:'Find your path',step1Body:'Leave the safe edge. Trace your own route through the garden.',step2Title:'Reclaim the garden',step2Body:'Close your line and clear an area before the creatures catch you.',step3Title:'Turn a new leaf',step3Body:'Grow your shop with your earnings, then move on to new cities.',
    worldLabel:'SAME CURIOSITY. DIFFERENT STREETS.',worldTitle:'Where to next?',worldBody:'From Istanbul to New York.<br>New gardens and a new shop in every city.',citiesLabel:'Cities',cairo:'Cairo',cityNote:'FROM GARDEN RUSH: WORLD TOUR',
    studioLabel:'BEHIND THE GAME',studioTitle:'A good game <br>begins with <br>a little curiosity.',studioBody:'At Zelparo, we build little worlds you will want to come back to.',studioBody2:'Games you can jump into, discover as you play, and watch your progress take shape. Garden Rush: World Tour is our first step. Our journey is just beginning.',
    supportLabel:'A FEW THINGS YOU MIGHT WONDER',supportTitle:'Something on your mind?',faq1Title:'When can I play Garden Rush?',faq1Body:'The game is in development. We will share the release date and store links here when they are ready.',faq2Title:'Which devices is it being developed for?',faq2Body:'Our first target is Android phones. News about other platforms will be shared here.',faq3Title:'Which languages will be available?',faq3Body:'Garden Rush is being developed in Turkish and English.',faq4Title:'How can I contact player support?',faq4Body:'Our support address is support@zelparogames.com. Our email channel will open before the game launches.',
    footerLine:'See you at the next little discovery.',footerPlace:'MADE WITH CURIOSITY.',topLabel:'Back to top',privacy:'Privacy',terms:'Terms of service',deleteAccount:'Account deletion'
  }
};
const cityData = {
  istanbul:{name:{tr:'İstanbul',en:'Istanbul'},tr:'Her büyük yolculuğun küçük bir başlangıcı var. Seninki, Boğaz’ın kıyısındaki bu dükkânda.',en:'Every great journey has a small beginning. Yours starts in a little shop beside the Bosphorus.'},
  tokyo:{name:{tr:'Tokyo',en:'Tokyo'},tr:'Sakura ağaçları, sakin bahçeler ve yepyeni bir ritim. Yolculuğun Tokyo sokaklarında devam ediyor.',en:'Cherry blossoms, quiet gardens, and a whole new rhythm. Your journey continues on the streets of Tokyo.'},
  kahire:{name:{tr:'Kahire',en:'Cairo'},tr:'Sıcak taşların arasında yeşeren avlular. Kahire’de her bahçe, yeniden canlanmayı bekliyor.',en:'Green courtyards among warm stone walls. In Cairo, every garden is waiting to come back to life.'},
  paris:{name:{tr:'Paris',en:'Paris'},tr:'Çiçekli avlular ve kendine özgü sokaklar. Küçük işletmene Paris’te yeni bir sayfa aç.',en:'Flower-filled courtyards and streets with their own character. Begin a new chapter for your little business in Paris.'},
  'new-york':{name:{tr:'New York',en:'New York'},tr:'Büyük şehrin içinde küçük yeşil kaçamaklar. Dükkânının yeni adresi New York.',en:'Little green escapes in the big city. Your shop’s next address is New York.'}
};
let language='tr';
let selectedCity='istanbul';
document.querySelectorAll('[data-i18n]').forEach(element => { strings.tr[element.dataset.i18n]=element.innerHTML; });
document.querySelectorAll('[data-alt]').forEach(element => { strings.tr[element.dataset.alt]=element.alt; });
document.querySelectorAll('[data-label]').forEach(element => { strings.tr[element.dataset.label]=element.getAttribute('aria-label'); });
function updateCity(city, focus=false) {
  selectedCity=city;
  const data=cityData[city];
  const tabs=[...document.querySelectorAll('[data-city]')];
  tabs.forEach(tab=>{ const active=tab.dataset.city===city;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus(); });
  document.getElementById('city-panel').setAttribute('aria-labelledby',`tab-${city}`);
  document.getElementById('city-image').src=`assets/city-${city}.webp`;
  document.getElementById('city-image').alt=language==='tr'?`${data.name.tr} oyun sahnesi`:`${data.name.en} game scene`;
  document.getElementById('city-name').textContent=data.name[language];
  document.getElementById('city-description').textContent=data[language];
  document.querySelector('.city-index').textContent=`0${Object.keys(cityData).indexOf(city)+1} / 05`;
}
function setLanguage(next) {
  language=next;
  document.documentElement.lang=next;
  document.title=next==='tr'?'Zelparo — Oynamaya değer küçük dünyalar':'Zelparo — Little worlds worth playing';
  document.querySelector('meta[name="description"]').content=next==='tr'?'Zelparo — Küçük molalar, yeni dünyalar. İlk mobil oyunumuz Garden Rush: World Tour ile tanışın.':'Zelparo — Little breaks, new worlds. Meet our first mobile game, Garden Rush: World Tour.';
  document.querySelectorAll('[data-i18n]').forEach(element=>{element.innerHTML=strings[next][element.dataset.i18n];});
  document.querySelectorAll('[data-alt]').forEach(element=>{element.alt=strings[next][element.dataset.alt];});
  document.querySelectorAll('[data-label]').forEach(element=>{element.setAttribute('aria-label',strings[next][element.dataset.label]);});
  document.querySelectorAll('[data-lang]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.lang===next));});
  document.querySelectorAll('[data-home-image],.hero-image img').forEach(img=>{img.src=`assets/home-${next}.webp`;});
  updateCity(selectedCity);
}
// The choice is shared with the legal pages (legal.js); storage may be unavailable, then it lasts for this page only.
const languageKey='zelparo-lang';
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{
  setLanguage(button.dataset.lang);
  try{localStorage.setItem(languageKey,button.dataset.lang);}catch{}
}));
try{if(localStorage.getItem(languageKey)==='en')setLanguage('en');}catch{}
document.querySelectorAll('[data-city]').forEach((button,index)=>{
  button.addEventListener('click',()=>updateCity(button.dataset.city));
  button.addEventListener('keydown',event=>{
    const keys=Object.keys(cityData);
    let next=index;
    if(event.key==='ArrowRight')next=(index+1)%keys.length;
    else if(event.key==='ArrowLeft')next=(index+keys.length-1)%keys.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=keys.length-1;
    else return;
    event.preventDefault();updateCity(keys[next],true);
  });
});
document.getElementById('garden-slider').addEventListener('input',event=>{document.querySelector('.comparison').style.setProperty('--split',`${event.target.value}%`);});
