import styled, { keyframes } from "styled-components";

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
  }
`;

export const TableRow = styled.tr`
  height: 35px;
  border-bottom: 1px solid #efefef;
  margin-bottom: 3px;
  font-family: ${(props) => props.theme.fonts.mono};
`;

export const Table = styled.table`
  animation-name: ${FadeIn};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  ${TableRow}:nth-child(even) {
    background-color: rgba(200, 200, 200, 0.1);
  }

  tbody {
    font-size: 12px;
  }
`;

export const TableColumn = styled.td``;

export const TableHeader = styled.th`
  text-align: left;
  color: ${(props) => props.theme.colors.colorHeader};
`;
