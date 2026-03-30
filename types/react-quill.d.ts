declare module 'react-quill-new' {
  import React from 'react';
  
  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (content: string, delta: any, source: string, editor: any) => void;
    placeholder?: string;
    theme?: string;
    className?: string;
    modules?: any;
    formats?: string[];
    readOnly?: boolean;
    bounds?: string | HTMLElement;
  }
  
  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
