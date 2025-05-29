import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TripCard from "./TripCard";
import { useRecommendedCities } from "../hooks/useRecommendedCities";
import useQueryUpdater from "../hooks/useQueryUpdater";
import getRandomImages from "../utils/getRandomImages";

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
  const [randomImages, setRandomImages] = useState([]);
  const totalCards = 4;
  const radius = 250;
  const { data: recommendedCities = [], isSuccess } = useRecommendedCities();
  const { updateQueryAndNavigate } = useQueryUpdater();

  const paddedCities = recommendedCities.map((name, idx) => ({
    cityName: name,
    image: randomImages[idx] || "默认占位图地址",
    _id: `city-${idx}`,
    isPlaceholder: false,
  }));

  // 使用 placeholder 填补
  while (paddedCities.length < totalCards) {
    paddedCities.push({
      cityName: "即将上线",
      image: null,
      _id: `placeholder-${paddedCities.length}`,
      isPlaceholder: true,
    });
  }

  const handleCardClick = (index, city) => {
    if (city.isPlaceholder) return;

    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1.2,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        updateQueryAndNavigate({}, "/map", {
          state: { cityName: city.cityName },
        });
      },
    });

    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  useEffect(() => {
    setRandomImages(getRandomImages(4));
  }, []);

  useEffect(() => {
    const actualCount = paddedCities.length;

    if (
      isSuccess &&
      cardsRef.current.length === actualCount &&
      cardsRef.current.every(ref => ref !== null)
    ) {
      const angleStep = actualCount === 1 ? 0 : 60 / (actualCount - 1);
      const staggerDelay = 0.1;

      gsap.set(textRef.current, { opacity: 0, y: "100%" });
      gsap.set(cardsRef.current, {
        opacity: 0,
        x: 0,
        y: 0,
        rotation: -90,
        scale: 1,
      });

      let textTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#DestinationList",
          start: "top+=600px top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      let cardTL = gsap.timeline({
        scrollTrigger: {
          trigger: "#RecommandedTripsContainer",
          start: "top-=650px top",
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
        const angle = actualCount === 1 ? 0 : -75 + angleStep * index;
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

        if (!paddedCities[index].isPlaceholder) {
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
        }
      });
    }
  }, [isSuccess, paddedCities]);

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
          {paddedCities.map((city, index) => (
            <TripCard
              key={city._id || index}
              index={index}
              cityName={city.cityName}
              cityImage={
                city.image ||
                "https://via.placeholder.com/450x600?text=Coming+Soon"
              }
              ref={el => (cardsRef.current[index] = el)}
              handleClick={() => handleCardClick(index, city)}
            />
          ))}
        </RightContainer>
      </StyledBox>
    </RecommandedTripsContainer>
  );
}

export default RecommandedTrips;
