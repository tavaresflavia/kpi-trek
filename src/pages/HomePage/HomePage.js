import { Link } from "react-router-dom";
import "./HomePage.scss";
import heroImg from "../../assets/images/hero.jpeg";
import addCommentVideo from "../../assets/videos/add-comment-video.mp4";
import kpiForm from "../../assets/images/kpi-form.png";
import entryForm from "../../assets/images/entry-form.png";
import requestForm1 from "../../assets/images/request-form1.png";
import requestForm2 from "../../assets/images/request-form2.png";

const HomePage = ({ isLoggedIn }) => {
  return (
    <main className="home-page">
      <section className="hero">
        <article className="hero__content">
          <h1 className="hero__title">KPI Trek</h1>
          <p className="hero__text">
            {
              "KPI Trek is a website designed to revolutionize the way you and your team track and manage Key Performance Indicators (KPIs). This comprehensive platform empowers users to effortlessly enter data, visualize trends, and collaborate seamlessly through ticket-based requests."
            }{" "}
          </p>
          {!isLoggedIn && (
            <Link className="hero__login" to="/login">
              Log In
            </Link>
          )}
        </article>
        <img className="hero__img" src={heroImg} alt="hero"></img>
      </section>
      <section className="how">
        <article className="how__feature">
          <div className="how__content">
            <h2 className="how__title">Create a new KPI </h2>
            <p className="how__description">
              Create a new KPI by visiting KPIs page and completing the form
              with its name and description. Enter the unit used to measure it
              and if applicable, specify target, upper, and lower control
              limits.
            </p>
          </div>
          <img className="how__img" src={kpiForm} alt="KPI Form"></img>
        </article>
        <article className="how__feature">
          <div className="how__content">
            <h2 className="how__title">Enter data</h2>
            <p className="how__description">
              Enter the current value of the KPI , and if necessary, provide an
              observation. Navigate to the KPIs page to visualize the data on a
              chart.
            </p>
          </div>

          <img className="how__img" src={entryForm} alt="KPI Form"></img>
        </article>
        <article className="how__feature">
          <div className="how__content how__content--request">
            <div>
            <h2 className="how__title">Create a new request</h2>
            <p className="how__description">
              {
                "Assign a request to a team member and provide essential details such as title, description, RPN, and the associated KPI. The Risk Priority Number (RPN) is automatically calculated based on the entered severity, occurrence, and detection scores."
              }
               
            </p>
            </div>
            <div className="how__rpn">
            <p>
              <strong>Severity:</strong> The potential impact or consequences of
              a risk if it were to occur | 1 (low impact) to 10 (high impact).
            </p>
            <p>
              <strong>Occurrence:</strong>The likelihood or probability of a
              risk event happening | 1 (low likelihood) to 10 (high likelihood).
            </p>
            <p>
              <strong>Detection:</strong>The ability to identify or catch a risk
              before it leads to negative consequences | 1 (high detectability)
              to 10 (low detectability).
            </p>
          </div>
          </div>
          <div className="how__req-form">
            <img
              className="how__req-form-left"
              src={requestForm1}
              alt="KPI Form"></img>
            <div className="animation">
              <img
                className="how__req-form-right"
                src={requestForm2}
                alt="KPI Form"></img>
              <div>
                <svg
                  class="animation__rectangles"
                  width="288"
                  height="164"
                  viewBox="0 0 288 164"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="1.5"
                    y="1.5"
                    width="285"
                    height="47"
                    rx="13.5"
                    stroke="#303C6C"
                    stroke-width="3"
                  />
                  <rect
                    x="1.5"
                    y="58.5"
                    width="285"
                    height="47"
                    rx="13.5"
                    stroke="#303C6C"
                    stroke-width="3"
                  />
                  <rect
                    x="1.5"
                    y="115.5"
                    width="285"
                    height="47"
                    rx="13.5"
                    stroke="#303C6C"
                    stroke-width="3"
                  />
                </svg>

              </div>
            </div>
          </div>
          
        </article>
       
        <article className="how__feature how__feature--comment">
          <div className="how__content">
            <h2 className="how__title">Add a comment and change status</h2>
            <p className="how__description">
              Enhance collaboration and streamline communication by adding
              comments to requests, eliminating the need for cluttered email
              threads and providing an efficient way to discuss and track
              updatesoid cluttered email threads and efficiently discuss and
              track updates by adding comments to the requests.
            </p>
          </div>

          <video
            className="how__video"
            muted
            autoPlay
            src={addCommentVideo}
            loop>
            Your browser does not support the HTML5 Video element.
          </video>
        </article>
      </section>
    </main>
  );
};

export default HomePage;
