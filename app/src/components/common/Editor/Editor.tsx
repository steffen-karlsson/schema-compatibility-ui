import React from 'react';
import { split as SplitEditor } from 'react-ace';
import { useTheme } from '@mui/material';
import { SchemaType } from 'generated-sources';

import 'ace-builds/src-noconflict/mode-protobuf';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

import './editor.css';

export interface EditorProps {
  height: number;
}

const Editor: React.FC<EditorProps> = ({ height }) => {
  const theme = useTheme();
  const schemaType = localStorage.getItem('schemaType') as SchemaType;

  return (
    <SplitEditor
      mode={
        schemaType === SchemaType.JSON || schemaType === SchemaType.AVRO
          ? 'json5'
          : 'protobuf'
      }
      theme={theme.palette.mode === 'dark' ? 'monokai' : 'github'}
      splits={2}
      width="100%"
      height={`${height}px`}
      showGutter
      fontSize={14}
      highlightActiveLine={false}
      showPrintMargin={false}
      enableBasicAutocompletion
      orientation="beside"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default Editor;
