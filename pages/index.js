import { useState } from "react";
import styles from "../styles/Home.module.css";
import Thumbnail from "../components/Thumbnail";
import MainImage from "../components/MainImage";

const Home = ({ data }) => {
  const [theme, setTheme] = useState('nature')
  const [currentImg, setCurrentImg] = useState(data[0]?.src.original)
  const [currentPhotographer, setCurrentPhotographer] = useState(data[0]?.photographer)
  const [currentUrl, setCurrentUrl] = useState(data[0].url)

  const getMainImage = (data) => {
    setCurrentImg(data.src.original)
    setCurrentPhotographer(data.photographer)
    setCurrentUrl(data.url)
  }    
  const setButtonImage = (index) => {
    setCurrentImg(data[index].src.original)
    setCurrentPhotographer(data[index].photographer)
    setCurrentUrl(data[index].url)
  }      
  console.log(data)
  
  return (
    <main className={styles.main}>
      <div className={styles.menu}>
        <div className={styles.menuLinks}>
          <button onClick={(index) => setButtonImage(index = 0)}>
            Button 1
          </button>
          <button onClick={(index) => setButtonImage(index = 1)}>
            Button 2
          </button>
          <button onClick={(index) => setButtonImage(index = 2)}>
            Button 3
          </button>
          <button onClick={(index) => setButtonImage(index = 3)}>
            Button 4
          </button>
          <button onClick={(index) => setButtonImage(index = 4)}>
            Button 5
          </button>
        </div>
      </div>
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

async function getPhotos(theme) {
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
