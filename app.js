//////////////////////////////////////////////////// 
// Character Object
//////////////////////////////////////////////////// 
let userCharacter = {
  skills: 5,
  stamina: 5,
  luck: 5,
  items: ['sword', 'leather armor', 'lantern', 'manzana'],
  gold: 100,
  jewels: 100,
  provisions: 3,
  potions: [['heal potion', 2],['mana potion', 2], ['stamina potion', 2]],
  encounters: 'test'
};

//////////////////////////////////////////////////// 
// Load & Save Character Logic
//////////////////////////////////////////////////// 

const saveBtn = document.querySelector('#save');
saveBtn.addEventListener('click', (e) => {
  console.log('GUARDADO');
  savePlayer(userCharacter);
});

const loadBtn = document.querySelector('#load');
loadBtn.addEventListener('click', (e) => {
  loadPlayer();
});

function loadPlayer() {
  userCharacter = JSON.parse(localStorage.getItem('playerInfo'))
  console.log(userCharacter)
}

window.onload = function() {
  loadPlayer();
}

function savePlayer(e) {
  localStorage.setItem('playerInfo', JSON.stringify(e));
}



//////////////////////////////////////////////////// 
// Roll Dice Logic
//////////////////////////////////////////////////// 
// DOM
const $dice = document.querySelector('#rollDice');
const $diceNumber1 = document.querySelector('#diceNumber1');
const $diceNumber2 = document.querySelector('#diceNumber2');
//   |
//   |
//   |
//    Event Listener
$dice.addEventListener('click', (e) => {
    let diceNumber1 = rollDice();
    let diceNumber2 = rollDice();
    $diceNumber1.textContent = diceNumber1;
    $diceNumber2.textContent = diceNumber2;
});

$diceNumber1.addEventListener('click', (e) => {
  let diceNumber1 = rollDice();
  $diceNumber1.textContent = diceNumber1;
});

$diceNumber2.addEventListener('click', (e) => {
  let diceNumber2 = rollDice();
  $diceNumber2.textContent = diceNumber2;
});
//   |
//   |
//   |
//   |
//    Functions
function rollDice () {
    let randomNum = Math.floor(Math.random()*6 + 1);
    return randomNum;
};

//////////////////////////////////////////////////// 
// Item List Logic
//////////////////////////////////////////////////// 
// DOM
const $btnAddItem = document.querySelector('#addItem');
const $addItemCamp = document.querySelector('#addItemCamp');
//   |
//   |
//   |
//    Event Listener
        $btnAddItem.addEventListener('click', (e) => {
            agregarItem($addItemCamp.value);
            $addItemCamp.value = '';
        });
//   |
//   |
//   |
//   |
//    Functions
function agregarItem(nombreObjeto) {
  crearNewItem(nombreObjeto);
  savePlayer(userCharacter);
}

const crearNewItem = (nombreObjeto) => {

  const newItem = document.createElement('li');
  const newItemName = document.createElement('p');
  newItemName.textContent = nombreObjeto;
  const newButtonEquip = document.createElement('button');
  const newButtonToss = document.createElement('button');
  newButtonEquip.textContent = 'Equip';
  newButtonEquip.classList.add('actionEquip');
  newButtonToss.textContent = 'Toss';
  newButtonToss.classList.add('actionEquip');

  newItem.appendChild(newItemName);
  newItem.appendChild(newButtonEquip);
  newItem.appendChild(newButtonToss);

  const ul = document.querySelector('#listaDeItems');
  ul.appendChild(newItem);
};

//////////////////////////////////////////////////// 
// Potion List Logic
//////////////////////////////////////////////////// 
// DOM
const $btnAddPotion = document.querySelector('#addPotion');
const $addPotionCamp = document.querySelector('#addPotionCamp');


const potionItems = document.querySelectorAll('.potionItem');

potionItems.forEach(item => {
  const button = item.querySelector('.potionActions button');
  const span = item.querySelector('.potionName span');
  const input = item.querySelector('.potionActions intput[type="number"]');


});


//   |
//   |
//   |
//    Event Listener
$btnAddPotion.addEventListener('click', (e) => {
  agregarPotion($addPotionCamp.value);
  savePlayer(userCharacter);
  $addPotionCamp.value = '';
});



//   |
//   |
//   |
//   |
//    Functions
function agregarPotion(nombrePotion) {
  crearNewPotion(nombrePotion);
}
const crearNewPotion = (nombrePotion) => {

  const newPotion = document.createElement('li');
  newPotion.classList.add('potionItem');

  const newPotionName = document.createElement('p');
  newPotionName.classList.add('potionName');
  newPotionName.textContent = nombrePotion;

  const newPotionInputDivs = document.createElement('div');
  newPotionInputDivs.classList.add('potionActions');

  const newPotionCantidad = document.createElement('input');
  newPotionCantidad.type = 'number';
  newPotionCantidad.value = '1';
  newPotionCantidad.classList.add('potions');
  const newPotionButtonUse = document.createElement('button');
  newPotionButtonUse.textContent = 'use';
  newPotionButtonUse.classList.add('actionUse');
  
  newPotion.appendChild(newPotionName);
  newPotion.appendChild(newPotionInputDivs);

  newPotionInputDivs.appendChild(newPotionCantidad);
  newPotionInputDivs.appendChild(newPotionButtonUse);
  
  const newPotionListElement = document.querySelector('#listaDePotions');
  newPotionListElement.appendChild(newPotion);
}
function checkingPotionState() {
  console.log('cheking potion content');

  let potionContent = 'Full';
  let potionStatus = True;
  // True == Full
  // False == Half
  // Null == Empty (no potion)

  if (potionStatus == True) {
    console.log('bebiendo');
    potionStatus = False;
    potionContent = 'Half'
  } else {
    console.log('removiendo poción');
};
};
function usePotion() {
  console.log('bebiendo poción');
};

////////////////////////////////////////////////////
// New Encounter Logic
//////////////////////////////////////////////////// 
// DOM
const $btnAddEncounter = document.querySelector('#btnAddEncounter');
//   |
//   |
//   |
//    Event Listener
$btnAddEncounter.addEventListener('click', (e) => {
  agregarEncuentro();
  savePlayer(userCharacter);
});
//   |
//   |
//   |
//   |
//    Functions
function agregarEncuentro() {
  createNewEncounterBlock();
}

function createNewEncounterBlock(){
  console.log('pelea contra rata')

  const newEncounterBlock = document.createElement('div');
  newEncounterBlock.classList.add('contenedor');
  newEncounterBlock.classList.add('encountersBlock');

  const newEncounterTitle = document.createElement('p');
  newEncounterTitle.classList.add('containerTitle');
  newEncounterTitle.textContent = 'Enemy';

  const newEncounterInputDiv = document.createElement('div');
  newEncounterInputDiv.classList.add('enconutersStats');

  const newEncounterSkill = document.createElement('p');
  newEncounterSkill.textContent = 'Skill';

  const newEncounterSkillInput = document.createElement('input');
  newEncounterSkillInput.type = 'number';
  newEncounterSkillInput.value = '0';
  newEncounterSkillInput.classList.add('marcador');
  newEncounterSkillInput.classList.add('statsInput');

  const newEncounterStamina = document.createElement('p');
  newEncounterStamina.textContent = 'Stamina';

  const newEncounterStaminaInput = document.createElement('input');
  newEncounterStaminaInput.type = 'number';
  newEncounterStaminaInput.value = '0';
  newEncounterStaminaInput.classList.add('marcador');
  newEncounterStaminaInput.classList.add('statsInput');

  newEncounterInputDiv.appendChild(newEncounterSkill);
  newEncounterInputDiv.appendChild(newEncounterSkillInput);
  newEncounterInputDiv.appendChild(newEncounterStamina);
  newEncounterInputDiv.appendChild(newEncounterStaminaInput);

  newEncounterBlock.appendChild(newEncounterTitle);
  newEncounterBlock.appendChild(newEncounterInputDiv);

  const itemList = document.getElementById('listaDeEncuentros');

  const newEncounterBlockElement = document.querySelector('#listaDeEncuentros');
  itemList.insertBefore(newEncounterBlock, itemList.secondChild );
};


////////////////////////////////////////////////////
// Calling STATS saves
//////////////////////////////////////////////////// 

const statsSkills = document.querySelector('#statsSkills');
const statsStamina = document.querySelector('#statsStamina');
const statsLuck = document.querySelector('#statsLuck');

statsSkills.addEventListener('change', (e) =>{
userCharacter.skills = statsSkills.value
  savePlayer(userCharacter);
});

statsStamina.addEventListener('change', (e) =>{
  userCharacter.stamina = statsStamina.value
    savePlayer(userCharacter);
});

statsLuck.addEventListener('change', (e) =>{
  userCharacter.luck = statsLuck.value
    savePlayer(userCharacter);
});