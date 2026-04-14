function bookFlight(route) {
    const result = document.getElementById("result");

    result.innerText = `Booking confirmed for ${route}`;

    anime({
        targets: '#result',
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });
}