const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}

const Header = (props) => {
  return  (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return  (
    <>
      <Part op = {props.parts[0].name} tu = {props.parts[0].exercises} />
      <Part op = {props.parts[1].name} tu = {props.parts[1].exercises} />
      <Part op = {props.parts[2].name} tu = {props.parts[2].exercises} />
    </>
  )
}

const Part = (props) => {
  return  (
    <>
    <p>{props.op} {props.tu}</p>
    </>
  )
}

const Total = (props) => {
  return  (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

export default App