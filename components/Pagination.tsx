import styled from "styled-components";

export const PaginationButton = styled.button`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.colorDim};
  color: ${(props) => props.theme.colors.colorLink};
  cursor: pointer;
  margin-right: 5px;
  transition: 0.2s ease color, 0.2s ease border-color;
  outline: none;

  &:hover {
    color: ${(props) => props.theme.colors.colorLinkHover};
    border-color: ${(props) => props.theme.colors.colorLinkHover};
  }

  &:last-child {
    margin-right: 0px;
  }

  &:disabled {
    color: ${(props) => props.theme.colors.colorDim};
    background-color: #efefef;
    border-color: ${(props) => props.theme.colors.colorDim};
    cursor: default;
  }
`;
