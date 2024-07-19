import "./index.css"
const Card = () => {
    return (
        <>
            <div className="card">
                <div className="res-logo">
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/b14cd9fc40129fcfb97aa7e621719d07" alt="food"/>
                </div>
                <div className="card-info">
                    <h3>Meghna food</h3>
                    <h4>Biryani,Sweets,North Indian</h4>
                    <h4>4.4 stars</h4>
                    <h4>30 minutes</h4>
                </div>
                
            </div>
        </>
    )
}


const Body = () => {
    return (
        <> 
            <div className="body">
                <div className="search"> 🔍 Search</div>
            </div>
            <div className="res-Container">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card/>
                </div>
        </>
    )
}

export default Body;