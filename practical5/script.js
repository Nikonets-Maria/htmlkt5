document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const dropArea = document.getElementById('dropArea');
    const fileContent = document.getElementById('fileContent');
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locationDiv = document.getElementById('location');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');


    function displayFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            fileContent.appendChild(img);
        };
        reader.readAsDataURL(file);
    }


    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        for (let file of files) {
            displayFile(file);
        }
    });


    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (let file of files) {
            displayFile(file);
        }
    });

    
    getLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                locationDiv.textContent = `Широта: ${latitude}, Долгота: ${longitude}`;
            }, (error) => {
                locationDiv.textContent = `Ошибка: ${error.message}`;
            });
        } else {
            locationDiv.textContent = 'Геолокация не поддерживается вашим браузером.';
        }
    });

});

