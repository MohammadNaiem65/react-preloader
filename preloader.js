import gsap from '/node_modules/gsap/all.js';

const tl = gsap.timeline({ repeat: -1 });

function initAnimation() {
    tl.fromTo(
        '#app-preloader circle',
        {
            strokeDasharray: 126,
            strokeDashoffset: 126,
            rotation: 0,
        },
        {
            strokeDashoffset: -126,
            rotation: 360,
            duration: 1.5,
            ease: 'power2.inOut',
            transformOrigin: 'center',
        }
    );
}

function removePreloader() {
    const preloader = document.getElementById('app-preloader');
    const app = document.getElementById('root');

    if (preloader && app) {
        const transitionTl = gsap.timeline();

        transitionTl
            .to(app, {
                duration: 0.5,
                opacity: 1,
                ease: 'power2.inOut',
            })
            .to(
                preloader,
                {
                    duration: 0.5,
                    opacity: 0,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        preloader.remove();
                        tl.kill();
                        transitionTl.kill();
                    },
                },
                '-=0.3'
            );
    }
}

function checkReactApp() {
    const app = document.getElementById('root');

    if (app && app.children.length > 0) {
        console.log('remove preloader');
        setTimeout(removePreloader, 100);
    } else {
        requestAnimationFrame(checkReactApp);
    }
}

function checkGSAPLoad() {
    if (gsap) {
        initAnimation();
        checkReactApp();
    } else {
        requestAnimationFrame(checkGSAPLoad);
    }
}

checkGSAPLoad();
