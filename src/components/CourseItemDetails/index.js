import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'

const ApiStatus = {
  Initial: 'Initial',
  InProgress: 'InProgress',
  Success: 'Success',
  Failure: 'Failure',
}

class CourseItemDetails extends Component {
  state = {
    ApiStatusDetails: ApiStatus.Initial,
    courseDetail: {},
  }

  componentDidMount() {
    this.getFetchData()
  }

  getFetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({ApiStatusDetails: ApiStatus.InProgress})
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok === true) {
      const fetchedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        ApiStatusDetails: ApiStatus.Success,
        courseDetail: fetchedData,
      })
    } else {
      this.setState({
        ApiStatusDetails: ApiStatus.Failure,
      })
    }
  }

  renderSuccess = () => {
    const {courseDetail} = this.state
    return (
      <div>
        <h1>{courseDetail.name}</h1>
        <img src={courseDetail.imageUrl} alt={courseDetail.name} />
        <p>{courseDetail.description}</p>
      </div>
    )
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

  renderCourseDetailsView = () => {
    const {ApiStatusDetails} = this.state
    switch (ApiStatusDetails) {
      case ApiStatus.InProgress:
        return this.renderLoader()
      case ApiStatus.Failure:
        return this.renderFailure()
      case ApiStatus.Success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCourseDetailsView()}</div>
  }
}
export default CourseItemDetails
