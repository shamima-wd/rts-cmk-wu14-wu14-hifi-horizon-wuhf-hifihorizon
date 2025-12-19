import AboutUs from "../Components/HomeComponents/AboutUs/AboutUs";
import Newsletter from "../Components/HomeComponents/Newsletter/Newsletter";
import PopularProduct from "../Components/HomeComponents/PopularProduct/PopularProduct";

import "../Styles/Home.sass";

export default function Home() {
  return (
    <div className="home">
      <video className="home__video" autoPlay loop muted>
        <source src="home_video.mp4" type="video/mp4" />
      </video>
      <PopularProduct />
      <AboutUs />
      <Newsletter />
    </div>
  );
}
