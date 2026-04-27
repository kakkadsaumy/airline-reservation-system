(function () {
    function initCursor() {
        if (document.getElementById("planeCursor")) return;

        const plane = document.createElement("div");
        plane.id = "planeCursor";
        plane.innerText = "✈";
        document.body.appendChild(plane);

        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let pos = { x: mouse.x, y: mouse.y };

        const radarRadius = 300;

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        function loop() {
            pos.x += (mouse.x - pos.x) * 0.15;
            pos.y += (mouse.y - pos.y) * 0.15;

            const dx = mouse.x - pos.x;
            const dy = mouse.y - pos.y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            plane.style.left = pos.x + "px";
            plane.style.top = pos.y + "px";
            plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            const dist = Math.sqrt((pos.x - cx) ** 2 + (pos.y - cy) ** 2);

            if (dist < radarRadius) {
                plane.style.color = "#00ff78";
                plane.style.textShadow = "0 0 10px #00ff78, 0 0 20px #ffff66";
            } else {
                plane.style.color = "#ffffff";
                plane.style.textShadow = "0 0 10px #ffffff";
            }

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
    }

    window.addEventListener("load", initCursor);
})();