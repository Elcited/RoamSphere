import { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroForm from "./HeroForm";
import heroImage from "../assets/images/hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSectionContainer = styled.section`
  padding: 4.8rem 0 9.6rem 0;
  margin: 0 0 7.2rem 0;
  background-image: linear-gradient(
      rgba(34, 34, 34, 0.6),
      rgba(34, 34, 34, 0.6)
    ),
    url(${heroImage});
  background-size: cover;
  min-height: 100vh;
  overflow: hidden;
`;

const StyledHero = styled.div`
  max-width: 130rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin: 0 auto;
  padding: 7.2rem 6.4rem 0 6.4rem;
`;

const StyledTextBox = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 2.4rem;
  padding: 1.2rem;
`;

const StyledTitle = styled.h1`
  font-weight: 700;
  font-size: 6.4rem;
  opacity: 0;
  transform: translateY(100%);
`;

const StyledDescription = styled.div`
  font-size: 2.4rem;
  opacity: 0;
  transform: translateX(-100%);
`;

const StyledFormBox = styled.div`
  padding: 4.8rem;
`;

function HeroSection() {
  const descRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }).to(
      descRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 2,
        ease: "power2.out",
      },
      ">+=0.1"
    );

    const tlExit = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top-=100px top",
        end: "+=600px",
        scrub: true,
      },
    });

    tlExit
      .to(
        [titleRef.current, descRef.current],
        {
          x: "-100%",
          opacity: 0,
          duration: 3,
          ease: "power2.out",
        },
        0
      )
      .to(
        formRef.current,
        {
          x: "100%",
          opacity: 0,
          duration: 3,
          ease: "power2.out",
        },
        "<"
      );
  }, []);

  return (
    <HeroSectionContainer id="HeroSection">
      <StyledHero>
        <StyledTextBox>
          <StyledTitle ref={titleRef}>开启你的奇妙旅行之旅！</StyledTitle>
          <StyledDescription ref={descRef}>
            提供个性化的路径规划：驾车、步行、骑行
          </StyledDescription>
        </StyledTextBox>
        <StyledFormBox ref={formRef}>
          <HeroForm />
        </StyledFormBox>
      </StyledHero>
    </HeroSectionContainer>
  );
}

export default HeroSection;
