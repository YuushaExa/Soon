// Create a button element in the HTML for reducing collect time
const reduceCollectTimeButton = document.createElement('button');
reduceCollectTimeButton.textContent = 'Reduce Collect Time x10';
reduceCollectTimeButton.addEventListener('click', () => {
    mines.forEach(mine => {
        mine.timeToCollect /= 10;
    });
});

// Append the button to the body of the HTML document
document.body.appendChild(reduceCollectTimeButton);
