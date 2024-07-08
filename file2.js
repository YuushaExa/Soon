function reduceCollectTime() {
    mines.forEach(mine => {
        mine.timeToCollect /= 10;
    });
}

// Create a button element in the HTML for increasing collect time
const reduceCollectTimeButton = document.createElement('button');
reduceCollectTimeButton.textContent = 'Reduce Collect Time x10';
reduceCollectTimeButton.addEventListener('click', () => {
    reduceCollectTime();
});

// Append the button to the body of the HTML document
document.body.appendChild(reduceCollectTimeButton);
