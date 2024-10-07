import React from 'react';
import { split as SplitEditor } from 'react-ace';
import { useTheme } from '@mui/material';
import { SchemaType } from 'generated-sources';
import { b64dec, b64enc } from 'lib/b64';
import { SCHEMA_EXISTING, SCHEMA_PROPOSED, SCHEMA_TYPE } from 'storage/const';
import { removeLocalStorage, updateLocalStorage } from 'storage/local';

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
  const schemaType = localStorage.getItem(SCHEMA_TYPE) as SchemaType;
  const [existing, setExisting] = React.useState<string>(
    localStorage.getItem(SCHEMA_EXISTING)
      ? b64dec(localStorage.getItem(SCHEMA_EXISTING) as string)
      : ''
  );
  const [proposed, setProposed] = React.useState<string>(
    localStorage.getItem(SCHEMA_PROPOSED)
      ? b64dec(localStorage.getItem(SCHEMA_PROPOSED) as string)
      : ''
  );

  const onEditorChange = (newExisting: string, newProposed: string) => {
    setExisting(newExisting);
    if (newExisting === '') {
      removeLocalStorage(SCHEMA_EXISTING);
    } else {
      updateLocalStorage(SCHEMA_EXISTING, b64enc(newExisting));
    }

    setProposed(newProposed);
    if (newProposed === '') {
      removeLocalStorage(SCHEMA_PROPOSED);
    } else {
      updateLocalStorage(SCHEMA_PROPOSED, b64enc(newProposed));
    }
  };

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
      value={[existing, proposed]}
      editorProps={{ $blockScrolling: true }}
      onChange={(value) => onEditorChange(value[0], value[1])}
    />
  );
};

export default Editor;
