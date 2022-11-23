import { CardContainer } from "./Card";
import { RetrospaceadventureElements } from "../../types";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const CardElementContainer = styled(CardContainer)`
  justify-content: center;
  align-items: center;
`;

type CardElementProps = {
  element: RetrospaceadventureElements;
  active?: boolean;
  onClick: (element: RetrospaceadventureElements) => void;
};

const CardElement: React.FC<CardElementProps> = ({
  element,
  active = false,
  onClick,
}) => {
  const [initView, setInitView] = useState<boolean>(true);

  const imageElement = useMemo(() => {
    switch (element) {
      case 1:
        return "Électricité";
      case 2:
        return "Matière noire";
      case 3:
        return "Feu";
    }
  }, [element]);

  const imageElementCounter = useMemo(() => {
    switch (element) {
      case 1:
        return "Matière noire";
      case 2:
        return "Feu";
      case 3:
        return "Électricité";
    }
  }, [element]);

  useEffect(() => {
    setTimeout(() => setInitView(false), 1000);
  }, []);

  return (
    <CardElementContainer
      className={`animate__animated ${initView ? "animate__bounceIn" : ""}  ${
        active ? "animate__animated animate__pulse" : ""
      }`}
      onClick={() => {
        onClick(element);
      }}
      active={active}
    >
      <p>
        Element: <b>{imageElement}</b>
      </p>
      <p>
        Counter: <b>{imageElementCounter}</b>
      </p>
    </CardElementContainer>
  );
};

export default CardElement;