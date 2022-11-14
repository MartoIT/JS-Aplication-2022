function attachEvents() {
    const loadPostBtn = document.getElementById('btnLoadPosts');
    loadPostBtn.addEventListener('click', loadPost);


    function loadPost() {

        const optionPost = document.getElementById('posts')
        fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(body => body.json())
            .then(result => {
                const allPost = Object.values(result);
                allPost.forEach(post => {
                    const op = document.createElement('OPTION');
                    op.setAttribute('value', `${post.id}`);
                    op.setAttribute('content', `${post.body}`);
                    const titleOfPost = document.createTextNode(`${post.title}`);
                    op.appendChild(titleOfPost);
                    optionPost.append(op)
                    //console.log(post)

                });

                const loadComent = document.getElementById('btnViewPost');
                loadComent.addEventListener('click', load)
            })


    }

    function load() {
        let allOptions = document.getElementById('posts');
        let indexOf = allOptions.selectedIndex;
        let id = allOptions.options[indexOf].value;
        let title = allOptions.options[indexOf].textContent;

        let body = allOptions.options[indexOf].getAttribute('content')
        //console.log(body)
        const p = document.getElementById('post-body');
        const h1 = document.getElementById('post-title');
        const ul = document.getElementById('post-comments')
        h1.textContent = ''
        p.textContent = ''
        console.log(id)
        h1.textContent = title
        p.textContent = body
        fetch(`http://localhost:3030/jsonstore/blog/comments/`)
            .then(body => body.json())
            .then(result2 => {
                let arrayOfComents = Object.values(result2);
                arrayOfComents.forEach(element => {
                    console.log(element)
                    if (element.postId === id) {
                        const li = document.createElement('li');
                        li.textContent = element.text
                        ul.append(li)
                    }
                });
            })

    }
}

attachEvents();


