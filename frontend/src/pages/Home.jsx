import styled from "styled-components";
import Header from "../ui/Header";
import Main from "../ui/Main";
import Footer from "../ui/Footer";

const Container = styled.div`
  position: relative;
`;

function Home() {
  return (
    <Container>
      <Header />
      <Main />
      <Footer />
    </Container>
  );
}

export default Home;
