import { useState} from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Display = ({ text, value, suffix="" }) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value} {suffix}</td>
      </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if(all === 0){
        return (
          <>
            <p>No feedback given</p>
          </>
        )
      }
  const average = (good - bad) / all
  const positive = (good / all) * 100
  return (
    <>
    <table>
      <tbody>
        <Display text='good' value={good} />
        <Display text='neutral' value={neutral} />
        <Display text='bad' value={bad} />
        <Display text='all' value={all} />
        <Display text='average' value={average} />
        <Display text='positive' value={positive * 100} suffix="%" />
      </tbody>
    </table>
    </>
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App