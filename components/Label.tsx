import styled from "styled-components";

export const Label = styled.span`
  padding: 2px 8px;
  border-radius: 3px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-shadow: 0px 0px 1px #ccc;
  transition: 0.2s ease box-shadow;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;
