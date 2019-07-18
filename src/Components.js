import styled from 'styled-components';

export const EditorContainer = styled.section`
  padding: 1em;
  .DraftEditor-root {
    font-family: 'Courier New', Courier, monospace;
    background: #fffffe;
    font-size: 1em;
    line-height: 1.5;
    padding: 2.54cm 2.54cm 2.54cm 1.5cm;
    margin: 20px auto;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
  }
  .align-left {
    text-align: left;
    display: block;
  }

  .align-center {
    text-align: center;
    display: block;
  }

  .align-right {
    text-align: right;
    display: block;
  }

  .indented {
    text-indent: 100px;
  }

  .header {
    text-align: center;
    display: block;
    font-size: 110%;
    font-style: italic;
    font-weight: bold;
  }
`;

export const FormatButton = styled.span`
  svg {
    height: 14px;
  }
  :hover {
    background-color: #c8cbcf;
  }
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.33;
  margin: 0;
  padding: 15px;
  text-decoration: none;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  color: #222f3e;
  height: 60px;
  min-width: 60px;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
`;

