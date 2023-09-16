import styled from "styled-components";

export const ContainerComponent = styled.div`
  height: 100%;
  color: white;
  overflow-y: auto;
  // background-color: black;
  padding: 15px;
  //background: url("assets/images/backgroundprimary.png");
  background-size: cover;
  display: flex;
  text-shadow: 0px 4px 3px rgb(0 0 0 / 40%), 0px 8px 13px rgb(0 0 0 / 10%),
    0px 18px 23px rgb(0 0 0 / 10%);
  > div {
    flex: 1;
    &:last-child {
      margin-left: 20px;
      flex: 2;
    }
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const TextContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // padding: 15px 15px 0 15px;
  // height: calc(100% - 15px);
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  span:first-child {
    line-height: 3rem;
    letter-spacing: 3px;
    font-size: 1.5rem;
  }
  // > div {
  //   &:first-child {
  //     // height: 100vh;
  //     // display: block;
  //     // line-height: 2rem;
  //     // font-size: 1.4rem;
  //     // flex: 1;
  //     // overflow-y: auto;
  //     // -webkit-overflow-scrolling: touch;
  //     span {
  //       line-height: 3rem;
  //       letter-spacing: 3px;
  //       overflow-y: auto;
  //       -webkit-overflow-scrolling: touch;
  //     }
  //   }
  //   &:last-child {
  //   }
  // }
  // h4 {
  //   text-align: center;
  // }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0px 10px 0;
  width: 100%;
  margin-top: 20px;
  > div {
    width: 200px;
  }
  margin-bottom: 20px;
  // > div {
  //   margin: 15px 0px;
  //   // flex-basis: 100%;
  //   // margin-right: 2%;
  //   span {
  //     cursor: pointer;
  //     padding: 5px;
  //     font-size: 1.3rem;
  //     font-style: italic;
  //     :before {
  //       content: ">";
  //       margin-right: 5px;
  //     }
  //   }
  // }
`;

export const ScannerComponent = styled.div`
  width: 100%;
  z-index: 9;
  > div {
    height: 20px;
    // background-color: rgba(255, 255, 255, 0.7);
    // background-color: green;
    background: rgb(96, 148, 83);
    background: linear-gradient(
      0deg,
      rgba(96, 148, 83, 1) 13%,
      rgba(104, 194, 75, 1) 83%
    );

    // margin: 0 10px;
    // margin: 0 1px;
    // border-radius: 5px;
  }

  position: absolute;
  transition: top 1s linear;
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  img {
    cursor: pointer;
    margin-right: 10px;
  }
`;

export const CardsComponentContainer = styled.div<{
  showBackgroundOpacity?: boolean;
}>`
  // display: flex;
  // flex-direction: column;
  // overflow-y: auto;
  // > div {
  //   &:nth-child(1) {
  //     display: flex;
  //     justify-content: flex-end;
  //     padding-top: 5%;
  //     padding-right: 10%;
  //     img {
  //       cursor: pointer;
  //     }
  //     margin-bottom: 10px;
  //   }
  // }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  text-shadow: none;
  ${({ showBackgroundOpacity }) =>
    showBackgroundOpacity ? "background-color: rgba(0, 0, 0, 0.4);" : ""}
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  h3 {
    width: 100%;
    text-align: center;
  }
  > div {
    flex-basis: 45%;
    max-height: 40%;
    min-height: 110px;
  }
`;

export const MiniGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    text-align: center;
    margin: 0;
  }
  video {
    width: 98%;
  }
  > div {
    margin-bottom: 10px;
  }
`;
