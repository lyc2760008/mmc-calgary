import React, { Component } from "react";

class TeamMemberGrid extends Component {
  render() {
    /* team member data */

    let data = [
      {
        profileImage: "team-1-small.jpg",
        profileTitle: "Flora Fan",
        profileDesignation: "CEO & Founder",
        profileEmail: "info@example.com",
        socialLinks: {
          facebook: "//www.facebook.com",
          twitter: "//www.twitter.com",
          linkedin: "//www.linkedin.com",
          googlePlus: "//plus.google.com",
        },
      },
      {
        profileImage: "team-2-small.jpg",
        profileTitle: "Joe Doe",
        profileDesignation: "Third-Party Tech Advisor",
        profileEmail: "info@example.com",
        socialLinks: {
          facebook: "//www.facebook.com",
          twitter: "//www.twitter.com",
          linkedin: "//www.linkedin.com",
          googlePlus: "//plus.google.com",
        },
      },
      {
        profileImage: "team-3-small.jpg",
        profileTitle: "Joe Doe",
        profileDesignation: "Team Member 3",
        profileEmail: "info@example.com",
        socialLinks: {
          facebook: "//www.facebook.com",
          twitter: "//www.twitter.com",
          linkedin: "//www.linkedin.com",
          googlePlus: "//plus.google.com",
        },
      },
      {
        profileImage: "team-4-small.jpg",
        profileTitle: "Joe Doe",
        profileDesignation: "Team Member 4",
        profileEmail: "info@example.com",
        socialLinks: {
          facebook: "//www.facebook.com",
          twitter: "//www.twitter.com",
          linkedin: "//www.linkedin.com",
          googlePlus: "//plus.google.com",
        },
      },
    ];

    let Datalist = data.map((val, i) => {
      return (
        <div
          className="col-lg-3 col-sm-6 col-12 section-space--bottom--30"
          key={i}
        >
          <div className="team">
            <div className="content">
              <img
                src={`assets/img/team/${val.profileImage}`}
                className="team-job__proPhoto"
                alt=""
              />
              <h3 className="title">{val.profileTitle}</h3>
              <span>{val.profileDesignation}</span>
              <a href={"mailto:" + val.profileEmail} className="email">
                {val.profileEmail}
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {/*====================  team member area ====================*/}
        <div className="team-member-area section-space--inner--120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area text-center">
                  <h2 className="section-title section-space--bottom--50">
                    Our Team <span className="title-icon" />
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="team-member-wrapper">
                  <div className="row">
                    {/* team member list */}
                    {Datalist}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of team member area  ====================*/}
      </div>
    );
  }
}

export default TeamMemberGrid;
