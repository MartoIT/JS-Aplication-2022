function attachEvents() {


    const submit = document.getElementById('submit');
    submit.addEventListener('click', newmessage)
    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', showAllMessages)

    


}

async function showAllMessages(){
    const textArea = document.getElementById('messages');
    // textArea.textContent = '';
    const response = await fetch(`http://localhost:3030/jsonstore/messenger`);
    const data = await response.json();
    const result = Object.values(data);
    const ulElement = document.createElement('ul');
    const coments = []
    result.forEach(element => {
        const liElement = document.createElement('li');
        
        coments.push(`${element.author}: ${element.content}`)
        

    });

    textArea.value = coments.join('\n')
    
    console.log(result);
    console.log(coments);
}

async function newmessage() {
    const author = document.querySelector('[name="author"]').value;
    const content = document.querySelector('[name="content"]').value;
    const data = {
        author,
        content
    }
    try{
        if(author === '' || content === ''){
            throw new Error('Both fields need to be fulfilled!')
        }

        const response = await fetch(`http://localhost:3030/jsonstore/messenger`,{
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
                
            },
            body: JSON.stringify(data)
        })

        if(response.ok === false ){
            const error = await response.json();
            throw new Error(error.message);
        }

        const result = await response.json();
        console.log(result)

    }catch(err){
        alert(err.message);
    }

}



attachEvents();


{/* <label for="author">Name: </label><input name="author" type="text"><br>
            <label for="content">Message: </label><input name="content" type="text">
            <input id="submit" type="button" value="Send">
            <input id="refresh" type="button" value="Refresh"></input> */}