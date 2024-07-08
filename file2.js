function increaseCollectTime() {
    mines.forEach(mine => {
        mine.timeToCollect *= 10;
    });
}

// Create a button element in the HTML for increasing collect time
const increaseCollectTimeButton = document.createElement('button');
increaseCollectTimeButton.textContent = 'Increase Collect Time x10';
increaseCollectTimeButton.addEventListener('click', () => {
    increaseCollectTime();
});

// Append the button to the body of the HTML document
document.body.appendChild(increaseCollectTimeButton);
