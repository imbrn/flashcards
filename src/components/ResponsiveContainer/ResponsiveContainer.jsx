import styled from "styled-components";

const screenSizes = (screens) => {
  return Object.keys(screens).map(screen => {
    return `
      @media (min-width: ${screens[screen]}) {
        max-width: ${screens[screen]};
      }
    `;
  }).join("");
};

const ResponsiveContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  ${props => screenSizes(props.theme.screen)}
`;

export default ResponsiveContainer;
