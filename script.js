const fileSelector = document.querySelector('input[name="avatar"]');
const brandSelector = document.querySelector('input[name="brand"]');
const nameSelector = document.querySelector('input[name="name"]');
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
    rec.recognize(fileSelector.files[0], 'fra')
        .progress(function (response) {
            if (response.status == 'recognizing text') {
                progress.innerHTML = response.status + '   ' + response.progress
            } else {
                progress.innerHTML = response.status
            }
        })
        .then(function (data) {
            textarea.innerHTML = data.text;
            progress.innerHTML = "OCR de l'image terminée";
            var convertedText = data.text;
            const lines = convertedText.split('\n');

            //première ligne du fichier
            var csv = 'marque, modèle, années de production, converti par\n';

            //récupérer la marque et le nom saisis par l'utilisateur
            var brand = brandSelector.value;
            var addedBy = nameSelector.value;

            //ajoute la data récupérée à la suite du fichier
            for (const line of lines) {
                const words = line.split(' ')
                const years = words.splice(-1, 1)
                const model = words.join(' ')
                console.log(model, years)
                csv += brand;
                csv += ",";
                csv += model;
                csv += ",";
                csv += years;
                csv += ",";
                csv += addedBy;
                csv += "\n";
            }


            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';

            //choix du nom du fichier créé
            hiddenElement.download = 'test-ocr.csv';
            hiddenElement.click();
        })
}

///produire un csv unique (rajouter un if csv is true -> add, else -> create)






