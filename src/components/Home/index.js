import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'
import Course from '../Course'
import Header from '../Header'

const ApiStatus = {
  Initial: 'Initial',
  InProgress: 'InProgress',
  Success: 'Success',
  Failure: 'Failure',
}
class Home extends Component {
  state = {
    ActiveStatus: ApiStatus.Initial,
    CourseList: [],
  }

  componentDidMount() {
    this.getFetchData()
  }

  getFetchData = async () => {
    this.setState({ActiveStatus: ApiStatus.InProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    console.log(data)
    console.log(response)
    const fetchedData = data.courses.map(eachCourse => ({
      id: eachCourse.id,
      name: eachCourse.name,
      logoUrl: eachCourse.logo_url,
    }))
    if (response.ok === true) {
      this.setState({
        ActiveStatus: ApiStatus.Success,
        CourseList: fetchedData,
      })
    } else {
      this.setState({ActiveStatus: ApiStatus.Failure})
    }
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
    </div>
  )

  renderLoader = () => (
    <div>
      <TailSpin type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {CourseList} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {CourseList.map(eachCourse => (
            <Course key={eachCourse.id} eachCourse={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderTechEra = () => {
    const {ActiveStatus} = this.state
    switch (ActiveStatus) {
      case ApiStatus.InProgress:
        return this.renderLoader()
      case ApiStatus.Success:
        return this.renderSuccess()
      case ApiStatus.Failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderTechEra()}
      </>
    )
  }
}
export default Home
