import { CDN_url } from "../../utils/constant.js";
import { FaStar } from "react-icons/fa";

const Card = ({ restaurant }) => {
  const { name, cuisines, avgRatingString, sla, locality, cloudinaryImageId } =
    restaurant;

  return (
    <div className="flex w-36 h-64 flex-col sm:w-48 sm:h-80 sm:m-4">
      <div className="">
        <img
          className="h-32 w-36 sm:h-36 sm:w-60 rounded-xl"
          src={CDN_url + cloudinaryImageId}
          alt={`${name} logo`}
        />
      </div>
      <div className="">
        <h3 className="text-sm font-bold sm:text-lg sm:font-semibold">{name}</h3>
        <div className="flex justify-between p-2 text-xs gap-2 sm:text-sm">
          <div className="flex">
            <span className="text-green-600">{<FaStar />}</span>
            <span>{avgRatingString}</span>
          </div>
          <h4>{sla.slaString}</h4>
        </div>

        <h4 className="text-xs sm:text-sm">{cuisines.join(", ")}</h4>
        <h4 className="text-sm sm:text-lg">{locality}</h4>
      </div>
    </div>
  );
};

export default Card;
