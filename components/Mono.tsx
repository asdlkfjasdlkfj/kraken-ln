import styled from "styled-components";

export const Mono = styled.span<{ fontSize?: number }>`
  font-family: ${(props) => props.theme.fonts.mono};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize}px` : "")}
`;
