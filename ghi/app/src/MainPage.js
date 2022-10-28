import { useState, useEffect } from 'react';

function MainPage() {

  const [models, setModel] = useState([]);

  async function loadImages() {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      let data = await response.json();
      setModel(data.models);
      console.log("Images data: ", data.models)
    }
    else {
      console.error("response not ok", response);
    }
  }

  useEffect(() => { loadImages(); }, [])

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
      </div>

{/* CAROUSEL CODE: */}
<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
  {/* landing page */}
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
{/* other pages */}
{models.map((car, i) => {
  return (
    <button key={i} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={i+1} aria-label="Slide"></button>
  )
})}
  </div>
  <div className="carousel-inner">
    {/* LANDING SLIDE */}
    <div className="carousel-item active">
      <img src={ require ("./CarCar.png")} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Browse our inventory</h5>
        <p></p>
      </div>
    </div>
  {/* OTHER SLIDES */}
    {models.map((car, i) => {
            return (
              <div key={i} className="carousel-item">
              <img key={i} src={car.picture_url} alt="model" className="d-block w-100"/>
              <div className="carousel-caption d-none d-md-block">
              <h5 className="badge bg-success text-wrap fs-4">{car.name}</h5>
        <p></p>
                </div>
              </div> )})}
  </div>
  {/* to move from one slide to another */}
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
{/* CAROUSEL CODE ENDS HERE */}

    </div>
  );
}

export default MainPage;
