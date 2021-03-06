import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const ResponsivePlayer = styled.div`
  background: ${({ theme }) => theme.colors.backdrop};
  border: none;
  border-radius: ${({ theme }) => theme.padding.sm};
  box-shadow: ${({ theme }) => theme.colors.backgroundShadow};
  margin-bottom: ${({ theme }) => theme.padding.md};
  margin-top: ${({ theme }) => theme.padding.md};
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  transition: box-shadow 100ms ${({ theme }) => theme.animation.hover},
    transform 100ms ${({ theme }) => theme.animation.hover};

  :focus,
  :hover {
    box-shadow: ${({ theme }) => theme.colors.backgroundShadowHover};
    transform: scale(1.02);
  }

  :focus {
    box-shadow: ${({ theme }) =>
      `inset 0px 0px 0px 3px ${theme.colors.focus}, ${theme.colors.backgroundShadow}`};
  }

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default function Video({ url }) {
  return (
    <ResponsivePlayer>
      <ReactPlayer
        className="react-player"
        controls
        height="100%"
        url={url}
        width="100%"
      />
    </ResponsivePlayer>
  );
}
