import styles from "./Preview.module.scss";
import { Image } from "antd";

interface Props {
  src: string;
  title: string;
  lang: string;
  date: string;
  vote: number;
  overview: string;
}
const Preview = ({ src, title, lang, date, vote, overview }: Props) => {
  return (
    <div className={styles.preview}>
      <Image src={src} alt={title} width={500} height={500} />
      <div className={styles.previewRight}>
        <h1>{title}</h1>
        <h3>{date}</h3>
        <h2>Language: {lang}</h2>
        <h2>Vote: {vote}</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Preview;
