import { TranslationComponent } from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { useScenes } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";

const Darkbluedungeontextscene: SceneComponentProps<
  {},
  {
    textContent: string;
  }
> = (props) => {
  const { data } = props;
  const { push, nextScene } = useGameProvider();
  const { sceneToValue } = useScenes();
  return (
    <>
      <div>
        <TranslationComponent id={data.textContent} />
      </div>
      <div>
        {data._actions.map((action) => (
          <button onClick={() => nextScene(sceneToValue(action._scene))}>
            <TranslationComponent id={action._title} />
          </button>
        ))}
        <button onClick={() => push("home")}>Return home</button>
      </div>
    </>
  );
};

export default Darkbluedungeontextscene;
