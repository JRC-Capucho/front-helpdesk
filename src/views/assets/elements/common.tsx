import styled from "styled-components";
import "../styleColors.scss";

export const Button = styled.button<{
  $primary?: boolean;
  $color?: string;
  $colorBG?: string;
}>`
  align-self: center;
  background-color: ${(props) => (props.$primary ? props.$colorBG : "#141415")};
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px #0000009f;
  color: ${(props) => props.$color};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  transition: 0.2s ease;
  box-shadow: 5px 5px 35px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    background-color: #141415;
  }
`;

// Exemple derivated element
export const ButtonBlack = styled(Button)`
  color: white;
`;

export const Div = styled.div<{
  $primary?: boolean;
  $colorBG?: string;
  $width?: string;
  $height?: string;
  $padding?: string;
  $radius?: string;
  $border?: string;
  $bxShadown?: string;
}>`
  background-color: ${(props) => (props.$primary ? props.$colorBG : "#141415")};
  width: ${(props) => (props.$width !== "" ? props.$width : "auto")};
  height: ${(props) => (props.$height !== "" ? props.$height : "auto")};
  padding: ${(props) => (props.$padding !== "" ? props.$padding : "0")};
  border-radius: ${(props) => (props.$radius !== "" ? props.$radius : "0")};
  box-shadow: ${(props) =>
    props.$bxShadown !== "" ? props.$bxShadown : "none"};
  border: ${(props) => (props.$border !== "" ? props.$border : "none")};
`;

export const DivFlex = styled(Div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Divider = styled(Div)`
  width: 100%;
  height: 2px;
  background-color: rgba(var(--primary_color), 1);
`;
