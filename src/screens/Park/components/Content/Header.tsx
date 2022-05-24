import styles from "./index.module.scss";

type ImageProps = {
  designation: string;
  fullName: string;
  url: string;
};

const Header = ({ designation, fullName, url }: ImageProps) => (
  <div className={styles.header}>
    <h2 className={styles.header}>
      <a href={url}>{fullName}</a>
    </h2>
    <strong>{designation}</strong>
  </div>
);

export default Header;
