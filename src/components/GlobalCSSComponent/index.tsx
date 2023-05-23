import { createGlobalStyle } from "styled-components";
import { Platform } from "../../types";

const GlobalCSSComponent = createGlobalStyle<{
  backgroundColor?: string;
  primaryFont?: string;
  platform: Platform | null;
}>`
    ${({ platform }) =>
      platform === "browserandroid"
        ? `html { height: 100vh; 
            overflow: auto; 
        }
        `
        : ""}
         
    ${({ platform }) =>
      platform === "browserios"
        ? `html { height: 101vh; 
          overflow: auto; 
      }`
        : ""}  
        
  body{
      margin: 0;
      height: 100vh;
      overflow: hidden;
      // background:  ${(props) => props.backgroundColor || "transparent"};
      &::-webkit-scrollbar {
          display: none;
      }
  //    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
      --sat: env(safe-area-inset-top);
      --sar: env(safe-area-inset-right);
      --sab: env(safe-area-inset-bottom);
      --sal: env(safe-area-inset-left);
      *{
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome and Opera */
        &::-webkit-scrollbar {
          display: none;
        }
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
        -webkit-focus-ring-color: rgba(255, 255, 255, 0); 
        outline: none;  
      }
      video::-webkit-media-controls-overlay-play-button {
        display: none;
      }
    }
    
    #app{
        background-color: transparent;
        overflow: hidden;
        overflow-y: auto;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background:  ${(props) => props.backgroundColor || "transparent"};
        background-size: cover;
        ${({ primaryFont }) => primaryFont && `font-family: ${primaryFont};`}
    }

    img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
    
    @keyframes fadein {
      from {
          opacity:0;
      }
      to {
          opacity:1;
      }
  }
  
`;

export default GlobalCSSComponent;
