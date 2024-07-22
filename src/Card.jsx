import SVG from "./component/StartSvg";


const Card = (props) => {
  console.log(props.info);
  const { name, cuisines, avgRatingString, sla, locality, cloudinaryImageId } =
    props.resData;
  return (
    <>
      <div className="card">
        <div className="res-logo">
          <img
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
              cloudinaryImageId
            }
            alt="food"
          />
        </div>
        <div className="card-info">
          <h3 className="name">{name}</h3>
          <div>
            <div className="rating">
              {SVG}
              {avgRatingString}
            </div>
            <h4>{sla.slaString}</h4>
          </div>
          <h4 className="cuisines">{cuisines.join(", ")}</h4>
          <h4 className="area">{locality}</h4>
        </div>
      </div>
    </>
  );
};

export default Card;
