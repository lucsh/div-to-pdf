import React, {useEffect} from 'react';
import './App.css';
import { print } from './pdf-utils';
import { setBlockData } from 'draftjs-utils';
import example from './example';
import rawDataExample from './rawDataExample';

import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { EditorContainer } from './Components'


function App() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  let editor = React.createRef();

  useEffect(() => focusEditor(), []);

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: 'line-through',
    },
  };

  const importData = () => {
    setEditorState(EditorState.createWithContent(convertFromRaw(rawDataExample)));
  };

  const imprimir = () => {
    const contentState = editorState.getCurrentContent();

    console.log('imprimiendo ...');
    console.log(contentState.getPlainText());
    const raw = convertToRaw(contentState);
    console.log('< raw');
    console.log(raw);
    console.log('raw />');
    const toPrint = [{ ...example, texto: raw }];
    print(toPrint);
  };

  const blockStyleFn = contentBlock => {
    const type = contentBlock.getType();
    if (type === 'header') {
      return 'header';
    }

    const indented = contentBlock.getData().get('indented');
    if (indented) {
      return `indented`;
    }

    const align = contentBlock.getData().get('align');
    if (align) {
      return `align-${align}`;
    }

  };

  const onHeaderClick = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header'));
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onStrikeClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  const onIndentClick = (e) => {
    e.preventDefault();

    const selection = editorState.getSelection()

    const isIndented = editorState.getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getData().get('indented');

    setEditorState(setBlockData(editorState, { indented: !isIndented }));
  };

  const onAligmentRightClick = e => {
    e.preventDefault();
    setEditorState(setBlockData(editorState, { align: 'right' }));
  };

  const onAligmentCenterClick = e => {
    e.preventDefault();
    setEditorState(setBlockData(editorState, { align: 'center' }));
  };

  const onAligmentLeftClick = e => {
    e.preventDefault();
    setEditorState(setBlockData(editorState, { align: 'left' }));
  };

  const focusEditor = () =>{
    editor.current.focus();
  }

  return (
    <>
        <EditorContainer  onClick={focusEditor}>
          <button onMouseDown={onHeaderClick}>Ecabezado</button>

          {/*<button onClick={onUnderlineClick}>Under</button>*/}
          {/*<button onClick={onStrikeClick}>Strike</button>*/}
          <button onMouseDown={onBoldClick}>Bold</button>
          <button onMouseDown={onItalicClick}>Italic</button>
          <button onMouseDown={onIndentClick}>Sangria</button>
          <button onMouseDown={onAligmentLeftClick}>Left</button>
          <button onMouseDown={onAligmentCenterClick}>Center</button>
          <button onMouseDown={onAligmentRightClick}>Right</button>
          <Editor
            ref={editor}
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={setEditorState}
          />
        </EditorContainer>
      <button onClick={imprimir}>imprimir</button>
      <button onClick={importData}>importar</button>
    </>
  );
}

export default App;
