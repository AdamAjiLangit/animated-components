import React from 'react';
import styled from 'styled-components';

const Button = ({ href }) => {
    return (
        <StyledWrapper>
            <a href={href}>
                <button className="button">
                    Visit
                </button>
            </a>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  /* inspired form gumroad website */
  .button {
    --bg: #000;
    --hover-bg: #FF90E8;
    --hover-text: #000;
    color: #fff;
    cursor: pointer;
    border: 1px solid var(--bg);
    border-radius: 4px;
    padding: 0.8em 2em;
    background: var(--bg);
    transition: 0.2s;
  }

  .button:hover {
    color: var(--hover-text);
    transform: translate(-0.25rem, -0.25rem);
    background: var(--hover-bg);
    box-shadow: 0.25rem 0.25rem var(--bg);
  }

  .button:active {
    transform: translate(0);
    box-shadow: none;
  }`;

export default Button;
