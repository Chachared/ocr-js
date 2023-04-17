const fileSelector = document.querySelector('input');
const start = document.querySelector('button');
const img = document.querySelector('img');
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');


// afficher l'image uploadée
fileSelector.onchange = () => {
    var file = fileSelector.files[0];
    var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }));
    img.src = imgUrl
}

//reconnaissance du texte
start.onclick = () => {
    textarea.innerHTML = ''
    const rec = new Tesseract.TesseractWorker();
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {
            if (response.status == 'recognizing text') {
                progress.innerHTML = response.status + '   ' + response.progress
            } else {
                progress.innerHTML = response.status
            }
        })
        .then(function (data) {
            textarea.innerHTML = data.text;
            progress.innerHTML = "Done";
            var convertedText = data.text;
            //première ligne du fichier
            var txt = 'Données récupérées:\n';

            //ajoute la date récupérée à la suite du fichier
            txt += convertedText;
            txt += "\n";
            
            document.write(txt);

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(txt);
            hiddenElement.target = '_blank';

            //chaoix du nom du fichier créé
            hiddenElement.download = 'test-ocr.txt';
            hiddenElement.click();
        })

}


///faire un fichier csv et parser les données pour automatisation de la prod du csv
///ameliorer l'affichage en evitant l'affichage des données sur une nouvelle page






