import { useSelector } from "react-redux";
import * as translate from "../localization/index";

const useTranslate = (key: string) => {
  const lang = useSelector((state: any) => state?.setting?.lang);

  return translate[lang][key];
};

export default useTranslate;
