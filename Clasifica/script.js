function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.target.classList.add("dragging");
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var word = document.getElementById(data);
    if (event.target.classList.contains('group-words')) {
        event.target.appendChild(word);
    } else if (event.target.closest('.group')) {
        event.target.closest('.group').querySelector('.group-words').appendChild(word);
    }
    word.classList.remove("dragging");
    checkCompletion();
}

document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        word.setAttribute('id', 'word' + index);
        word.setAttribute('draggable', true);
        word.addEventListener('dragstart', drag);
        word.addEventListener('dragend', (event) => {
            event.target.classList.remove("dragging");
        });
        word.addEventListener('mousedown', (event) => {
            event.target.classList.add("dragging");
        });
        word.addEventListener('mouseup', (event) => {
            event.target.classList.remove("dragging");
        });
    });

    const groups = document.querySelectorAll('.group');
    groups.forEach(group => {
        group.addEventListener('drop', drop);
        group.addEventListener('dragover', allowDrop);

        const input = group.querySelector('input');
        input.addEventListener('input', checkCompletion);
    });

    const continueBtn = document.getElementById('continueBtn');
    continueBtn.addEventListener('click', generateSummary);
});

function checkCompletion() {
    const words = document.querySelectorAll('.word');
    const groups = document.querySelectorAll('.group');
    const continueBtn = document.getElementById('continueBtn');

    let allWordsMoved = true;
    words.forEach(word => {
        if (word.parentElement.id === 'words') {
            allWordsMoved = false;
        }
    });

    let allGroupsNamed = true;
    groups.forEach(group => {
        const input = group.querySelector('input');
        if (input.value.trim() === '') {
            allGroupsNamed = false;
        }
    });

    if (allWordsMoved && allGroupsNamed) {
        continueBtn.style.display = 'flex';
        continueBtn.disabled = false;
    } else {
        continueBtn.style.display = 'none';
        continueBtn.disabled = true;
    }
}

function generateSummary() {
    const groups = document.querySelectorAll('.group');
    const summaryContainer = document.createElement('div');
    summaryContainer.classList.add('summary');

    const titleElement = document.createElement('h3');
    titleElement.textContent = 'Grupos Armados';
    titleElement.style.textAlign = 'left';  // Asegura que el título esté alineado a la izquierda
    summaryContainer.appendChild(titleElement);

    groups.forEach(group => {
        const groupTitle = group.querySelector('input').value.trim();
        const groupWords = group.querySelectorAll('.group-words .word');

        const groupDiv = document.createElement('div');
        groupDiv.classList.add('summary-group');

        const groupTitleElement = document.createElement('h4');  // Asegura que los nombres de los grupos estén con h4
        groupTitleElement.textContent = groupTitle;
        groupDiv.appendChild(groupTitleElement);

        const wordsList = document.createElement('ul');
        groupWords.forEach(word => {
            const wordItem = document.createElement('li');
            wordItem.textContent = word.textContent;
            wordsList.appendChild(wordItem);
        });
        groupDiv.appendChild(wordsList);

        summaryContainer.appendChild(groupDiv);
    });

    const instructionsParagraph = document.createElement('p');
    instructionsParagraph.textContent = 'Memoriza los grupos con sus palabras y sin mirarlos nuevamente, transcríbelos a un papel';
    summaryContainer.appendChild(instructionsParagraph);

    document.body.appendChild(summaryContainer);

    // Ocultar la clase groups y el título de instrucciones
    document.querySelector('.groups').style.display = 'none';
    document.getElementById('instructionTitle').style.display = 'none';
    continueBtn.style.display = 'none';
}
