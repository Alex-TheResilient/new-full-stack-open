const Header = ({ courseName }) => <h1>{courseName}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ courseParts }) => {
  // console.log("Parts: ", courseParts);
  const total = courseParts.reduce((acc, part) => acc + part.exercises, 0);
  // console.log("Total: ", total);
  return (
      <div>
          {
              courseParts.map(part =>
                  <Part key={part.id} name={part.name} exercises={part.exercises} />
              )
          }
          <p><strong>total of {total} exercises</strong></p>
      </div>
  );
}

const Course = ({ courses }) => { 
  // console.log(courses);
    return (
      <div>
        {
          courses.map(course => (
            <div key={course.id}>
              <Header courseName={course.name} />
              <Content courseParts={course.parts} />
            </div>
          ))
        }
      </div>
    )
};

export default Course;