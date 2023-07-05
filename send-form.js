
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const surname = document.querySelector('#surname');
    const address = document.querySelector('#address');
    const delo = document.querySelector('#delo');
    const title = document.querySelector('#title');
    const law = document.querySelector('#law');
    const file = document.querySelector('#file');

    const formData = new FormData();

    formData.append("surname", surname.value);
    formData.append("address", address.value);
    formData.append("delo", delo.value);
    formData.append("title", title.value);
    formData.append("law", law.value);
    formData.append("fileName", file.files[0].name);
    // Appends value of text input
    // for(let i =0; i < files.files.length; i++) {
    formData.append("files", file.files[0]);
    // }
    // Appends value(s) of file input
    // Post data to Node and Express server:
    fetch('http://localhost:3002/mistakes', {
        method: 'POST',
        body: formData, // Payload is formData object
    });
    // .then(res => res.json())
    // .then(data => console.log(data));
});