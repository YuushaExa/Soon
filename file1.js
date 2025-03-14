        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let lastTimestamp = performance.now();
        let longPressInterval;
        let longPressActive = false;

        const images = {};
        mines.forEach(mine => {
            const img = new Image();
            img.src = mine.imageSrc;
            images[mine.name] = img;
        });

        function drawText(text, x, y, color = 'white', fontSize = 20) {
            ctx.fillStyle = color;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillText(text, x, y);
        }

        function drawButton(text, x, y, width, height, isDisabled, costText, increaseText) {
            ctx.fillStyle = isDisabled ? '#555' : '#888';
            ctx.fillRect(x, y, width, height);
            drawText(text, x + 10, y + 20, 'white', 16);
            drawText(costText, x + 10, y + 40, 'white', 16);
            drawText(increaseText, x + 10, y + 60, 'white', 16);
        }

function drawProgressBar(x, y, width, height, progress) {
    const maxWidth = canvas.width - x - 10; // Adjust the padding as needed
    const barWidth = Math.min(width * progress, maxWidth);

    barWidth = Math.min(barWidth, width);

    barWidth = Math.max(barWidth, 0);

    ctx.fillStyle = '#555';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(x, y, barWidth, height);
}


        function updateUI(timestamp) {
            const deltaTime = (timestamp - lastTimestamp) / 1000;
            lastTimestamp = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawText(`Gold: ${gold}`, 20, 30);

            mines.forEach((mine) => {
                if (mine.collecting) {
                    mine.timeLeft -= deltaTime;
                    if (mine.timeLeft <= 0) {
                        const cycles = Math.floor(Math.abs(mine.timeLeft) / mine.timeToCollect) + 1;
                        mine.timeLeft += cycles * mine.timeToCollect;
                        gold += cycles * mine.goldPerCollect;
                    }
                    const progress = (mine.timeToCollect - mine.timeLeft) / mine.timeToCollect;

                    ctx.drawImage(images[mine.name], 20, mine.y - 30, 50, 50); // Draw the image above the "Level" text

                    drawText(mine.name, 200, mine.y - 10); // Mine name above progress bar
                    drawText(`Level: ${mine.level}`, 80, mine.y + 20);
                    drawText(`+${mine.goldPerCollect}`, 210, mine.y);
                    drawProgressBar(200, mine.y, 200, 20, progress);
                    drawText(`${mine.timeLeft.toFixed(1)}s`, 410, mine.y + 20);
                    const nextLevelGoldPerCollect = mine.baseGoldPerCollect * (mine.level + 1);
                    drawButton('Level Up', 460, mine.y - 35, 120, 80, gold < mine.level * 100, `Cost: ${mine.level * 100}`, `+${nextLevelGoldPerCollect}`);
                } else {
                    ctx.drawImage(images[mine.name], 20, mine.y - 30, 50, 50); // Draw the image above the "Level" text

                    drawText(mine.name, 200, mine.y - 10); // Mine name above progress bar
                    drawText(`Locked`, 80, mine.y + 20);
                    drawButton('Unlock', 460, mine.y - 35, 120, 40, gold < mine.unlockCost, `Cost: ${mine.unlockCost}`, '');
                }
            });

            requestAnimationFrame(updateUI);
        }

        function startLongPress(mine) {
            longPressActive = true;
            longPressInterval = setInterval(() => {
                if (gold >= mine.level * 100) {
                    gold -= mine.level * 100;
                    mine.level += 1;
                    mine.goldPerCollect = mine.baseGoldPerCollect * mine.level;
                } else {
                    stopLongPress();
                }
            }, 100);
        }

        function stopLongPress() {
            clearInterval(longPressInterval);
            longPressActive = false;
        }

        function unlockMine(mineIndex) {
            for (let i = 0; i <= mineIndex; i++) {
                if (!mines[i].unlocked && gold >= mines[i].unlockCost) {
                    gold -= mines[i].unlockCost;
                    mines[i].unlocked = true;
                    mines[i].collecting = true;
                }
            }
        }

        canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            mines.forEach((mine, index) => {
                if (x >= 460 && x <= 580 && y >= mine.y - 35 && y <= mine.y + 45) {
                    if (mine.unlocked) {
                        if (gold >= mine.level * 100) {
                            startLongPress(mine);
                        }
                    } else {
                        unlockMine(index);
                    }
                }
            });
        });

        canvas.addEventListener('mouseup', () => {
            stopLongPress();
        });

        canvas.addEventListener('mouseleave', () => {
            stopLongPress();
        });

        requestAnimationFrame(updateUI);
