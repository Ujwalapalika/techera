import {Link} from 'react-router-dom'

const Course = props => {
  const {eachCourse} = props
  const {id, name, logoUrl} = eachCourse

  return (
    <Link to={`/courses/${id}`}>
      <li>
        <img src={logoUrl} alt={name} className="logo" />
        <h1>{name}</h1>
      </li>
    </Link>
  )
}
export default Course
