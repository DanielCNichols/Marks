import React from 'react';
import s from './LandingPage.module.css';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import screenshot from '../../onboardingpic.jpg';

export default function LandingPage(props) {
  return (
    <div className={s.landingPage}>
      <header className={s.headline}>
        <h1>Marks</h1>
        <p>The Programmer's Bookmarking App</p>
      </header>
      <div className={s.formContainer}>
        <RegistrationForm />
      </div>
      <div className={s.onBoarding}>
        <header>
          <h2>Bookmarking made easy</h2>
        </header>
        <div className={s.onBoardingPhoto}>
          <img src={screenshot} alt="marks screenshot" />
        </div>
        <div className={s.onBoardingContent}>
          <p>
            Collections? Favorites? Saved? <br />
            <br />
            Whatever you call it, we all need to keep track of our favorite
            sites. Marks makes it simple. Just sign in, and you are immediately
            directed to your own personally curated list of websites. No muss,
            no fuss!
          </p>
        </div>
      </div>
    </div>
  );
}
