function lockedProfile() {
    let main = document.getElementById('main');
    main.querySelector('div').remove()
    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
        .then(body => body.json())
        .then(result => {
            let profiles = Object.values(result);
            profiles.forEach(profile => {
                const div = document.createElement('div');
                div.setAttribute('class', 'profile');
                const img = document.createElement('img');
                img.setAttribute('class', 'userIcon');
                img.src = './iconProfile2.png';
                const buttonShowMore = document.createElement('button');
                buttonShowMore.textContent = 'Show more';
                buttonShowMore.addEventListener('click', moreLess)
                const lableForLock = document.createElement('lable');
                lableForLock.textContent = 'Lock';
                const inputLock = document.createElement('input');
                inputLock.type = 'radio';
                inputLock.name = `${profile.username}`;
                inputLock.value = 'lock';
                inputLock.checked = true;
                const lableForUnlock = document.createElement('lable');
                lableForUnlock.textContent = 'Unlock';
                const inputUnlock = document.createElement('input');
                inputUnlock.type = 'radio';
                inputUnlock.name = `${profile.username}`;
                inputUnlock.value = 'unlock';
                const hr1 = document.createElement('hr');
                const lableUsername = document.createElement('lable');
                lableUsername.textContent = 'Username';
                const inputUsername = document.createElement('input');
                inputUsername.type = 'text';
                inputUsername.name = `${profile.username}`;
                inputUsername.value = `${profile.username}`;
                inputUsername.disabled = true;
                const insideDiv = document.createElement('div');
                insideDiv.setAttribute('class', 'user1Username');
                const hr2 = document.createElement('hr');
                const lableEmail = document.createElement('lable');
                lableEmail.textContent = 'Email:';
                const inputForEmail = document.createElement('input');
                inputForEmail.type = 'email';
                inputForEmail.name = `${profile.email}`;
                inputForEmail.value = `${profile.email}`;
                inputForEmail.disabled = true;
                const lableAge = document.createElement('lable');
                lableAge.textContent = 'Age:';
                const inputForAge = document.createElement('input');
                inputForAge.type = 'text';
                inputForAge.name = `${profile.age}`;
                inputForAge.value = `${profile.age}`;
                inputForAge.disabled = true;
                insideDiv.style.display = 'none';

                div.appendChild(img);
                div.appendChild(lableForLock);
                div.appendChild(inputLock);
                div.appendChild(lableForUnlock);
                div.appendChild(inputUnlock);
                div.appendChild(hr1);
                div.appendChild(lableUsername);
                div.appendChild(inputUsername);
                insideDiv.appendChild(hr2);
                insideDiv.appendChild(lableEmail);
                insideDiv.appendChild(inputForEmail);
                insideDiv.appendChild(lableAge);
                insideDiv.appendChild(inputForAge);
                div.appendChild(insideDiv);
                div.appendChild(buttonShowMore);
                main.appendChild(div);

            });

        })

    function moreLess(e) {
        let current = e.target.parentElement;
        let unlockButton = current.children[4];
        let moreInformation = current.children[8];
        let button = current.children[9];
        if (unlockButton.checked == true) {
            if (moreInformation.style.display == 'none') {
                moreInformation.style.display = 'block'
                button.textContent = 'Hide it'
            } else {
                moreInformation.style.display = 'none'
                button.textContent = 'Show more'
            }

        }

    }

}


