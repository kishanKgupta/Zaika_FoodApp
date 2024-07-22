import resData from "./component/ResData";
import Card from "./Card";


const Body = () => {
  return (
    <>
      <div className="body">
        <div>
          <h2 style={{ fontFamily: "Roboto, serif" }}>
            Our Top Restaurant{" "}
          </h2>
          <p style={{ fontFamily: "Roboto, serif" }}>
            Try our top recipes curated just for you.
          </p>
        </div>
        <div className="search"> 🔍 Search</div>
      </div>
      <div className="res-Container">
        {resData.map((info) => (
          <Card key={info.info.id} resData={info.info} />
        ))}
      </div>
    </>
  );
};

export default Body;
