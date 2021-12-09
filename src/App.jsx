import React, { useState, useEffect } from "react";
import classes from "./App.module.scss";
import Button from "./Components/Button/Button";
import Popup from "./Components/Popup/Popup";
import Message from "./Components/Popup/Message";
import Dice from "react-dice-roll";
import { fireEvent } from "@testing-library/react";

let refresh = 0;
let isRules = false;

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function onClose(forceUpdate) {
  forceUpdate();
  isRules = false;
}

function getFacesArray(n, m) {
  const faces = [];
  for (let i = n; i <= m; i++) {
    faces.push(
      `https://raw.githubusercontent.com/Akara4ok/13-game-/main/src/kubik/${i}.png`
    );
  }
  return faces;
}

function App() {
  const forceUpdate = useForceUpdate();
  return (
    <div className={classes.container}>
      <header>
        <h1>Thirteen</h1>
      </header>
      <main>
        <div id="dices" className={classes.dices}>
          <div>
            <Dice faces={getFacesArray(1, 6)} triggers={["click", "q"]} />
          </div>
          <div>
            <Dice faces={getFacesArray(2, 7)} triggers={["click", "q"]} />
          </div>
        </div>
        {isRules ? (
          <Popup>
            <Message onClose={() => onClose(forceUpdate)}>
              <p>В игре Три Мушкетера используется доска 5х5 клеток.</p>{" "}
              <p>
                В игре участвует два игрока: Мушкетер (синие фишки) и Гвардеец
                (красные фишки).
              </p>
              <p>Цели игры различны для обоих игроков:</p>
              <ul>
                <li>
                  Гвардейцы (красные фишки) побеждают в игре, если им удается
                  заставить трех мушкетеров оказаться в одном ряду или в одном
                  столбце.
                </li>
                <li>
                  Мушкетеры (синие фишки) побеждают в игре, если у них в свою
                  очередь не остается возможных ходов (если хотя бы у одного из
                  мушкетеров есть ход, игра продолжается).
                </li>
              </ul>
              <p>
                Игроки ходят по очереди, начиная с того игрока, который играет
                Мушкетерами.
              </p>
              <p>
                Играющий мушкетерами в свой ход может переместить одного из
                мушкетеров на соседнюю по горизонтали или вертикали клетку, на
                которой стоит гвардеец. Гвардеец при этом снимается с доски.
              </p>
              <p>
                Играющий гвардейцами в свой ход может переместить одного из
                гвардейцев на соседнюю по горизонтали или вертикали свободную
                клетку.
              </p>
            </Message>
          </Popup>
        ) : null}
        <div className={classes.buttonMenu}>
          <Button
            onClick={() => {
              //forceUpdate();
              //refresh = 1 - refresh;
            }}
          >
            New game
          </Button>
          <Button
            onClick={() => {
              forceUpdate();
              isRules = true;
            }}
          >
            Rules
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
