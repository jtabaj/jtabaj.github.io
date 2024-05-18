function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var word = document.getElementById(data);
    event.target.appendChild(word);
}

document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        word.setAttribute('id', 'word' + index);
        word.setAttribute('draggable', true);
        word.addEventListener('dragstart', drag);
    });

    const groups = document.querySelectorAll('.group');
    groups.forEach(group => {
        group.addEventListener('drop', drop);
        group.addEventListener('dragover', allowDrop);
    });
});
