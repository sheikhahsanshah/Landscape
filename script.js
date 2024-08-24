document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('stars-container');
    const popup = document.getElementById('popup');
    const numStars = 50;

    const moon = document.getElementById('moon');
    const moonRect = moon.getBoundingClientRect();
    const moonCenterX = moonRect.left + moonRect.width / 2;
    const moonCenterY = moonRect.top + moonRect.height / 2;

    // Predefined star types, temperatures, and distances
    const starData = [
        { type: 'Red Dwarf', temperature: '2,500°C', distance: '4.2 light years' },
        { type: 'Yellow Dwarf', temperature: '5,500°C', distance: '93 million miles' },
        { type: 'Blue Giant', temperature: '20,000°C', distance: '450 light years' },
        { type: 'White Dwarf', temperature: '25,000°C', distance: '150 light years' }
    ];

    const getRandomPosition = () => {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight * 0.66)
        };
    };

    const isOverlapping = (x, y) => {
        const distance = Math.sqrt((x - moonCenterX) ** 2 + (y - moonCenterY) ** 2);
        return distance < (moonRect.width / 2);
    };

    const adjustPopupPosition = (starRect) => {
        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;

        let x = starRect.left + (starRect.width / 2) - (popupWidth / 2);
        let y = starRect.bottom + 10;

        if (x + popupWidth > window.innerWidth) {
            x = window.innerWidth - popupWidth - 10;
        }
        if (x < 10) {
            x = 10;
        }
        if (y + popupHeight > window.innerHeight) {
            y = starRect.top - popupHeight - 10;
        }
        if (y < 10) {
            y = 10;
        }

        return { x, y };
    };

    for (let i = 0; i < numStars; i++) {
        let x, y;
        do {
            ({ x, y } = getRandomPosition());
        } while (isOverlapping(x, y));

        const star = document.createElement('div');
        star.classList.add('star');

        const starType = Math.random();
        let starClass, starSize, starInfo;
        if (starType < 0.4) {
            starClass = 'mini-star';
            starSize = 'Mini';
            starInfo = starData[0];
        } else if (starType < 0.6) {
            starClass = 'small-star';
            starSize = 'Small';
            starInfo = starData[1];
        } else if (starType < 0.9) {
            starClass = 'medium-star';
            starSize = 'Medium';
            starInfo = starData[2];
        } else {
            starClass = 'big-star';
            starSize = 'Big';
            starInfo = starData[3];
        }

        star.classList.add(starClass);
        star.dataset.size = starSize;
        star.dataset.name = `Star ${i + 1}`;
        star.dataset.type = starInfo.type;
        star.dataset.temperature = starInfo.temperature;
        star.dataset.distance = starInfo.distance;

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        star.addEventListener('mouseover', (e) => {
            const starRect = star.getBoundingClientRect();
            const { x: popupX, y: popupY } = adjustPopupPosition(starRect);

            popup.innerHTML = `
                <strong>${star.dataset.name}</strong><br>
                Type: ${star.dataset.type}<br>
                Temperature: ${star.dataset.temperature}<br>
                Distance: ${star.dataset.distance}
            `;
            popup.style.left = `${popupX}px`;
            popup.style.top = `${popupY}px`;
            popup.classList.add('show');
        });

        star.addEventListener('mouseout', () => {
            popup.classList.remove('show');
        });

        container.appendChild(star);
    }
});
