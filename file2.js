const reduceCollectTimeButton = document.createElement('button');
reduceCollectTimeButton.textContent = 'Reduce Collect Time x10';
reduceCollectTimeButton.addEventListener('click', () => {
    mines.forEach(mine => {
        mine.timeToCollect /= 10;
    });
});

document.body.appendChild(reduceCollectTimeButton);
