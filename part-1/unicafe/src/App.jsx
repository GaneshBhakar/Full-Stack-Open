import { useState} from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Display = ({ text, number, suffix="" }) => {
  return (
    <p>{text} {number} {suffix}</p>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive}) => {
  return (
    <>
      <h2>Statistics</h2>
      <Display text='good' number={good} />
      <Display text='neutral' number={neutral} />
      <Display text='bad' number={bad} />
      <Display text='all' number={all} />
      <Display text='average' number={average} />
      <Display text='positive' number={positive * 100} suffix="%" />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClickGood = () =>{
    setGood(good + 1)
    setAll(all + 1)
    setTotal(total + 1)
  }

  const handleClickNeutral = () =>{
    setNeutral(neutral + 1)
    setAll(all + 1)
    setTotal(total + 0)
  }

  const handleClickBad = () =>{
    setBad(bad + 1)
    setAll(all + 1)
    setTotal(total - 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text='good' />
      <Button onClick={handleClickNeutral} text='neutral' />
      <Button onClick={handleClickBad} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={total / all} positive={good / all} />
    </div>
  )
}

export default App