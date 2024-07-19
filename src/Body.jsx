import "./index.css"
const Card = () => {
    return (
        <>
            <div className="card">
                <p>Meghna food</p>
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