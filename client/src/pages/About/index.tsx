import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../assets/images/wms_logo.png';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="row flex-lg-row-reverse align-items-center g-5 m-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img
          src={logo}
          className="d-block mx-lg-auto img-fluid"
          alt="Bootstrap Themes"
          width="400"
          height="400"
          loading="lazy"
        />
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">About Us</h1>
        <p className="lead">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quod
          nihil explicabo voluptatem provident similique molestiae, beatae eos
          alias ullam maiores ea illum quidem quos rem libero dignissimos? In,
          nihil!
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
            onClick={() => {
              navigate('/');
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
