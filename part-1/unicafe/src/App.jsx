import { useState} from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return (
    <p>{props.text} {props.number}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () =>{
    setGood(good + 1)
  }

  const handleClickNeutral = () =>{
    setNeutral(neutral + 1)
  }

  const handleClickBad = () =>{
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text='good' />
      <Button onClick={handleClickNeutral} text='neutral' />
      <Button onClick={handleClickBad} text='bad' />
      <h2>Statistics</h2>
      <Display text='good' number={good} />
      <Display text='neutral' number={neutral} />
      <Display text='bad' number={bad} />
    </div>
  )
}

export default App