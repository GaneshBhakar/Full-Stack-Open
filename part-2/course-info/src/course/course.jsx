const Parts = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ parts }) => {
  // let total = 0
  // for(let i = 0; i < parts.length; i++){
  //   total += parts[i].exercises
  // }

  const total = parts.reduce((sum, part) =>
    sum + part.exercises,
    0
  )

  return (
    <p>total of {total} exercises</p>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Parts key={part.id} part={part} />
      )}
      <Total parts={parts} />
    </div>
  )
}

const Courses  = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Courses