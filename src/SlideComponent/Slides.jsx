
function Slides({ slides = {}, handleSlide = () => { }, activeIndex, slidesLength }) {
  const { title, text } = slides;
  return (
    <div>
      <div id="navigation" className="text-center">
        <button disabled={activeIndex==0} type="button" data-testid="button-restart" className="small outlined" onClick={() => handleSlide('restart')}>
          Restart
        </button>
        <button disabled={activeIndex==0} type="button" onClick={() => handleSlide('prev')} data-testid="button-prev" className="small">
          Prev
        </button>
        <button disabled={activeIndex==slidesLength-1} type="button" onClick={() => handleSlide('next')} data-testid="button-next" className="small">
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        <h1 data-testid="title">{title}</h1>
        <p data-testid="text">{text}</p>
      </div>
    </div>
  );
}

export default Slides;
