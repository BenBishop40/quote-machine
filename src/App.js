import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [quotes, setQuotes] = useState([]);
    const [indexQuote, setIndexQuote] = useState();
    const [backgroundColor, setBackgroundColor] = useState("");
    const [textColor, setTextColor] = useState("");

    const colors = [
        "#EE6C4D",
        "#3d5a80",
        "#293241",
        "#ff3c38",
        "#F18F01",
        "#7FB800",
        "#D7263D",
        "#C5D86D",
        "#310A31",
        "#8EB19D",
        "#CE84AD",
        "#00120B",
    ];

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
                );
                const quotesResponse = await response.json();
                setQuotes(quotesResponse.quotes);
                console.log(quotesResponse.quotes);
                // Opérations supplémentaires après la récupération des citations pr affichage à initialization composant
                const randomIndex = Math.floor(Math.random() * quotesResponse.quotes.length);
                setIndexQuote(randomIndex);
                getRandomColor();
            } catch (error) {
                console.error("Failed to fetch quotes:", error);
            }
        })();
    }, []);

    function getRandomQuote() {
        const index = Math.floor(Math.random() * quotes.length);
        setIndexQuote(index);
    }

    function changeQuote() {
        getRandomQuote();
        getRandomColor();
    }

    function getRandomColor() {
        const index = Math.floor(Math.random() * colors.length);
        const color = colors[index];
        setBackgroundColor(color);
        setTextColor(color);

        // ajout classe transition au body
        document.body.classList.add("transition");
        // ajout des classes couleurs au body
        document.body.style.backgroundColor = color;
        document.body.style.color = color;

        // Supprimer la classe "transition" après un délai
        setTimeout(() => {
            document.body.classList.remove("transition");
        }, 1000);
    }

    return (
        <div className="wrapper">
            {quotes.length > 0 && indexQuote ? (
                <div id="quote-box">
                    <div className="quote-text" style={{ color: textColor }}>
                        <i className="fa-solid fa-quote-left" id="quote-icon"></i>
                        <span id="text">{quotes[indexQuote].quote}</span>
                    </div>
                    <div id="quote-author" style={{ color: textColor }}>
                        <span id="author">{quotes[indexQuote].author}</span>
                    </div>
                    <div className="buttons">
                        <a
                            id="tweet-quote"
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                quotes[indexQuote].quote
                            )}&author=${quotes[indexQuote].author}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i
                                className="fa-brands fa-square-twitter transition"
                                id="icon-color"
                                style={{ color: textColor }}
                            ></i>
                        </a>
                        <button id="new-quote" className="transition" onClick={changeQuote} style={{ backgroundColor }}>
                            New quote
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default App;
