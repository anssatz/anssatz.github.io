document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#mark-i-model');
    const heroSection = document.querySelector('#mark-i-hero');

    if (!modelViewer || !heroSection) return;

    const startTheta = 0;
    const endTheta = 360;
    const phi = 82.5;
    const desktopRadius = '65m';
    const mobileRadius = '85m';
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    let ticking = false;

    function getRadius() {
        return mobileQuery.matches ? mobileRadius : desktopRadius;
    }

    function updateCameraOrbit() {
        const rect = heroSection.getBoundingClientRect();
        const pinnedScrollDistance = rect.height - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / pinnedScrollDistance, 0), 1);
        const theta = startTheta + (endTheta - startTheta) * progress;
        modelViewer.cameraOrbit = `${theta}deg ${phi}deg ${getRadius()}`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateCameraOrbit);
            ticking = true;
        }
    }, { passive: true });

    mobileQuery.addEventListener('change', updateCameraOrbit);

    updateCameraOrbit();
});
