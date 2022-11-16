function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadPhoneBook);
    const btnCreate = document.getElementById('btnCreate').addEventListener('click', createElement)

}

async function loadPhoneBook(){
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook`);
    const data = await response.json();
    const allPhoneNumbers = Object.values(data)
    listOfPhones(allPhoneNumbers)
    
}

async function listOfPhones(allPhoneNumbers) {
    const ul = document.getElementById('phonebook');
    ul.textContent = '';
    
    const phone = allPhoneNumbers.map(phone => {
        const li = document.createElement('li');
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete'
        delBtn.addEventListener('click', deleteContact)
        li.textContent = `${phone.person}: ${phone.phone}`
        li.appendChild(delBtn);
        li.setAttribute('id', phone._id);
        ul.appendChild(li);
    })
}

async function createElement(e){
    e.preventDefault();
    const personName = document.getElementById('person').value;
    const personPhone = document.getElementById('phone').value;
    const newPerson = {
        person: personName,
        phone: personPhone
    }
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook`, {
        method: 'POST',
        headers:{
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(newPerson)
    });

    const result = await response.json();
    console.log(result)

    loadPhoneBook()

    

}

async function deleteContact(e){

    const target = e.target.parentElement;
    const id = target.getAttribute('id')
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'aplication/json'
        }
    })

    loadPhoneBook()
    

}


// http://localhost:3030/jsonstore/phonebook
attachEvents();