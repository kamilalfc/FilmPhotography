let controller;
let slideScene;
let pageScene;

function animateSlides() {
	controller = new ScrollMagic.Controller();
	const sliders = document.querySelectorAll(".slide");
	const nav = document.querySelector(".nav-header");

	sliders.forEach((slide, index, slides) => {
		const revealImg = slide.querySelector(".reveal-img");
		const img = slide.querySelector("img");
		const text = slide.querySelector(".intro-text");
		const desc = slide.querySelectorAll("p,h2");

		const slideTl = gsap.timeline({
			defaults: { duration: 1, ease: "power2.inOut" },
		});

		slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
		slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
		slideTl.fromTo(text, { opacity: 0 }, { opacity: 1 }, "-=0.4");
		slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
		slideTl.fromTo(desc, { opacity: 0 }, { opacity: 1 }, "-=1");

		slideScene = new ScrollMagic.Scene({
			triggerElement: slide,
			triggerHook: 0.25,
			reverse: false,
		})
			.setTween(slideTl)
			// .addIndicators({ name: "slide" })
			.addTo(controller);
		const pageTl = gsap.timeline();
		let nextSlide = slide.length - 1 === index ? "end" : slides[index + 1];
		pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
		pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
		pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
		pageScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: "100%",
			triggerHook: 0,
		})
			// .addIndicators({ name: "page", indent: 200 })
			.setPin(slide, { pushFollowers: false })
			.setTween(pageTl)
			.addTo(controller);
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

burger.addEventListener("click", navToggle);
animateSlides();
