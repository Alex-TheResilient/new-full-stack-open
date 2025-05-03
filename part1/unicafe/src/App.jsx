import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value, isPercentage }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {isPercentage ? '%' : ''}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.allClicks === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.allClicks} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} isPercentage={true} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  };

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  };

  const average = (good - bad) / allClicks;
  const positive = (good / allClicks) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} average={average} positive={positive} />
    </div>
  )
}

export default App