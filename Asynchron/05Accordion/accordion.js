function solution() {

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(body => body.json())
        .then(result => {
            const main = document.getElementById('main');
            result.forEach(element => {
                let id = element._id;
                const divAccordion = document.createElement('div');
                divAccordion.setAttribute('class', 'accordion');

                const divHead = document.createElement('div');
                divHead.setAttribute('class', 'head');

                const divExtra = document.createElement('div');
                divExtra.setAttribute('class', 'extra');

                const span = document.createElement('span');
                span.textContent = `${element.title}`;
                const button = document.createElement('button');
                button.classList.add('button')
                button.setAttribute('id', `${id}`)
                button.textContent = 'More';
                button.addEventListener('click', moreLess)
                const p = document.createElement('p');
                p.textContent = `${element.title} .....`;

                divHead.appendChild(span);
                divHead.appendChild(button);

                divExtra.appendChild(p);

                divAccordion.appendChild(divHead);
                divAccordion.appendChild(divExtra);

                main.appendChild(divAccordion);
            });
        })

    function moreLess(e) {

        const id = e.target.getAttribute('id');
        const parentDiv = e.target.parentElement.parentElement;
        const divToShow = parentDiv.querySelector('.extra');
        const pToShow = divToShow.children[0];
        const button = e.target;

        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
            .then(body => body.json())
            .then(result => {
                if (button.textContent === 'More') {
                    pToShow.textContent = result.content;
                    divToShow.style.display = 'block'
                    button.textContent = 'Less'
                
                }else{
                    divToShow.style.display = 'none'
                    button.textContent = 'More'
                }

            })

    }

   
}

solution()

