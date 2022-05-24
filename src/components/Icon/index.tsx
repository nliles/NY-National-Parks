import cn from "classnames";
import styles from "./index.module.scss";

type IconProps = {
  src: string,
  text: string,
  klass: string
}

const Icon = ({ src, text, klass }: IconProps) => {
  return (
    <div className={cn([styles.container], klass)}>
      <img src={src} alt="" />
      <span>{text}</span>
    </div>
  );
};

export default Icon;
