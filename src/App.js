import React, { useState, useEffect } from 'react';
import { products } from './component/products/product';
import Clock from './component/clocks/clock'; 

function App() {
  const [currentItemIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentItemIndex];
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetch("http://api.quotable.io/random")
    .then(res => res.json())
    .then(
      (quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
        setTags(quote.tags);
        console.log(quote);
      }
    )
  },[]);

  let fetchNewQuote = () => {
    fetch("http://api.quotable.io/random")
    .then(res => res.json())
    .then(
      (quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
        setTags(quote.tags);
        console.log(quote);
      }
    )
  }

  const previousProduct = () => {
    let currentIndex = currentItemIndex - 1;
    if (currentIndex < 0) {
      currentIndex = products.length - 1;
    }
    setCurrentIndex(currentIndex);
  };
  const nextProduct = () => {
    let currentIndex = currentItemIndex + 1;
    if (currentIndex > products.length - 1) {
      currentIndex = 0;
    }
    setCurrentIndex(currentIndex);
  };
  const randomProduct = () => {
    const idx = Math.floor(Math.random() * products.length);
    setCurrentIndex(idx);
  };

  return (
    <div className="App">
      <main>
        <section className="container">
          <div className="title">
            <h2>Products</h2>
            <div className="underline"></div>
          </div>
          <article className="review">
            <div className="img-container">
              <img src={currentProduct.gambar} id="gambar-produk" alt="" />
            </div>
            <h4 id="author">{currentProduct.nama}</h4>
            <p id="produk">{currentProduct.merk}</p>
            <p id="info">{currentProduct.deskripsi}</p>
            <div className="button-container">
              <button
                className="prev-btn"
                onClick={previousProduct}
                title="left"
              >
                &#x2039;
              </button>
              <button className="next-btn" onClick={nextProduct} title="right">
                &#x203A;
              </button>
            </div>
            <button className="random-btn" onClick={randomProduct}>
              Random
            </button>
          </article>
          <br/><br/> 
          <div>
          <div className="title">
            <h2>Quotes</h2>
            <div className="underline"></div>
            <div></div>
          </div>
          <article className="review">
            <h5>{quote}</h5> 
            <h6>-{author}-</h6> <br/>
            <h7>#{tags}</h7> <br/>

            <button className="random-btn" onClick={fetchNewQuote}>
              Generate Random Quote
            </button>

          </article>
          </div> <br/><br/> 
          <div className="title">
          <h2>Local Clock</h2>
            <Clock></Clock>
          </div>
          <br/>
        </section>
      </main>
    </div>
  );
}

export default App;
