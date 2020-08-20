import React, { Component } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
class ServiceTabExample extends Component {
  state = {
    data: []
  };
  async componentDidMount() {
    //this.onTextSubmit("react tutorials");

    const response = await axios
      .get("/courses")
      .then(result => {
        //console.log(result.data);
        return result;
      });

    this.setState({
      data: response.data
    });
  }


  render() {
    /* service tab menu */
    let serviceTabMenuData = [
      { iconName: "fas fa-crown", 
        tabMenuName: "【NEWS TALK】" 
      },
      {
        iconName: "fab fa-canadian-maple-leaf",
        tabMenuName: "English"
      },
      { iconName: "fas fa-spell-check", 
        tabMenuName: "English Master Writing" 
      },
      { iconName: "	fas fa-square-root-alt", 
        tabMenuName: "Singapore Mathematics" 
      },
      { iconName: "fas fa-language", 
        tabMenuName: "Happy Chinese" 
      }
    ];

    let serviceTabMenuDatalist = serviceTabMenuData.map((val, i) => {
      return (
        <Tab key={i}>
          {" "}
          <span className="icon">
            <i className={val.iconName} />
          </span>{" "}
          <span className="text">{val.tabMenuName}</span>
        </Tab>
      );
    });

    /* service tab content */

    let serviceTabContentData = [
      {
        bgUrl: "service-tab1.jpg",
        contentTitle: "News Talk...",
        contentDesc:
          "Lorem ipsum dolor sit amet, consectet adipisicin elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        serviceLink: "service-details-left-sidebar"
      },
      {
        bgUrl: "service-tab1.jpg",
        contentTitle: "English",
        contentDesc:
          "Lorem ipsum dolor sit amet, consectet adipisicin elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        serviceLink: "service-details-left-sidebar"
      },
      {
        bgUrl: "service-tab1.jpg",
        contentTitle: "English Master Writing",
        contentDesc:
          "Lorem ipsum dolor sit amet, consectet adipisicin elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        serviceLink: "service-details-left-sidebar"
      },
      {
        bgUrl: "service-tab4.jpg",
        contentTitle: "Singapore Mathematics",
        contentDesc:
          "Lorem ipsum dolor sit amet, consectet adipisicin elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        serviceLink: "service-details-left-sidebar"
      },
      {
        bgUrl: "service-tab5.png",
        contentTitle: "Learn Mandarin...",
        contentDesc:
          "Lorem ipsum dolor sit amet, consectet adipisicin elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        serviceLink: "service-details-left-sidebar"
      }
    ];

    let data = this.state.data;

    let serviceTabContentDatalist = serviceTabContentData.map((val, i) => {
      return (
        <TabPanel key={i}>
          <div
            className="service-tab__single-content-wrapper"
            style={{
              backgroundImage: `url(assets/img/backgrounds/${val.courseImg}.jpg)`
            }}
          >
            <div className="service-tab__single-content">
              <h3 className="service-tab__title">{val.courseName}</h3>
              <p className="service-tab__text">{val.courseDescription}</p>
              <a
                href={`${process.env.PUBLIC_URL}/${val.serviceLink}`}
                className="see-more-link"
              >
                SEE MORE
              </a>
            </div>
          </div>
        </TabPanel>
      );
    });
    
    return (
      <div>
        {/*====================  service tab area ====================*/}
        <div className="service-tab-area section-space--inner--120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area text-center">
                  <h2 className="section-title section-space--bottom--50">
                    Courses Overview <span className="title-icon" />
                  </h2>
                </div>
              </div>
              <div className="col-lg-12">
                {/* service tab wrapper */}

                <div className="service-tab-wrapper">
                  <Tabs>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <TabList>
                          <div className="service-tab__link-wrapper">
                            {serviceTabMenuDatalist}
                          </div>
                        </TabList>
                      </div>

                      <div className="col-md-8">
                        {serviceTabContentDatalist}
                      </div>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of service tab area  ====================*/}
      </div>
    );
  }
}

export default ServiceTabExample;
