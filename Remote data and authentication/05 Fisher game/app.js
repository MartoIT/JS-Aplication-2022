function onload() {
    if (sessionStorage.length <= 1) {
        document.getElementById('register-view').style.display = 'none';
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('catches').style.display = 'none';
        document.getElementById('home-view').style.display = 'none';

    }
    document.getElementById('login').addEventListener('click', loginView);
    document.getElementById('register').addEventListener('click', registerView);
    document.getElementById('logout').addEventListener('click', logout)


}
function homePageLogout() {
    e.preventDefault();
    sessionStorage.clear();
    
    const main = document.querySelector('main');
    main.textContent = '';

    document.getElementById('login').style.display = 'block';
    document.getElementById('register').style.display = 'block';

}
function homePage(user) {

    const main = document.querySelector('main');
    main.textContent = '';
    const homeView = document.getElementById('home-view');
    homeView.style.display = 'block';
    const addNewCatchBtn = homeView.querySelector('.add');
    addNewCatchBtn.disabled = false;
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    const currentUserParent = document.querySelector('.email');
    const currentUser = currentUserParent.querySelector('span');
    currentUser.textContent = user;
    main.appendChild(homeView);
    const btn = main.querySelector('.load');
    btn.addEventListener('click', load);
    addNewCatchBtn.addEventListener('click', newCatch)

}

async function load(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:3030/data/catches/`);
    const result = await response.json();
    const main = document.querySelector('main');
    const fieldset = document.querySelector('fieldset');
    fieldset.appendChild(createHTM(result))
    const divCatches = document.getElementById('catches');
    divCatches.style.display = 'block'
}

async function newCatch(e) {
    e.preventDefault(e);
    const formData = new FormData(document.getElementById('addForm'));
    const angler = formData.get('angler');
    const weight = formData.get('weight');
    const species = formData.get('species');
    const location = formData.get('location');
    const bait = formData.get('bait');
    const captureTime = formData.get('captureTime');
    const token = sessionStorage.getItem('ownerId');

    if (angler !== '' && weight !== null && species !== '' && location !== '' && bait !== '' && captureTime !== null) {
        const obj = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        }

        const response = await fetch(`http://localhost:3030/data/catches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json',
                'X-Authorization': token
            },
            body: JSON.stringify(obj)
        })
        const result = await response.json();
        const newData = [];
        newData.push(result)
        const fieldset = document.querySelector('fieldset');
        fieldset.appendChild(createHTM(newData));
        const divCatches = document.getElementById('catches');
        divCatches.style.display = 'block'

    }

}

function createHTM(data) {
    const divCatches = document.getElementById('catches');
    divCatches.textContent = '';
    const id = sessionStorage.getItem('id');
    data.forEach(element => {
        if (element._ownerId !== '') {
            const div = document.createElement('div');
            div.setAttribute('class', 'catch');

            const label1 = document.createElement('lable');
            label1.textContent = 'Angler';
            const input1 = document.createElement('input');
            input1.type = 'text';
            input1.disabled = true;
            input1.setAttribute('class', 'angler');
            input1.value = element.angler;

            const label2 = document.createElement('lable');
            label2.textContent = 'Weight';
            const input2 = document.createElement('input');
            input2.type = 'text';
            input2.disabled = true;
            input2.setAttribute('class', 'weight');
            input2.value = element.weight;

            const label3 = document.createElement('lable');
            label3.textContent = 'Species';
            const input3 = document.createElement('input');
            input3.type = 'text';
            input3.disabled = true;
            input3.setAttribute('class', 'species');
            input3.value = element.species;

            const label4 = document.createElement('lable');
            label4.textContent = 'Location';
            const input4 = document.createElement('input');
            input4.type = 'text';
            input4.disabled = true;
            input4.setAttribute('class', 'location');
            input4.value = element.location;

            const label5 = document.createElement('lable');
            label5.textContent = 'Bait';
            const input5 = document.createElement('input');
            input5.type = 'text';
            input5.disabled = true;
            input5.setAttribute('class', 'bait');
            input5.value = element.bait;

            const label6 = document.createElement('lable');
            label6.textContent = 'Capture Time';
            const input6 = document.createElement('input');
            input6.type = 'number';
            input6.disabled = true;
            input6.setAttribute('class', 'captureTime');
            input6.value = element.captureTime;

            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.setAttribute('class', 'update');
            updateBtn.setAttribute('data-id', element._id);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('class', 'delete');
            deleteBtn.setAttribute('data-id', element._id);

            if (id !== element._ownerId) {
                updateBtn.disabled = true
                deleteBtn.disabled = true
            }

            div.appendChild(label1);
            div.appendChild(input1);
            div.appendChild(label2);
            div.appendChild(input2);
            div.appendChild(label3);
            div.appendChild(input3);
            div.appendChild(label4);
            div.appendChild(input4);
            div.appendChild(label5);
            div.appendChild(input5);
            div.appendChild(label6);
            div.appendChild(input6);
            div.appendChild(updateBtn);
            div.appendChild(deleteBtn);
            divCatches.appendChild(div);
        }

    });

    return divCatches;

}

function loginView(e) {
    e.preventDefault();
    const main = document.querySelector('main');
    const loginView = document.getElementById('login-view');
    main.appendChild(loginView)
    loginView.style.display = 'block';
    document.getElementById('home-view').style.display = 'none';
    const loginBtn = main.querySelector('button');
    loginBtn.addEventListener('click', login)

}

async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target.parentElement)
    const email = formData.get('email');
    const password = formData.get('password');
    const data = {
        email,
        password
    }
    try {

        const response = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok === false) {
            const err = await response.json();
            throw new Error(err.message);

        }

        const result = await response.json();
        sessionStorage.setItem('id', result._id)
        sessionStorage.setItem('ownerId', result.accessToken)
        const curren = result.email
        homePage(curren)


    } catch (error) {
        alert(error.message)
    }

}

function registerView(e) {
    e.preventDefault();
    const main = document.querySelector('main');
    const registerView = document.getElementById('register-view');
    main.appendChild(registerView)
    registerView.style.display = 'block';
    document.getElementById('home-view').style.display = 'none';
    const regBtn = main.querySelector('button');
    regBtn.addEventListener('click', register)
}

async function register(e) {
    e.preventDefault();
    const formData = new FormData(e.target.parentElement)
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');
    const data = {
        email,
        password,
        rePass
    }
    try {

        const response = await fetch(`http://localhost:3030/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok === false) {
            const err = await response.json();
            throw new Error(err.message);

        }

        const result = await response.json();
        sessionStorage.setItem('id', result._id)
        sessionStorage.setItem('ownerId', result.accessToken);
        const curren = result.email
        homePage(curren)


    } catch (error) {
        alert(error.message)
    }
}

async function logout(e) {
    e.preventDefault();
    console.log('Tuk')
    const token = sessionStorage.getItem('ownerId');

    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    })
    
    homePageLogout(e);
}


onload();