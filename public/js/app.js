console.log('client side javascript running');


const weatherForm = document.querySelector('form');
const input = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = input.value;
    fetch('http://localhost:3000/weather?address=' + search).then((response) => {
        response.json().then(data => {
            if (data.error) console.log(data.error)
            else console.log(data)
        })
    })

})