import cn from 'classnames'
import styles from "./index.module.scss";

const Icon = ({ src, text, klass }) => {
  return (
    <div className={cn(styles.container, klass)}>
      <img src={src} alt="" />
      <span>{text}</span>
    </div>
  );
};

export default Icon;
