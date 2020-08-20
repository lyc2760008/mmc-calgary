import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";

import CourseRegister from './CourseRegister'

class BlogDetailsLeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedVideo: null,
    };
  }

  async componentDidMount() {

    try {
      const url = "/course/" + this.props.match.params.id;
        const response = await fetch(url);
        const jsonData=await response.json()
        this.setState( {data: jsonData} );
        console.log(jsonData);      
        }
        catch (error) {
          console.error(error);
        }
  }

  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />
        {/* breadcrumb */}
        {/*====================  breadcrumb area ====================*/}
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-banner text-center">
                  <h1>Course Details</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/services">All Courses</a>
                    </li>
                    <li>Course Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        {/*====================  project details page content ====================*/}
        <div className="page-wrapper section-space--inner--120">
          {/*Projects section start*/}
          <div className="project-section">
            <div className="container">
              {/* <SearchBar onFormSubmit={this.onTextSubmit} /> */}
              <div className="row">
                <div className="col-12 section-space--bottom--40">
                  <div className="ui container">
                    <div className="ui grid">
                      <div className="ui row">
                      {this.state.data[0]&&
                      <div>
                        <h3>{this.state.data[0].courseName}</h3>  
                        <h5>{this.state.data[0].courseDescriptions.courseDescription}</h5>
                        <h5>{this.state.data[0].courseDescriptions.longDescription}</h5>
                        <h5>This Course is scheduled from:{this.state.data[0].courseSchedule}</h5>
                      </div>  
                      }

                        <div className="five wide column">
                          {/* <VideoList
                            onVideoSelect={this.onVideoSelect}
                            videos={this.state.videos}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-12 section-space--bottom--30 pl-30 pl-sm-15 pl-xs-15">
                  <div className="project-details">
                    {/* <h2>
                      {" "}
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.title
                        : this.state.status}
                    </h2>
                    <p>
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.course.courseDescription
                        : this.state.status}
                    </p> */}
                  </div>
                </div>

                <CourseRegister id={this.props.match.params.id}/>

                {/* <div className="col-12">
                  <PhotoGallery />
                </div> */}
              </div>
            </div>
          </div>
          {/*Projects section end*/}
        </div>

        {/*====================  End of project details page content  ====================*/}


        {/* Footer */}
        <Footer />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    );
  }
}

export default BlogDetailsLeftSidebar;
