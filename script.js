const fileSelector = document.querySelector('input');
const start = document.querySelector('button');
const img = document.querySelector('img');
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');

// afficher l'image uploadée
fileSelector.onchange = () => {
    var file = fileSelector.files[0];
    var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg'}));
    img.src = imgUrl
}


//reconnaissance du texte
start.onclick = () => {
    textarea.innerHTML = ''
    const rec = new Tesseract.TesseractWorker();
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {
            if(response.status == 'recognizing text'){
                progress.innerHTML = response.status + '   ' + response.progress
            }else{
                progress.innerHTML = response.status
            }
        })
        .then(function (data) {
            textarea.innerHTML = data.text
            progress.innerHTML = "Done"
        })
}

