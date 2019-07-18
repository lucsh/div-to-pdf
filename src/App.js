import React, { useEffect } from 'react';
import { setBlockData } from 'draftjs-utils';

import { Bold } from 'styled-icons/boxicons-regular/Bold';
import { Italic } from 'styled-icons/boxicons-regular/Italic';
import { Text } from 'styled-icons/boxicons-regular/Text';
import { RightIndent } from 'styled-icons/boxicons-regular/RightIndent';
import { AlignLeft } from 'styled-icons/boxicons-regular/AlignLeft';
import { AlignMiddle } from 'styled-icons/boxicons-regular/AlignMiddle';
import { AlignRight } from 'styled-icons/boxicons-regular/AlignRight';

import { print } from './pdfUtils';
import example from './example';
import rawDataExample from './rawDataExample';

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { EditorContainer, FormatButton } from './Components';

function App() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  let editor = React.createRef();

  useEffect(() => focusEditor(), []);

  const styleMap = {
    STRIKETHROUGH: {
      textDecoration: 'line-through',
    },
    ITALICS: {
      fontStyle: 'italic',
    },
  };

  const importData = () => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(rawDataExample))
    );
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

  const onHeaderClick = e => {
    e.preventDefault();
    // TODO: limpiar stilos de la seleccion (remove data)
    setEditorState(RichUtils.toggleBlockType(editorState, 'header'));
  };

  const onBoldClick = (e) => {
    e.preventDefault();
    // limpio el Block type
    const newEditorState = RichUtils.toggleBlockType(editorState, 'unstyled');
    setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'BOLD'));
  };

  const onItalicClick = (e) => {
    e.preventDefault();
    // limpio el Block type
    const newEditorState = RichUtils.toggleBlockType(editorState, 'unstyled');
    setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'ITALICS'));
  };

  const onUnderlineClick = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onStrikeClick = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  const onIndentClick = e => {
    e.preventDefault();
    // limpio el Block type
    const newEditorState = RichUtils.toggleBlockType(editorState, 'unstyled');
    const selection = editorState.getSelection();

    const isIndented = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getData()
      .get('indented');

    setEditorState(setBlockData(newEditorState, { indented: !isIndented }));
  };

  const onAligmentRightClick = e => {
    e.preventDefault();
    // limpio el Block type
    const newEditorState = RichUtils.toggleBlockType(editorState, 'unstyled');
    setEditorState(setBlockData(newEditorState, { align: 'right' }));
  };

  const onAligmentCenterClick = e => {
    e.preventDefault();
    // limpio el Block type
    const newEditorState = RichUtils.toggleBlockType(editorState, 'unstyled');
    setEditorState(setBlockData(newEditorState, { align: 'center' }));
  };

  const onAligmentLeftClick = e => {
    e.preventDefault();
    // limpio el Block type
    const newEditorState = RichUtils.toggleBlockType(editorState, 'unstyled');
    setEditorState(setBlockData(newEditorState, { align: 'left' }));
  };

  const focusEditor = () => {
    editor.current.focus();
  };

  return (
    <>
      <EditorContainer onClick={focusEditor}>
        <FormatButton onMouseDown={onHeaderClick}>{<Text />}</FormatButton>
        <FormatButton onMouseDown={onBoldClick}>{<Bold />}</FormatButton>
        <FormatButton onMouseDown={onItalicClick}>{<Italic />}</FormatButton>
        <FormatButton onMouseDown={onIndentClick}>
          {<RightIndent />}
        </FormatButton>
        <FormatButton onMouseDown={onAligmentLeftClick}>
          {<AlignLeft />}
        </FormatButton>
        <FormatButton onMouseDown={onAligmentCenterClick}>
          {<AlignMiddle />}
        </FormatButton>
        <FormatButton onMouseDown={onAligmentRightClick}>
          {<AlignRight />}
        </FormatButton>
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
