import styled from "@emotion/styled";


export const RainbowLinearGradientBackgroundStyled = (colorHexCodes: string[], degree: number) => styled.div`
      background-image: linear-gradient(${degree}deg, ${colorHexCodes.map((color, index) => 
         `${color} ${100 / colorHexCodes.length * index}% ${100 / colorHexCodes.length * (index+1)}%${index !== (colorHexCodes.length - 1) ? "," : ""} `
    ).join(" ").replaceAll(";", "")});
    `

export const RainbowColorStyled = (colorHexCodes: string[], additionalClassName: string, property: string) => ( styled.div`
      .${additionalClassName} {
        animation: bgChange 5s infinite;

        @keyframes bgChange {
          ${colorHexCodes.map((color, index) =>
    `${100 / colorHexCodes.length * index}% { ${property}: ${color} }`)} {
          }
          to {
            ${property}: ${colorHexCodes[0]};
          }
        }
      }
    `)
// linear-gradient(90deg,
    // #a5260a 0% 16.666666666666668%, #f36223 16.666666666666668% 33.333333333333336%, #ff9218 33.333333333333336% 50%,#3caa3c 50% 66.66666666666667%, #1fcecb 66.66666666666667% 83.33333333333334%, #7442c8 83.33333333333334% 100%)