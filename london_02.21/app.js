let controller;
let slideScene;
let pageScene;

function animateSlides() {
	controller = new ScrollMagic.Controller();
	const sliders = document.querySelectorAll(".slide");
	const nav = document.querySelector(".nav-header");
	sliders.forEach((slide, index, slides) => {
		const revealText = slide.querySelector(".reveal-text");
		const img = slide.querySelectorAll(".photo-cell");

		const slideTl = gsap.timeline({
			defaults: { duration: 1, ease: "power2.inOut" },
		});
		slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" });
		slideTl.fromTo(img, { scale: 0.9 }, { scale: 1 }, "-=1");
		slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

		slideScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0.25,
			reverse: false,
		});
	});
}

const burger = document.querySelector(".burger");

function navToggle(e) {
	if (!e.target.classList.contains("active")) {
		e.target.classList.add("active");
		gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "white" });
		gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "white" });
		gsap.to(".left-side", 1, { color: "white" });
		gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
		document.body.classList.add("hide");
	} else {
		e.target.classList.remove("active");
		gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
		gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
		gsap.to(".left-side", 1, { color: "white" });
		gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
		document.body.classList.remove("hide");
	}
}

const modal = document.querySelector(".modal");
const previews = document.querySelectorAll(".main-gallery img");
const original = document.querySelector(".full-img");

previews.forEach((preview) => {
	preview.addEventListener("click", () => {
		modal.classList.add("open");
		original.classList.add("open");

		const originalSrc = preview.getAttribute("data-original");
		original.src = `../img/london_02.21/${originalSrc}`;
	});
});
modal.addEventListener("click", (e) => {
	if (e.target.classList.contains("modal")) {
		modal.classList.remove("open");
		original.classList.remove("open");
	}
});

burger.addEventListener("click", navToggle);

animateSlides();
