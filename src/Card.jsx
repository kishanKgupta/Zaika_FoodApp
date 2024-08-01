import SVG from "./component/starSvg";
import { CDN_url } from "./utils/constant";

const Card = (props) => {
  const { restaurant } = props;
  const { name, cuisines, avgRatingString, sla, locality, cloudinaryImageId } =
    restaurant;

  return (
    <>
      <div className="card">
        <div className="res-logo">
          <img src={CDN_url + cloudinaryImageId} alt="food" />
        </div>
        <div className="card-info">
          <h3 className="name"> {name}</h3>
          <div>
            <div className="rating">
               {SVG}
               {avgRatingString}
            </div>
            <h4>{sla.slaString}</h4>
          </div>
          <h4 className="cuisines"> {cuisines.join(', ')}</h4>
          <h4 className="area"> {locality}</h4>
        </div>
      </div>
    </>
  );
};

export default Card;
