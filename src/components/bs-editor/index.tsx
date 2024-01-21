import "@blocksuite/presets/themes/affine.css";
import {
  createEmptyPage,
  DocEditor,
  EdgelessEditor,
} from "@blocksuite/presets";
import { Page, Text } from "@blocksuite/store";
import { useEffect, useRef, useState } from "react";
import s from "./index.less";

export interface IBSEditorProps extends IBaseComponentProps {}

export function BSEditor(props: IBSEditorProps) {
  const docContainerRef = useRef<HTMLDivElement>(null);
  const edgelessContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<Page>();
  const [showEdgeless, setShowEdgeless] = useState(false);
  const editorRef = useRef<{
    doc?: DocEditor;
    edgeless?: EdgelessEditor;
  }>({});

  const createDocEditor = () => {
    if (!editorRef.current.doc) {
      editorRef.current.doc = new DocEditor();
      editorRef.current.doc.page = pageRef.current!;
      docContainerRef.current?.appendChild(editorRef.current.doc);
    }
  };

  const createEdgelessEditor = () => {
    if (!editorRef.current.edgeless) {
      editorRef.current.edgeless = new EdgelessEditor();
      editorRef.current.edgeless.page = pageRef.current!;
      edgelessContainerRef.current?.appendChild(editorRef.current.edgeless);
    }
  };

  useEffect(() => {
    const initAsync = async () => {
      pageRef.current = await createEmptyPage().init();
      createDocEditor();
    };
    initAsync();
  }, []);

  return (
    <div className={s.bsEditor}>
      <div className={s.toolbar}>
        <button
          onClick={() => {
            if (showEdgeless) {
              createDocEditor();
            } else {
              createEdgelessEditor();
            }
            setShowEdgeless((prev) => !prev);
          }}
        >
          切换到{showEdgeless ? "文档" : "画布"}模式
        </button>
      </div>
      <div
        className={s.editor}
        ref={docContainerRef}
        style={{ display: showEdgeless ? "none" : "block" }}
      ></div>
      <div
        className={s.editor}
        ref={edgelessContainerRef}
        style={{ display: !showEdgeless ? "none" : "block" }}
      ></div>
    </div>
  );
}
