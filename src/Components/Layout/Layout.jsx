import React from "react";
import classes from "./Layout.module.scss";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";
import Message from "../Popup/Message";
import Dice from "react-dice-roll";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRules: false,
      isFirstClicked: false,
      isSecondClicked: false,
      isBotTurn: false,
      botsSum: 0,
      userSum: 0,
      lastBotSum: 0,
      currentSum: 0,
      mul: 1,
      koef: 1,
      errorEndTurn: false,
      userLogs: [],
      botLogs: [],
      isNewGame: 0,
      thrown: 0
    };
  }

  componentDidMount() {
    document.getElementById("mul1").checked = true;
    document.getElementById("plus").checked = true;
  }

  getFacesArray(n, m) {
    const faces = [];
    for (let i = n; i <= m; i++) {
      faces.push(
        `https://raw.githubusercontent.com/Akara4ok/13-game-/main/src/kubik/${i}.png`
      );
    }
    return faces;
  }

  endTurnHandler() {
    const { isFirstClicked, isSecondClicked, mul, koef, userLogs } = this.state;
    let { currentSum, userSum } = this.state;
    if (!isFirstClicked || !isSecondClicked) {
      this.setState({ errorEndTurn: true });
      return;
    }
    this.gamesLog(mul, koef, userSum, currentSum, userLogs);
    userSum += currentSum * mul * koef;
    userSum = +userSum.toFixed(2);
    this.setState(
      {
        currentSum: 0,
        isFirstClicked: false,
        isSecondClicked: false,
        isBotTurn: true,
        userSum,
      },
      this.botsTurn
    );
  }

  onDiceClick(rolled, number) {
    let { currentSum, isBotTurn } = this.state;
    currentSum += rolled;
    if (number === 1 && !isBotTurn) this.setState({ isFirstClicked: true });
    if (number === 2) {
      currentSum++;
      if (!isBotTurn) this.setState({ isSecondClicked: true });
    }
    this.setState({ currentSum });
  }

  botsTurn = () => {
    document.getElementById("dices").childNodes[0].childNodes[0].click();
    document.getElementById("dices").childNodes[1].childNodes[0].click();
    setTimeout(() => {
      const { currentSum, userSum, botLogs, userLogs } = this.state;
      let { botsSum } = this.state;
      this.gamesLog(1, 1, botsSum, currentSum, botLogs);
      console.log(botLogs);
      console.log(userLogs);
      botsSum = botsSum + currentSum;
      botsSum = +botsSum.toFixed(2);
      console.log(userSum + " " + botsSum);
      if (botLogs.length === 5) this.setState({ isNewGame: 1 });
      this.setState({
        isFirstClicked: false,
        isSecondClicked: false,
        lastBotSum: currentSum,
        botsSum,
        currentSum: 0,
        isBotTurn: false,
      });
    }, 1100);
  };

  gamesLog(mul, koef, sum, currentSum, logs) {
    logs.push(
      `${logs.length + 1}. ${sum} ${
        koef === 1 ? "+" : "-"
      }  ${mul}*${currentSum}`
    );
  }

  newGame = () => {
    this.setState({
      isRules: false,
      isFirstClicked: false,
      isSecondClicked: false,
      isBotTurn: false,
      botsSum: 0,
      userSum: 0,
      lastBotSum: 0,
      currentSum: 0,
      mul: 1,
      koef: 1,
      errorEndTurn: false,
      userLogs: [],
      botLogs: [],
      isNewGame: 0,
    });
  };

  render() {
    const {
      isRules,
      isFirstClicked,
      isSecondClicked,
      currentSum,
      botLogs,
      userLogs,
      isBotTurn,
      lastBotSum,
      errorEndTurn,
      botsSum,
      userSum,
      isNewGame,
    } = this.state;
    return (
      <>
        <header>
          <h1>Thirteen</h1>
        </header>
        <main>
          <div className={classes.activityLabel}>
            <div>Bots activity</div>
            {botLogs.map((element) => (
              <p>{element}</p>
            ))}
            <div className={classes.scoreWrapper}>Bots Score: {botsSum}</div>
          </div>
          <div className={classes.diceButtton}>
            <div id="dices" className={classes.dices}>
              <div onClick={() => this.setState({ isFirstClicked: true })}>
                <Dice
                  faces={this.getFacesArray(1, 6)}
                  triggers={["click"]}
                  onRoll={(rolled) => this.onDiceClick(rolled, 1)}
                  disabled={isFirstClicked}
                />
              </div>
              <div onClick={() => this.setState({ isSecondClicked: true })}>
                <Dice
                  faces={this.getFacesArray(2, 7)}
                  triggers={["click"]}
                  onRoll={(rolled) => this.onDiceClick(rolled, 2)}
                  disabled={isSecondClicked}
                />
              </div>
            </div>
            <div className={classes.endTurn}>
              <Button onClick={() => this.endTurnHandler()}>End Turn</Button>
            </div>
            <div className={classes.score}>
              {!isFirstClicked && !isSecondClicked && !isBotTurn
                ? lastBotSum
                : currentSum}
            </div>
          </div>
          <div className={classes.buttonMenu}>
            <Button onClick={this.newGame}>New game</Button>
            <Button
              onClick={() => {
                this.setState({
                  isRules: true,
                });
              }}
            >
              Rules
            </Button>
          </div>
          <div className={classes.UsersButton}>
            <input type="radio" id="mul1" name="mul" />
            <input type="radio" id="mul2" name="mul" />
            <input type="radio" id="mul3" name="mul" />
            <input type="radio" id="mul4" name="mul" />
            <input type="radio" id="div1" name="mul" />
            <input type="radio" id="div2" name="mul" />
            <input type="radio" id="div3" name="mul" />
            <input type="radio" id="div4" name="mul" />
            <input type="radio" id="plus" name="finalOperation" />
            <input type="radio" id="minus" name="finalOperation" />
            <div className={classes.row}>
              <label for="mul1" onClick={() => this.setState({ mul: 1 })}>
                x1
              </label>
              <label for="mul2" onClick={() => this.setState({ mul: 2 })}>
                x2
              </label>
            </div>
            <div className={classes.row}>
              <label for="div1" onClick={() => this.setState({ mul: 1 })}>
                /1
              </label>
              <label for="div2" onClick={() => this.setState({ mul: +(1/2).toFixed(2) })}>
                /2
              </label>
            </div>
            <div className={classes.row}>
              <label for="mul3" onClick={() => this.setState({ mul: 3 })}>
                x3
              </label>
              <label for="mul4" onClick={() => this.setState({ mul: 4 })}>
                x4
              </label>
            </div>
            <div className={classes.row}>
              <label for="div3" onClick={() => this.setState({ mul: +(1/3).toFixed(2) })}>
                /3
              </label>
              <label for="div4" onClick={() => this.setState({ mul: +(1/4).toFixed(2) })}>
                /4
              </label>
            </div>
            <div className={classes.row}>
              <label for="plus" onClick={() => this.setState({ koef: 1 })}>
                +
              </label>
              <label for="minus" onClick={() => this.setState({ koef: -1 })}>
                -
              </label>
            </div>
          </div>
          <div className={classes.activityLabel}>
            <div>Your activity</div>
            {userLogs.map((element) => (
              <p>{element}</p>
            ))}
            <div className={classes.scoreWrapper}>User Score: {userSum}</div>
          </div>
          {isRules ? (
            <Popup>
              <Message onClose={() => this.setState({ isRules: false })}>
                <p>
                  Эта игра производится не совсем традиционными кубиками. Для
                  нее один зар следует обработать так, чтобы на его гранях
                  значились очки от двух до семи. Другой зар остается обычным,
                  без изменений. Этими двумя кубиками и ведется игра. Кости
                  помещаются в стаканчик и выбрасываются из него поочередно пять
                  раз подряд в каждом круге. Количество игроков не
                  ограничивается. Цель игры — набрать наибольшее количество
                  очков, кратное 13
                </p>
                <p>
                  Сумму очков, полученную при первом и последующих бросках,
                  разрешается прибавлять к предыдущей сумме без изменений
                  (объявляется плюс или складываю) или вычитать из нее
                  (объявляется минус или вычитаю). Можно также умножать на два,
                  три и четыре и прибавлять результат к предыдущей сумме (множу
                  на два, три, четыре...) или делить на те же числа (беру
                  половину, треть, четверть...).
                </p>
              </Message>
            </Popup>
          ) : null}
          {errorEndTurn ? (
            <Popup>
              <Message onClose={() => this.setState({ errorEndTurn: false })}>
                <p style={{ fontSize: "2rem", margin: "0px" }}>
                  Throw Dice!!!!
                </p>
              </Message>
            </Popup>
          ) : null}
          {isNewGame ? (
            <Popup>
              <Message onClose={this.newGame}>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "2.5rem",
                    margin: "0px",
                  }}
                >
                  Game Over
                </p>
                <p style={{ fontSize: "2rem", marginRight: "400px", width: "fit-content", whiteSpace: "nowrap" }}>
                  Your score: {userSum}
                </p>
                <p style={{ fontSize: "2rem", marginRight: "400px", width: "fit-content", whiteSpace: "nowrap" }}>
                  Bots score: {botsSum}
                </p>
              </Message>
            </Popup>
          ) : null}
        </main>
      </>
    );
  }
}

export default Layout;
