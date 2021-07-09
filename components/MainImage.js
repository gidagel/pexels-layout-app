import Image from "next/image";
import styles from "../styles/Home.module.css";

const MainImage = ({ src, title, description }) => {
  return (
    <>
      <h2>{title}</h2>
      <p><a href={description}>{description}</a></p>
      <div className={styles.mainImage}>
        <Image src={src} alt={description} layout="fill" objectFit="cover" />
      </div>
    </>
  );
};

export default MainImage;
