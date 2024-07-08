const reduceCollectTimeButton = document.createElement('button');
reduceCollectTimeButton.textContent = 'Reduce Collect Time x10';
reduceCollectTimeButton.addEventListener('click', () => {
    let index = 0;

    function reduceMineCollectTime() {
        if (index < mines.length) {
            const currentMine = mines[index];
            if (!currentMine.collecting) {
                currentMine.timeToCollect /= 10;
                index++;
            } else {
                setTimeout(reduceMineCollectTime, 1000);
            }
        }
    }

    reduceMineCollectTime();
});

document.body.appendChild(reduceCollectTimeButton);
