import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.surfaceContrast};
  color: ${(props) => props.theme.colors.colorInverse};
`;

const Inner = styled.div`
  width: ${(props) => props.theme.sizes.maxWidth}px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
`;

export const SubHeader: React.FunctionComponent = ({ children }) => (
  <Container>
    <Inner>{children}</Inner>
  </Container>
);
