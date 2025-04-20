import styled from "styled-components";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TripCard from "./TripCard";

gsap.registerPlugin(ScrollTrigger);

const RecommandedTripsContainer = styled.section`
  padding: 4.8rem 0 9.6rem 0;
  min-height: 100vh;
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 2.4rem;
  padding: 4.8rem 4.8rem;
`;

const LeftContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  align-items: center;
  position: relative;
  min-width: 300px;
  min-height: 200px;
`;

const LeftText = styled.div`
  font-size: 9.6rem;
  font-weight: 500;
  letter-spacing: 1.2rem;
  opacity: 1;

  & span {
    &::after {
      content: "";
      display: inline-block;
    }
  }
`;

const RightContainer = styled.div`
  padding: 2.4rem;
  margin-left: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  height: 100vh;
`;

function RecommandedTrips() {
  const cardsRef = useRef([]);
  const textRef = useRef(null);
  const totalCards = 4;
  const radius = 250;

  const handleCardClick = () => {
    gsap.to(textRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  };

  useEffect(() => {
    if (cardsRef.current.every(ref => ref !== null)) {
      const angleStep = 60 / (totalCards - 1);
      const staggerDelay = 0.1;

      gsap.set(textRef.current, { opacity: 0, y: "100%" });

      let textTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#DestinationList",
          start: "center+=100px top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      let cardTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#DestinationList",
          start: "center+=100px top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      textTL.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      cardsRef.current.forEach((card, index) => {
        const angle = -75 + angleStep * index;
        const xOffset = -radius * Math.cos((angle * Math.PI) / 180);
        const yOffset = -radius * Math.sin((angle * Math.PI) / 180);

        cardTL.to(
          card,
          {
            opacity: 1,
            x: xOffset,
            y: yOffset,
            rotation: angle,
            duration: 0.5,
            ease: "power2.out",
          },
          staggerDelay * index
        );

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.1,
            duration: 0.2,
            ease: "power4.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.2,
            ease: "power4.out",
          });
        });
      });
    }
  }, []);

  return (
    <RecommandedTripsContainer id="RecommandedTripsContainer">
      <StyledBox>
        <LeftContainer id="LeftContainer">
          <LeftText ref={textRef}>
            <span>猜您喜欢——</span>
            <div>个性化推荐地点</div>
          </LeftText>
        </LeftContainer>

        <RightContainer id="RightContainer">
          {[...Array(4)].map((_, index) => (
            <TripCard
              key={index}
              index={index}
              ref={el => (cardsRef.current[index] = el)}
              handleClick={() => handleCardClick(index)}
            />
          ))}
        </RightContainer>
      </StyledBox>
    </RecommandedTripsContainer>
  );
}

export default RecommandedTrips;
