function solve() {
    let buttonDepart = document.getElementById('depart');
    buttonDepart.addEventListener('click', depart);

    let buttonArrive = document.getElementById('arrive');
    buttonArrive.addEventListener('click', arrive);

    let nextStop = 'depot';
    let currentStop = document.getElementById('info');

    function depart() {
        if (currentStop.getAttribute('data-next-stop') !== null) {
            nextStop = currentStop.getAttribute('data-next-stop')
        }

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStop}`)
            .then(body => body.json())
            .then(result => {
                currentStop.setAttribute('stop-name', `${result.name}`)
                currentStop.setAttribute('data-next-stop', `${result.next}`)
                currentStop.textContent = `Next stop ${result.name}`;
                console.log(result)
            })

        buttonDepart.disabled = true;
        buttonArrive.disabled = false;
    }

    function arrive() {
        let thisStop = currentStop.getAttribute('stop-name')
        currentStop.textContent = `Arriving at ${thisStop}`;
        buttonDepart.disabled = false;
        buttonArrive.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();