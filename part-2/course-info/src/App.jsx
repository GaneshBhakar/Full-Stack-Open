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

const App = () => {
const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
      ]
    }
  ]

  return(
    <div>
      <h1>Web development curriculm</h1>
      {courses.map((course) => 
        <Courses key={course.id} course={course} />
      )}
    </div>
  )
}

export default App