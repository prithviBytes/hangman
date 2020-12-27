import React, { Component } from "react";
import { randomWord } from "./Words";
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    img: [img0, img1, img2, img3, img4, img5, img6]
  };
  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleGuess(e) {
    let ltr = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }
  // Funtion to display Buttons
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        className="keyboard"
        key={ltr.toString()}
        onClick={this.handleGuess}
        value={ltr}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }
  reset() {
    this.setState((st) => ({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    }));
  }
  render() {
    let isWinner = this.guessedWord().join("") === this.state.answer;
    let canPlay = this.props.maxWrong !== this.state.nWrong;
    let buttons = <p className="btns">{this.generateButtons()}</p>;
    let resetButton = (
      <button id="reset" onClick={this.reset}>
        Play Again?
      </button>
    );
    return (
      <div className="Hangman">
        <h1> Hangman </h1>
        {isWinner ? (
          <div>
            <p style={{ color: "green" }}>You Win!!!</p>
            {resetButton}
          </div>
        ) : (
          <div>
            <img
              className="image"
              src={this.props.img[this.state.nWrong]}
              alt={`Chance Remaining: ${
                this.props.maxWrong - this.state.nWrong
              }`}
            />
            <p>Remaining guess: {this.props.maxWrong - this.state.nWrong}</p>
          </div>
        )}
        {canPlay ? (
          <p className="guessedWord">{this.guessedWord()}</p>
        ) : (
          <p>Answer: {this.state.answer}</p>
        )}

        {canPlay ? (
          buttons
        ) : (
          <div>
            <p style={{ color: "red" }}>You Lose!!!</p>
            {resetButton}
          </div>
        )}
      </div>
    );
  }
}

export default Hangman;
