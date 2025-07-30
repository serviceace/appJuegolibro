// OBJETO DE PERSONAJE

let appState = {
  stats: {
    skills: 5,
    stamina: 5,
    luck: 5
  },
  items: [],
  potions: [],
  encounters: [],
  treasures : {
    gold: 0,
    jewels: 0,
    provisions: 0
  }

};

// FUNCIONES DE GUARDADO

function saveAppState() {
  const spinner = document.getElementById('saveSpinner');
  if (spinner) {
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.add('hidden');
    }, 1000);
  }

  localStorage.setItem('appState', JSON.stringify(appState));
}

document.getElementById('saveBtn').addEventListener('click', () => {
  saveAppState();
});

function loadAppState() {
  const data = localStorage.getItem('appState');
  if (data) {
    appState = JSON.parse(data);

     if (!appState.stats) {
      appState.stats = {
        skills: 5,
        stamina: 5,
        luck: 5
      };
    }

    if (!appState.treasures) {
      appState.treasures  = {
        gold: 0,
        jewels: 0,
        provisions: 0
      };
  }
}

function loadStatsFromState() {
  document.getElementById('statsSkills').value = appState.stats.skills;
  document.getElementById('statsStamina').value = appState.stats.stamina;
  document.getElementById('statsLuck').value = appState.stats.luck;
}

  renderItems();
  renderPotions();
  renderEncounters();
  loadStatsFromState();
  loadTreasuresFromState();
} 

// FUNCION RENDER DE CADA ITEMS

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');

function renderItems() {
  itemList.innerHTML = ''; // Limpia la lista
  
  appState.items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between p-2 bg-zinc-700 rounded';
    li.innerHTML = `
      <span>${item}</span>
      <button class="text-red-600 hover:underline">Toss</button>
    `;
    itemList.appendChild(li);
  });
};

// EVENT LISTENER

// botón add
addItemBtn.addEventListener('click', () => {
  const itemName = itemInput.value.trim();
  if (itemName) {
    appState.items.push(itemName);
    saveAppState();
    renderItems();
    itemInput.value = '';
  };

});


// botón toss
itemList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Toss') {
    const li = event.target.closest('li');
    const itemName = li.querySelector('span').textContent;
    appState.items = appState.items.filter(item => item !== itemName);
    saveAppState();
    li.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
    setTimeout(() => li.remove(), 300);
  }
});

////////////////////////////////  LOGICA DE LOS DADOS  //////////////////////////////////////

const rollBtn = document.getElementById('rollDice');
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');

    function rollDice() {
      const value1 = Math.floor(Math.random() * 6) + 1;
      const value2 = Math.floor(Math.random() * 6) + 1;

      dice1.textContent = value1;
      dice2.textContent = value2;

      [dice1, dice2].forEach(die => {
        die.classList.add('animate-ping');
        setTimeout(() => die.classList.remove('animate-ping'), 300);
      });
    }
    rollBtn.addEventListener('click', rollDice);

////////////////////////////////  LOGICA DE ITEMS  //////////////////////////////////////





////////////////////////////////  LOGICA DE POTIONS  //////////////////////////////////////
const potionInput = document.getElementById('potionInput');
const addPotionBtn = document.getElementById('addPotionBtn');
const potionList = document.getElementById('potionList');

function renderPotions() {
  potionList.innerHTML = '';

  appState.potions.forEach((potion, index) => {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-zinc-700 p-2 rounded";

    li.innerHTML = `
      <span>${potion}</span>
      <button class="text-blue-600 hover:underline">Use</button>
    `;

    potionList.appendChild(li);
  });
};

addPotionBtn.addEventListener('click', () => {
  const potionName = potionInput.value.trim();
  if (potionName) {
    appState.potions.push(potionName);
    saveAppState();
    renderPotions();
    potionInput.value = '';
  }
});

potionList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Use') {
    const li = event.target.closest('li');
    const potionName = li.querySelector('span').textContent;

    appState.potions = appState.potions.filter(p => p !== potionName);
    saveAppState();

    li.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
    setTimeout(() => li.remove(), 300);
  }
});




// LOGICA DE ENCUENTROS
const encounterList = document.getElementById('encounterList');
const addEncounterBtn = document.getElementById('addEncounterBtn');

function renderEncounters () {
encounterList.innerHTML = '';

  const addBtn = document.createElement('div');
  addBtn.id = 'addEncounterBtn';
  addBtn.className = "cursor-pointer bg-yellow-500 text-black p-2 rounded shadow w-[140px] flex flex-col items-center justify-center hover:bg-yellow-600 transition";
  addBtn.innerHTML = `
    <span class="font-bold">Agregar</span>
    <span class="font-bold">Encuentro</span>
    <span class="text-xl">+</span>
  `;

  addBtn.addEventListener('click', () => {
  appState.encounters.push({ skill: 0, stamina: 0 });
  saveAppState();
  renderEncounters();
});

  encounterList.appendChild(addBtn);


  appState.encounters.forEach((encounter, index) => {
    const card = document.createElement('div');
    card.className = 'bg-neutral-800 border border-gray-500 text-white p-2 rounded shadow w-[140px] flex flex-col gap-2 items-center';

    const title = document.createElement('h4');
    title.className = "font-bold text-sm";
    title.textContent = `Enemy ${index + 1}`;

    const skillInput = document.createElement('input');
    skillInput.type = 'number';
    skillInput.value = encounter.skill;
    skillInput.className = "w-14 text-center border rounded px-1 bg-neutral-700 text-white placeholder-gray-300";
    
    skillInput.addEventListener('change', () => {
      appState.encounters[index].skill = parseInt(skillInput.value) || 0; 
      saveAppState();
    });

    const staminaInput = document.createElement('input');
    staminaInput.type = 'number';
    staminaInput.value = encounter.stamina;
    staminaInput.className = "w-14 text-center border rounded px-1 bg-neutral-700 text-white placeholder-gray-300";

    staminaInput.addEventListener('change', () => {
      appState.encounters[index].stamina = parseInt(staminaInput.value) || 0;
      saveAppState();
    });

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.className = "text-red-600 text-xs hover:underline";

    btnDelete.addEventListener('click', () => {
      appState.encounters.splice(index, 1);  
      saveAppState();
      renderEncounters();
    });

    card.appendChild(title);
    card.appendChild(skillInput);
    card.appendChild(staminaInput);
    card.appendChild(btnDelete);
    encounterList.appendChild(card);
  });
};


/* 
  newCard.className = "w-48 p-3 bg-zinc-700 rounded-lg border border-gray-400";

  newCard.innerHTML = `
    <h3 class="text-center font-bold mb-2">Enemy</h3>
    <label class="block text-xs mb-1">Skill</label>
    <input type="number" class="w-full bg-zinc-800 text-white text-center rounded mb-2" />
    <label class="block text-xs mb-1">Stamina</label>
    <input type="number" class="w-full bg-zinc-800 text-white text-center rounded" />
  `;

 */
////////////////////////////////  LOGICA DE TESURES  //////////////////////////////////////
const goldInput = document.getElementById('goldInput');
const jewelsInput = document.getElementById('jewelsInput');
const provisionsContainer = document.getElementById('provisionsCheckboxes');

function loadTreasuresFromState() {
  if (!appState.treasures) return;

  goldInput.value = appState.treasures.gold ?? 0;
  jewelsInput.value = appState.treasures.jewels ?? 0;

  provisionsContainer.innerHTML = '';
  for (let i = 0; i< 10; i++ ) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "w-4 h-4 accent-green-600";
    checkbox.checked = i < appState.treasures.provisions;
    checkbox.addEventListener('change', updateProvisionsCount);
    provisionsContainer.appendChild(checkbox);
  };
};

goldInput.addEventListener('input', () => {
  appState.treasures.gold = parseInt(goldInput.value) || 0;
  saveAppState();
});
jewelsInput.addEventListener('input', () => {
  appState.treasures.jewels = parseInt(jewelsInput.value) || 0;
  saveAppState();
});

function updateProvisionsCount() {
  const allCheckboxes = provisionsContainer.querySelectorAll('input[type="checkbox"]');
  let checkedCount = 0;
  allCheckboxes.forEach(chk => {
    if (chk.checked) checkedCount++;
  });
  appState.treasures.provisions = checkedCount;
  saveAppState();
};



//////////////  INICIALIZACION /////////////////////

loadAppState();
renderItems();
renderPotions();
renderEncounters();
loadTreasuresFromState();


document.getElementById('statsSkills').addEventListener('input', (e) => {
  appState.stats.skills = parseInt(e.target.value) || 0;
  saveAppState();
});

document.getElementById('statsStamina').addEventListener('input', (e) => {
  appState.stats.stamina = parseInt(e.target.value) || 0;
  saveAppState();
});

document.getElementById('statsLuck').addEventListener('input', (e) => {
  appState.stats.luck = parseInt(e.target.value) || 0;
  saveAppState();
});

// Botón SAVE manual
const saveBtn = document.getElementById('saveBtn');
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    saveAppState();
  });
}


