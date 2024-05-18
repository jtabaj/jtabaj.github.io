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
    event.target.closest('.group').querySelector('.group-words').appendChild(word);
    word.classList.remove("dragging");
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
    });
});
