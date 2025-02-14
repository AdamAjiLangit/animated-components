import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const HomeCard = ({ title, desc, href }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="head">{title}</div>
        <div className="content flex flex-col h-full max-h-52 justify-between">
          <p>
            {desc}
          </p>
          <br />
          <div className='flex items-end justify-end'>
            <Button href={href} />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    font-family: Montserrat, sans-serif;
    width: 300px;
    height: 250px;
    translate: -6px -6px;
    background: #fff;
    border: 3px solid #000000;
    box-shadow: 12px 12px 0 #000000;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .head {
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 900;
    width: 100%;
    height: 32px;
    background: #ffffff;
    padding: 5px 12px;
    color: #000000;
    border-bottom: 3px solid #000000;
  }

  .content {
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;
  }`;

export default HomeCard;
