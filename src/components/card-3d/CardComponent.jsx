import React, { useState } from 'react';
import styled from 'styled-components';

const CardComponent = ({ onMouseEnter, onMouseLeave }) => {

  return (
    <StyledWrapper>
      <div className="cookieCard rounded-xl">
        <p className="cookieHeading">Cookies.</p>
        <p className="cookieDescription">By using this website you automatically accept that we use cookies. <a href="#">What for?</a></p>
        <a href="/">
          <button className="acceptButton" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>Back</button>
        </a>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cookieCard {
    width: 300px;
    height: 200px;
    background: linear-gradient(to right,rgb(137, 104, 255),rgb(175, 152, 255));
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .cookieCard::before {
    width: 150px;
    height: 150px;
    content: "";
    background: linear-gradient(to right,rgb(142, 110, 255),rgb(208, 195, 255));
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    right: -25%;
    top: -25%;
  }

  .cookieHeading {
    font-size: 1.5em;
    font-weight: 600;
    color: rgb(241, 241, 241);
    z-index: 2;
  }

  .cookieDescription {
    font-size: 0.9em;
    color: rgb(241, 241, 241);
    z-index: 2;
  }

  .cookieDescription a {
    color: rgb(241, 241, 241);
  }

  .acceptButton {
    padding: 11px 20px;
    background-color: #7b57ff;
    transition-duration: .2s;
    border: none;
    color: rgb(241, 241, 241);
    cursor: pointer;
    font-weight: 600;
    z-index: 2;
  }

  .acceptButton:hover {
    background-color: #714aff;
    transition-duration: .2s;
  }`;

export default CardComponent;
