(function () {

    window.addEventListener("DOMContentLoaded", () => {

        if (document.getElementById("planeCursor")) return;

        const plane = document.createElement("div");
        plane.id = "planeCursor";
        plane.textContent = "✈";
        document.body.appendChild(plane);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let posX = mouseX;
        let posY = mouseY;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {

            posX += (mouseX - posX) * 0.15;
            posY += (mouseY - posY) * 0.15;

            const dx = mouseX - posX;
            const dy = mouseY - posY;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            plane.style.left = posX + "px";
            plane.style.top = posY + "px";
            plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

            requestAnimationFrame(animate);
        }

        animate();

    });

})();