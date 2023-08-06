import styled from "@emotion/styled";

export const RainbowColorStyled = (colorHexCodes: string[], additionalClassName: string) => ( styled.div`
      .${additionalClassName} {
        animation: bgChange 5s linear infinite;

        @keyframes bgChange {
          ${colorHexCodes.map((color, index) =>
    `${100 / 6 * index}% { color: ${color} }`)} {
            color: black;
          }
          to {
            color: ${colorHexCodes[0]};
          }
        }
      }
    `)