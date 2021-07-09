import Image from "next/image";
import styles from "../styles/Home.module.css";

const Thumbnail = ({ src, alt }) => {

  return (
    <div className={styles.thumbnail}>
      <Image src={src} alt={alt} layout="fill" objectFit="cover" className={styles.image}/>
    </div>
  );
};

export default Thumbnail;
