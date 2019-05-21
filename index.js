const apiUrl = "https://swapi.co/api"
let peopleEndpoint = `${apiUrl}/people/?page=1`;
let peopleList = [];
let count = 0;

async function fetchPeople() {
  while(peopleEndpoint !== null){
    const response = await fetch(peopleEndpoint); //response promise
    const data = await response.json();
    count = data.count;
    peopleList.push(...(data.results));
    peopleEndpoint = data.next;
  }
  
  peopleList.forEach((person, id) => {
    const item = document.createElement('li');
    const span = document.createElement('span');
    span.dataset.id = id;
    span.innerText = person.name;
    item.appendChild(span)
    ulPeople.appendChild(item);
  });
  
  // return peopleList
}

fetchPeople();

// Targets
const ulPeople = document.getElementById('people-list');
const personalInfoBody = document.querySelector('#info-div tbody');

// Events
ulPeople.addEventListener('click', changeLiStyle);
ulPeople.addEventListener('click', showInfo);

function changeLiStyle(evt) {
  const target = evt.target;
  if(target.tagName === 'SPAN'){
    Array.from(target.parentNode.parentNode.children).forEach(li => li.removeAttribute('class'))
    target.parentNode.classList.add('selected');
  }
}

function showInfo(evt) {
  const target = evt.target;
  if(target.tagName === 'SPAN'){
    
    Array.from(personalInfoBody.children).forEach(tBodyChild => tBodyChild.remove(tBodyChild))
    const index = target.dataset.id;
    const person = peopleList[index];
    
    for(prop in person){
      const tr = document.createElement('tr');
      const tdL = document.createElement('td');
      const tdR = document.createElement('td');
      tdL.innerText = prop;
      if(Array.isArray(person[prop])){
        tdR.innerText = person[prop].join('\n');
      } else {
        tdR.innerText = person[prop];
      }
      tr.appendChild(tdL);
      tr.appendChild(tdR);
      personalInfoBody.appendChild(tr);
    }
  }
}