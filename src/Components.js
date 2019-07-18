import styled from 'styled-components';

export const EditorContainer = styled.section`
  padding: 1em;
  .DraftEditor-root {
    font-family: 'Courier New', Courier, monospace;
    background: #fffffe;
    font-size: 1em;
    line-height: 1.5;
    padding: 2.54cm 2.54cm 2.54cm 1.5cm;
    margin: 50px auto;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.6);
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
