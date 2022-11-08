function getInfo() {
  let url = 'http://localhost:3030/jsonstore/bus/businfo';
  let inputValue = document.getElementById('stopId');

  let div = document.getElementById('stopName');
  let ul = document.getElementById('buses');
  ul.textContent = '';

  fetch(`${url}/${inputValue.value}`)
    .then(body => body.json())
    .then(result => {
      let buses = result.buses;
      let currentName = result.name;
      div.textContent = currentName
      let allBusses = Object.entries(buses)
      allBusses.forEach(element => {
        let li = document.createElement('li');
        li.textContent = `Bus ${element[0]} arrives in ${element[1]} minutes`
        ul.appendChild(li);
      });

    })
    .catch(err => {
      div.textContent = `Error`;
    })



}