import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, Quote } from 'lucide-react';

const TWEEN_FACTOR_BASE = 0.52;
const AUTO_SCROLL_INTERVAL = 8000; // 5 seconds

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

const testimonials = [
  {
    text: "My RN Irina took great care of me! I am fortunate to have Irina as my RN and I consider you fortunate to have her on your staff. The only reason I gave her a five star review was because a TEN review wasn't an option!",
    name: "Rob Holtzer",
    role: "Patient"
  },
  {
    text: "I have been on service with this company for wound care, they have shown great care and services, I would highly recommend them for any home heath medical needs.",
    name: "Alan Link",
    role: "Patient"
  },
  {
    text: "Kathryn Kwasnick was my husband's nurse, she is excellent, very profesional and kind, she always has a piece of advice in order to improve his health.",
    name: "Patricia Echeverri",
    role: "Patient"
  },
  {
    text: "I had the best experience with Confident Care of Florida! They are the best and I highly recommend them! My nurse Kathryn and physical therapists, Ami ( supervisor) and Cindy and occupational therapist, Daisy are compassionate, professional and offer the highest level of care. Damaris, who coordinates everything is top notch as well. If you or a loved one need home health, call Confident Care today! You will be glad you did!",
    name: "Karyn Morris",
    role: "Patient"
  },
  {
    text: "Kathryn was assigned to me after being discharged from the hospital with a life-threatening diagnosis and a brand new medical apparatus of which I had no prior experience. Kathryn was professional, punctual, and had an easiness about her that helped me transition into the newness of my ailment. She went above and beyond to offer her professional recommendations for medical equipment and supplies. I honestly would not have recovered as seamlessly and quickly as I did if it weren't for her care. Superior service!!",
    name: "LaKiesha Hall",
    role: "Patient"
  },
  {
    text: "CONFIDENT CARE- Service delivered with confidence and care; as exemplified by the indefatigable KATHRYN KWASNICK RN; who supervised my recovery from two successive surgeries- 2022/2023. Kudos for utmost diligence , devotion, and indisputable commitment- Professional competence complemented by an innate charm and engaging wit. JOSE GUEREDO, a gifted and enormously skilled professional, who was responsible for my rehabilitation from Laminectomy. A true Physiotherapist, whose age and youthful disposition belie his expertise, indisputable competence, and strict adherence to post spinal protocols critical in the recovery process. What a perfect fit!",
    name: "Wisdom Dafinone",
    role: "Patient"
  }
];

const RatingsAndTestimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    skipSnaps: false
  });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);
  const autoScrollIntervalRef = useRef(null);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__inner');
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0.8, 1);
        const opacity = numberWithinRange(tweenValue, 0.3, 1);
        const blur = numberWithinRange((1 - tweenValue) * 5, 0, 3);
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
        tweenNode.style.opacity = opacity;
        tweenNode.style.filter = `blur(${blur}px)`;
      });
    });
  }, []);

  const autoScroll = useCallback((emblaApi) => {
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, []);

  const startAutoScroll = useCallback((emblaApi) => {
    stopAutoScroll();
    autoScrollIntervalRef.current = setInterval(() => autoScroll(emblaApi), AUTO_SCROLL_INTERVAL);
  }, [autoScroll]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
      .on('select', () => startAutoScroll(emblaApi));

    startAutoScroll(emblaApi);

    return () => {
      stopAutoScroll();
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale, startAutoScroll, stopAutoScroll]);

  return (
    <Wrapper>
      <SectionTitle>What Our Patients and Partners Say</SectionTitle>
      <EmblaWrapper>
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {testimonials.map((testimonial, index) => (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    <QuoteIcon>
                      <Quote size={32} />
                    </QuoteIcon>
                    <TestimonialText>"{testimonial.text}"</TestimonialText>
                    <TestimonialAuthor>
                      <AuthorName>{testimonial.name}</AuthorName>
                      <AuthorRole>{testimonial.role}</AuthorRole>
                    </TestimonialAuthor>
                    <TestimonialRating>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" />
                      ))}
                    </TestimonialRating>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EmblaWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  background-color: #f8f9fa;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  padding: 6rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 600;
`;

const EmblaWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  .embla__container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
    padding: 0 2rem;
  }

  .embla__slide__inner {
    background-color: #fff;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -5px;

  color: #4a90e2;
  opacity: 0.1;
  transform: scale(3);
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  text-align: right;
  margin-bottom: 0.5rem;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
`;

const AuthorRole = styled.div`
  color: #777;
  font-size: 0.9rem;
  font-style: italic;
`;

const TestimonialRating = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.25rem;
`;

export default RatingsAndTestimonials;