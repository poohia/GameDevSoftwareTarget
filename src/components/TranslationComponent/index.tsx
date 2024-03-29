import { useState, useEffect } from "react";
import { useGameProvider } from "../../gameProvider";

type TranslationComponentProps = {
  id: string;
  values?: { key: string; value: string }[];
  defaultValue?: string;
};

const TranslationComponent = (props: TranslationComponentProps) => {
  const { id, defaultValue = id, values = [] } = props;
  const { i18n, locale } = useGameProvider();
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    setValue((_) => {
      if (!id) return "Translation id not found";
      let v = "";
      if (id.startsWith("@t:")) {
        v = i18n.t(id.replace("@t:", ""), { defaultValue });
      } else {
        v = i18n.t(id, { defaultValue });
      }
      values.forEach(
        (_value) => (v = v.replace(`{${_value.key}}`, _value.value))
      );
      if (v === defaultValue) {
        console.warn(
          `Translation: id '${id}' not found on language '${locale}'`
        );
      }
      return v;
    });
  }, [locale, i18n, defaultValue, id, values]);
  return <span>{value}</span>;
};

export default TranslationComponent;
