import { useState } from "react";
import styles from "../styles/Home.module.css";
import Thumbnail from "../components/Thumbnail";
import MainImage from "../components/MainImage";

const Home = ({ data }) => {
  const [currentImg, setCurrentImg] = useState(data[0]?.src.original)
  const [currentPhotographer, setCurrentPhotographer] = useState(data[0]?.photographer)
  const [currentUrl, setCurrentUrl] = useState(data[0].url)

  const getMainImage = (data) => {
    setCurrentImg(data.src.original)
    setCurrentPhotographer(data.photographer)
    setCurrentUrl(data.url)
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.gallery}>
        <h1>Pexels Gallery</h1>
        <MainImage src={currentImg} title={currentPhotographer} description={currentUrl} />
        <div className={styles.thumbnailContainer}>
        {data.map((data, key) => {
          return (
            <div onClick={() => getMainImage(data)} key={key}>
              <Thumbnail
                src={data.src.original}
                alt={data.photographer}
              />
            </div>
          );
        })}
        </div>
      </div>
    </main>
  );
};

async function getPhotos() {
  try{
    let theme = 'nature'
    let res = await fetch(
      `https://api.pexels.com/v1/search?query=${theme}&per_page=5`,
      {
        headers: {
          Authorization: '563492ad6f917000010000017f488949f5c24f7cb9fc4ad4069c1050',
        },
      }
    );
    const responseJson = await res.json();
    return responseJson.photos;
  }catch(err){
    console.error(err);
  }
}

export async function getServerSideProps() {
  const data = await getPhotos();
  return {
    props: {
      data
    },
  };
}

export default Home;
