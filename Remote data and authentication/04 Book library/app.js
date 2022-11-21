document.getElementById('loadBooks').addEventListener('click', loadBooks);
document.getElementById('btn').addEventListener('click', submitNew)

async function loadBooks(e) {

    const response = await fetch(`http://localhost:3030/jsonstore/collections/books`);
    const result = await response.json();
    const data = Object.values(result)
    creatHTMLElement(data)

}

async function submitNew(e) {
    e.preventDefault();

    const title = document.querySelector('[name="title"]').value;
    const author = document.querySelector('[name="author"]').value;

    const response = await fetch(`http://localhost:3030/jsonstore/collections/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({
            author: author,
            title: title
        }
        )
    })

    loadBooks()

}

function creatHTMLElement(data) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    tbody.textContent = '';

    data.forEach(element => {
        if (element._id !== undefined) {
            const tr = document.createElement('tr');
            tr.setAttribute('id', element._id)
            const td1 = document.createElement('td');
            td1.textContent = element.title;
            const td2 = document.createElement('td');
            td2.textContent = element.author;
            const td3 = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', getDataForEdit)
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', dellElement)
            td3.appendChild(editBtn);
            td3.appendChild(deleteBtn);

            tr.appendChild(td1)
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr)

        }

    });

    function getDataForEdit(e) {
        e.preventDefault();
        const title = document.querySelector('[name="title"]');
        const author = document.querySelector('[name="author"]');
        const form = document.querySelector('h3')
        form.textContent = 'Edit Form'
        const target = e.target.parentElement.parentElement;
        const id = target.getAttribute('id')
        title.value = target.children[0].textContent;
        author.value = target.children[1].textContent;
        const btn = document.getElementById('btn')
        btn.textContent = 'Save'
        btn.addEventListener('click', editElement(id, e))

    }

    async function editElement(id, e) {
        e.preventDefault();
        const title = document.querySelector('[name="title"]').value;
        const author = document.querySelector('[name="author"]').value;
        const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                author,
                title
            })
        })

        const btn = document.getElementById('btn')
        btn.addEventListener('click', edtiForm)
 
    }

    function edtiForm(e){
        e.preventDefault();
        const btn = document.getElementById('btn')
        btn.textContent = 'Submit'
        const form = document.querySelector('h3')
        form.textContent = 'Form'
    }

    async function dellElement(e) {
        e.preventDefault();
        const target = e.target.parentElement.parentElement;
        const id = target.getAttribute('id')
        const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: 'DELETE',

        })
        loadBooks();

    }

}