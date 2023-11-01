import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { IBanner } from "../../../../interfaces";
import { openUrlInNewTab } from "../../../../helpers";

function Slider() {
  const { banners } = useSelector((state: RootState) => state.banners);
  const handleClick = (item: IBanner) => {
    if (item.url.trim() !== "") {
      openUrlInNewTab(item.url, false);
    }
  };
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      swipeable={true}
      interval={5000}
    >
      {banners.map((item, index) => (
        <div onClick={() => handleClick(item)} key={index}>
          <img
            className="d-block w-100"
            src={app.FILE_URL + item.image}
            alt="  slide"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default Slider;
