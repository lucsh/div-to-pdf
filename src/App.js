import React from 'react';
import './App.css';
import { print } from './pdf-utils';
import { setBlockData } from 'draftjs-utils';
import example from './example';

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  getPlainText,
} from 'draft-js';

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};

function App() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: 'line-through',
    },
  };

  const imprimir = () => {
    const contentState = editorState.getCurrentContent();

    console.log('imprimiendo ...');
    console.log(contentState.getPlainText());
    const raw = convertToRaw(contentState);
    const toPrint = [{ ...example, texto: raw }];
    print(toPrint);
  };

  const blockStyleFn = contentBlock => {
    const align = contentBlock.getData().get('align');
    if (align) {
      return `align-${align}`;
    }
  };

  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const _onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const _onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const _onStrikeClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  const _onAligmentRightClick = e => {
    e.preventDefault();
    setEditorState(setBlockData(editorState, { align: 'right' }));
  };

  const _onAligmentCenterClick = e => {
    e.preventDefault();
    setEditorState(setBlockData(editorState, { align: 'center' }));
  };

  const _onAligmentLeftClick = e => {
    e.preventDefault();
    setEditorState(setBlockData(editorState, { align: 'left' }));
  };

  return (
    <>
      <div style={styles.root}>
        <div style={styles.editor}>
          <button onClick={_onBoldClick}>Bold</button>
          <button onClick={_onItalicClick}>Italic</button>
          {/*<button onClick={_onUnderlineClick}>Under</button>*/}
          {/*<button onClick={_onStrikeClick}>Strike</button>*/}

          <button onClick={_onBoldClick}>Bold</button>
          <button onClick={_onItalicClick}>Italic</button>
          <button onClick={_onAligmentLeftClick}>Left</button>
          <button onMouseDown={_onAligmentCenterClick}>Center</button>
          <button onClick={_onAligmentRightClick}>Right</button>

          <Editor
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={setEditorState}
          />
        </div>
      </div>
      <button onClick={imprimir}>imprimir</button>
    </>
  );
}

export default App;
