import SVG from "./component/starSvg";
import { CDN_url } from "./utils/constant";

const Card = ({ restaurant }) => {
  const { name, cuisines, avgRatingString, sla, locality, cloudinaryImageId } =
    restaurant;

  return (
    <div className="card">
      <div className="res-logo">
        <img src={CDN_url + cloudinaryImageId} alt={`${name} logo`} />
      </div>
      <div className="card-info">
        <h3 className="name">{name}</h3>
        <div className="rating">
          <span>{SVG}</span>
          <span>{avgRatingString}</span>
        </div>
        <h4>{sla.slaString}</h4>
        <h4 className="cuisines">{cuisines.join(", ")}</h4>
        <h4 className="area">{locality}</h4>
      </div>
    </div>
  );
};

export default Card;
