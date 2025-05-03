const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.description} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div> 
      <Part description={props.parts[0].description} exercise={props.parts[0].exercises} />
      <Part description={props.parts[1].description} exercise={props.parts[1].exercises} />
      <Part description={props.parts[2].description} exercise={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      description: 'Fundamentals of React',
      exercises: 10
    },
    {
      description: 'Using props to pass data',
      exercises: 7
    },
    {
      description: 'State of a component',
      exercises: 14
    }
  ]
  
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />    
      <Total parts={parts} />
    </div>
  );
}

export default App