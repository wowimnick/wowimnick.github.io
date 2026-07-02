import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import { Star } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';

const TWEEN_FACTOR_BASE = 0.52;
const AUTO_SCROLL_INTERVAL = 8000;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

const testimonials = [
  { text: 'The care I received from Confident Care of Florida was exceptional. The nurses were professional and compassionate.', name: 'John D.', role: 'Patient' },
  { text: 'I have been on service with this company for wound care, they have shown great care and services, I would highly recommend them for any home heath medical needs.', name: 'Alan Link', role: 'Patient' },
  { text: 'I had the pleasure of using this company for rehab and was very happy and impressed with the level of service they had provided. Highly recommend.', name: 'Farzin Abdi', role: 'Patient' },
  { text: 'My grandmother who lives in Jacksonville recently received wound care and was very satisfied. She was attended to very well.', name: 'Kathy Vila', role: 'Patient' },
  { text: 'This is a great company with reliable and compassionate nurse-care. The nurses who took care of my grandpa were very helpful, and precise in assisting him back to health. I would recommend this company to anyone who needs home healthcare.', name: 'Anonymous', role: 'Patient' },
];

const RatingsAndTestimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);
  const autoScrollIntervalRef = useRef(null);

  const setTweenNodes = useCallback((api) => {
    tweenNodes.current = api.slideNodes().map((slideNode) =>
      slideNode.querySelector('.embla__slide__inner')
    );
  }, []);

  const setTweenFactor = useCallback((api) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((api, eventName) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0.92, 1);
        const opacity = numberWithinRange(tweenValue, 0.5, 1);
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
          tweenNode.style.opacity = opacity;
        }
      });
    });
  }, []);

  const autoScroll = useCallback((api) => {
    if (api.canScrollNext()) api.scrollNext();
    else api.scrollTo(0);
  }, []);

  const startAutoScroll = useCallback((api) => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => autoScroll(api), AUTO_SCROLL_INTERVAL);
  }, [autoScroll]);

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
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale, startAutoScroll]);

  return (
    <Wrapper>
      <Inner>
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Patients Say"
          subtitle="Real stories from families we've had the privilege to serve."
        />
        <EmblaWrapper>
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {testimonials.map((t, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="embla__slide__inner">
                      <DecorQuote>&ldquo;</DecorQuote>
                      <QuoteText>{t.text}</QuoteText>
                      <Attribution>
                        <AuthorInfo>
                          <AuthorName>{t.name}</AuthorName>
                          <AuthorRole>{t.role}</AuthorRole>
                        </AuthorInfo>
                        <Stars>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={tokens.gold} stroke={tokens.gold} />
                          ))}
                        </Stars>
                      </Attribution>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EmblaWrapper>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: ${tokens.surfaceWarm};
  font-family: ${tokens.font};
  padding: clamp(3rem, 8vw, 5rem) 0;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
  padding: 0 ${tokens.gutters};
`;

const EmblaWrapper = styled.div`
  .embla__container {
    display: flex;
    user-select: none;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
    padding: 0 0.5rem;
  }

  .embla__slide__inner {
    background: ${tokens.surfaceAlt};
    border-radius: ${tokens.rXl}px;
    padding: clamp(1.5rem, 3vw, 2.25rem);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
`;

const DecorQuote = styled.span`
  position: absolute;
  top: 0.25rem;
  left: 1.25rem;
  font-size: 4.5rem;
  font-weight: 700;
  color: ${tokens.brand};
  opacity: 0.1;
  line-height: 1;
  pointer-events: none;
  font-family: Georgia, serif;
`;

const QuoteText = styled.p`
  font-size: ${tokens.fs.md};
  color: ${tokens.ink};
  line-height: ${tokens.lh.base};
  margin: 0 0 1.5rem;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    font-size: ${tokens.fs.lg};
    line-height: ${tokens.lh.loose};
  }
`;

const Attribution = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${tokens.ink};
  font-size: ${tokens.fs.md};
`;

const AuthorRole = styled.div`
  color: ${tokens.greyLight};
  font-size: ${tokens.fs.sm};
`;

const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
`;

export default RatingsAndTestimonials;
