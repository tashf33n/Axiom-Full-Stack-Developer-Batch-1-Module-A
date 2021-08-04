//Get DOM Elements
const word = document.getElementById('word');
const userWord = document.getElementById('user-word');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const settingsBtn = document.getElementById('setting-btn');
const settingsContainer = document.getElementById('settings');
const settingsForm = document.getElementById('form');
const difficultyDropdown = document.getElementById('difficulty');
const gameoverContainer = document.getElementById('gameover');

const words = [
   'despite','detail','determine','develop','development','die','difference','different','difficult','dinner','direction','director','discover','discuss','discussion','disease','do','doctor','dog','door','down','draw','dream','drive','drop','drug','during','each','early','east','easy','eat','economic','economy','edge','education','effect','effort','eight','either','election','else','employee','end','energy','enjoy','enough','enter','entire','environment','environmental','especially','establish','even','evening','event','ever','every','everybody','everyone','everything','evidence','exactly','example','executive','exist','expect','experience','expert','explain','eye','face','fact','factor','fail','fall','family','far','fast','father','fear','federal','feel','feeling','few','field','fight','figure','fill','film','final','finally','financial','find','fine','finger','finish','fire','firm','first','fish','five','floor','fly','focus','follow','food','foot','for','force','foreign','forget','form','former','forward','four','free','friend','from','front','full','fund','future','game','garden','gas','general','generation','get','girl','give','glass','go','goal','good','government','great','green','ground','group','grow','growth','guess','gun','guy','hair','half','hand','hang','happen','happy','hard','have','he','head','health','hear','heart','heat','heavy','help','her','here','herself','high','him','himself','his','history','hit','hold','home','hope','hospital','hot','hotel','hour','house','how','however','huge','human','hundred','husband','I','idea','identify','if','image','imagine','impact','important','improve','in','include','including','increase','indeed','indicate','individual','industry','information','inside','instead','institution','interest','interesting','international','interview','into','investment','involve','issue','it','item','its','itself','job','join','just','keep','key','kid','kill','kind','kitchen','know','knowledge','land','language','large','last','late','later','laugh','law','lawyer','lay','lead','leader','learn','least','leave','left','leg','legal','less','let','letter','level','lie','life','light','like','likely','line','list','listen','little','live','local','long','look','lose','loss','lot','love','low','machine','magazine','main','maintain','major','majority','make','man','manage','management','manager','many','market','marriage','material','matter','may','maybe','me','mean','measure','media','medical','meet','meeting','member','memory','mention','message','method','middle','might','military','million','mind','minute','miss','mission','model','modern','moment','money','month','more','morning','most','mother','mouth','move','movement','movie','Mr','Mrs','much','music','must','my','myself','name','nation','national','natural','nature','near','nearly','necessary','need','network','never','new','news','newspaper','next','nice','night','no','none','nor','north','not','note','nothing','notice','now','number','occur','of','off','offer','office','officer','official','often','oh','oil','ok','old','on','once','one','only','onto','open','operation','opportunity','option','or','order','organization','other','others','our','out','outside','over','own','owner','page','pain','painting','paper','parent','part','participant','particular','particularly','partner','party','pass','past','patient','pattern','pay','peace','people','per','perform','performance','perhaps','period','person','personal','phone','physical','pick','picture','piece','place','plan','plant','play','player','PM','point','police','policy','political','politics','poor','popular','population','position','positive','possible','power','practice','prepare','present','president','pressure','pretty','prevent','price','private','probably','problem','process','produce','product','production','professional','professor','program','project','property','protect','prove','provide','public','pull','purpose','push','put','quality','question','quickly','quite','race','radio','raise','range','rate','rather','reach','read','ready','real','reality','realize','really','reason','receive','recent','recently','recognize','record','red','reduce','reflect','region','relate','relationship','religious','remain','remember','remove','report','represent','Republican','require','research','resource','respond','response','responsibility','rest','result','return','reveal','rich','right','rise','risk','road','rock','role','room','rule','run','safe','same','save','say','scene','school','science','scientist','score','sea','season','seat','second','section','security','see','seek','seem','sell','send','senior','sense','series','serious','serve','service','set','seven','several','sex','sexual','shake','share','she','shoot','short','shot','should','shoulder','show','side','sign','significant','similar','simple','simply','since','sing','single','sister','sit','site','situation','six','size','skill','skin','small','smile','so','social','society','soldier','some','somebody','someone','something','sometimes','son','song','soon','sort','sound','source','south','southern','space','speak','special','specific','speech','spend','sport','spring','staff','stage','stand','standard','star','start','state','statement','station','stay','step','still','stock','stop','store','story','strategy','street','strong','structure','student','study','stuff','style','subject','success','successful','such','suddenly','suffer','suggest','summer','support','sure','surface','system','table','take','talk','task','tax','teach','teacher','team','technology','television','tell','ten','tend','term','test','than','thank','that','the','their','them','themselves','then','theory','there','these','they','thing','think','third','this','those','though','thought','thousand','threat','three','through','throughout','throw','thus','time','to','today','together','tonight','too','top','total','tough','toward','town','trade','traditional','training','travel','treat','treatment','tree','trial','trip','trouble','TRUE','truth','try','turn','TV','two','type','under','understand','unit','until','up','upon','us','use','usually','value','various','very','victim','view','violence','visit','voice','vote','wait','walk','wall','want','war','watch','water','way','we','weapon','wear','week','weight','well','west','western','what','whatever','when','where','whether','which','while','white','who','whole','whom','whose','why','wide','wife','will','win','wind','window','wish','with','within','without','woman','wonder','word','work','worker','world','worry','would','write','writer','wrong','yard','yeah','year','yes','yet','you','young','your','yourself'
];

//Placeholder for selected word
let randomWord;

//Initialize score 
let score = 0;

//Initialize time
let time = 60;

//Initialize difficulty 
let difficulty =  /*if (*/localStorage.getItem('difficulty')  !== null/*)*/      /*{ */ ? localStorage.getItem('difficulty') /*}*/ /* else {*/ : 
     'easy' /* }*/;

//Render the value for difficulty in difficulty dropdown
difficultyDropdown.value = difficulty;

//When page load user clicnk aotumatically active
userWord.focus();

//Function to generate a random word from the word list
function generateWord(){
    //Select Random Word
    const generatedWord = words[Math.floor(Math.random()*words.length)];
    return generatedWord;
}

//Function to render the new word
function renderWord(){
   //Generate new random word
   randomWord = generateWord();
   word.innerHTML = randomWord;
   return randomWord;
}


//Function for increasing the score
function incrementScore(){
   score ++;
   scoreElement.innerHTML = score;
}

//Start timer countdown
const timerInterval = setInterval(decrementTimer,1000);

//Function to decrement the timer by 1 second
function decrementTimer(){
   //Decreoemtn time by 1 second 
   time--;
   //Render new time in DOM
   timeElement.innerHTML = time;
   //Check if timer raches 0
   if (time === 0){
      //When timer reaches 0 stop the set Interval function to decrement time
      clearInterval(timerInterval);
      //Display the gameOver container
      gameover();
   }
}

//Function to handle when the game is over
function gameover(){
   //Display the gameover contaner
   gameoverContainer.style.display = 'flex';
   gameoverContainer.innerHTML = `
   <h1>Time up!</h1>
   <p>Good game! Your score is: ${score}</p>
   <button onclick="location.reload()">Play Again</button>
   `;

}

//Event Listeners
//1. Listen for input new word
userWord.addEventListener('input', e => {
   //Save the value in the input field
   const userInput = e.target.value;
   //Check to see if userInput matches the random word
   if (userInput === randomWord ){
      //If the user type correct word then create new word
      renderWord();
      //Increase Score
      incrementScore(); 
      //Clear the user input field
      e.target.value = '';
      //Check the difficulty settings
      if ( difficulty === 'easy' ){
         time+=3
      }else if( difficulty === 'medium' ){
         time+=2
      }else{
         time+=1

      }
      //Add more time to the timer

      //Render new time in DOM
      timeElement.innerHTML = time;
      
   }
   

})

// 2. Listen for click on setting button
settingsBtn.addEventListener('click', () => settingsContainer.classList.toggle('hide'));

//3. Listen for the change in the difficulty
difficultyDropdown.addEventListener('change', e => {
   //Updating the difficulty using the newly selected value from dropdown in settings 
   difficulty = e.target.value;
   //Use localstorage to save the difficulty settings
   localStorage.setItem('difficulty', difficulty);
   
   
})

//Run the render function on the page load
renderWord();