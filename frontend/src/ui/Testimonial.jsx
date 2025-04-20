import styled from "styled-components";
import { useEffect, useState } from "react";
import CarouselContainer from "./CarouselContainer";
import CarouselInner from "./CarouselInner";
import TestimonialCard from "./TestimonialCard";
import CarouselButton from "./CarouselButton";

const TestimonialContainer = styled.section`
  padding: 4.8rem 0 9.6rem 0;
`;

const testimonials = [
  {
    id: 1,
    name: "张三",
    comment:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia consectetur illum eos. Assumenda repellendus impedit dolorum. Tempore vel nulla eligendi dolorum? Vel modi quo reprehenderit veniam. Reprehenderit in beatae quisquam!",
  },
  {
    id: 2,
    name: "李四",
    comment:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia consectetur illum eos. Assumenda repellendus impedit dolorum. Tempore vel nulla eligendi dolorum? Vel modi quo reprehenderit veniam. Reprehenderit in beatae quisquam!",
  },
  {
    id: 3,
    name: "王五",
    comment:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia consectetur illum eos. Assumenda repellendus impedit dolorum. Tempore vel nulla eligendi dolorum? Vel modi quo reprehenderit veniam. Reprehenderit in beatae quisquam!",
  },
];

function Testimonial() {
  const [cardIndex, setcardIndex] = useState(0);

  const nextTestimonial = function () {
    setcardIndex(pre => (pre + 1) % testimonials.length);
  };

  const preTestimonial = function () {
    setcardIndex(pre => (pre - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TestimonialContainer>
      <CarouselContainer>
        <CarouselButton direction="left" onClick={preTestimonial} />
        <CarouselInner cardIndex={cardIndex}>
          {testimonials.map(t => (
            <TestimonialCard key={t.id} name={t.name} comment={t.comment} />
          ))}
        </CarouselInner>
        <CarouselButton direction="right" onClick={nextTestimonial} />
      </CarouselContainer>
    </TestimonialContainer>
  );
}

export default Testimonial;
