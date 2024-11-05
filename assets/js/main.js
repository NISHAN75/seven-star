(function ($) {
   $(document).ready(function () {

    
    $('.read-btn').click(function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
    
        const $reviewContent = $(this).closest('.review-content-info');
        const $innerContent = $reviewContent.find('.review-inner-content');
        const $text = $(this).find(".read-more-text");
    
        $reviewContent.toggleClass('active'); // Toggle 'active' class on the main container
    
        if ($reviewContent.hasClass('active')) {
            // Measure full height of inner content and set it as max-height
            const fullHeight = $innerContent.prop('scrollHeight');
            $innerContent.css('max-height', fullHeight + 'px');
            $text.text('Read Less'); 
        } else {
            // Collapse back to initial height
            $innerContent.css('max-height', '60px');
            $text.text('Read More');
        }
    });

    // Initialize Magnific Popup for the gallery
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image', 
        gallery: {
            enabled: true // Enables gallery mode with navigation
        },
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function (url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: '//www.youtube.com/embed/%id%?autoplay=1&iframe=true'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function (url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        },
        callbacks: {
            elementParse: function(item) {
                if (item.src.includes('youtube') || item.src.includes('vimeo')) {
                    item.type = 'iframe'; 
                } else {
                    item.type = 'image'; 
                }
            }
        }
    });

    $('.popup-trigger').on('click', function(e) {
        e.preventDefault(); 
        $('.popup-gallery a').first().click();
    });



    // testing
    // Select all elements with the .text-animation class and loop through them
    gsap.utils.toArray(".text-animation").forEach(text => {
    
        // Split text into lines, wrapping each line in a <span> tag with specific classes
        const childSplit = new SplitText(text, {
        type: "lines",
        tag: "span",
        linesClass: "split-child",
        });
        const parentSplit = new SplitText(text, {
        type: "lines",
        linesClass: "split-parent overflow-hidden"
        });
        // Animate each line when it enters the viewport with ScrollTrigger
        gsap.from(childSplit.lines, {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: text, 
            start: "top 80%", 
            toggleActions: "play none none none", 
        }
        });
    });

    	// Parallax Effect
		$(window).on("load", function () {
            const commitmentImg = $(".trigger-parallax");
            if (commitmentImg.length) {
              commitmentImg.each(function () {
                const currentItem = $(this).find(".parallax-img");
                const currentItemHeight = currentItem.height();
                currentItem.parent().css("height", currentItemHeight);
                currentItem.css("height", currentItemHeight + 120);
                gsap.to(currentItem, {
                  y: -120,
                  ease: "none",
                  scrollTrigger: {
                    trigger: currentItem[0],
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                });
              });
            }
          });




    // testing

    // Smooth scroll js
	const lenis = new Lenis({
        duration: 1.5,
        normalizeWheel: true,
    });
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    };
    requestAnimationFrame(raf);


       
   });
})(jQuery);

