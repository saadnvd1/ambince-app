import ReactQuill, { Quill } from "react-quill";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import SavingIndicator from "EditorView/SavingIndicator";
import hljs from "highlight.js";
import "./dracula.css";
import QuillImageDropAndPaste, { ImageData } from "quill-image-drop-and-paste";
import { uploadImage } from "slices/imagesSlice";
import { updateNote } from "slices/notesSlice";
import { selectNoteById } from "selectors/notesSelector";
import { debounce } from "lodash";

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

hljs.configure({
  languages: [
    "javascript",
    "ruby",
    "php",
    "perl",
    "scss",
    "shell",
    "swift",
    "vim",
    "python",
    "rust",
    "css",
    "pgsql",
    "txt",
    "sql",
    "yaml",
    "html",
  ],
});

const Editor = ({ noteId, index }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) => selectNoteById(state, { noteId }));
  const [content, setContent] = useState(note?.content || "");
  const uploadingImages = useSelector((state) => state.images.uploadingImages);
  const quillRef = useRef(null);

  const imageUploader = (dataUrl, type, imageData) => {
    const file = imageData.toFile();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("note_id", noteId);

    dispatch(uploadImage(formData))
      .unwrap()
      .then((response) => {
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        const index = range.index + range.length;
        editor.insertEmbed(index, "image", response.url);
        editor.setSelection(index + 1);
      });
  };

  const clickImageUpload = (clicked) => {
    if (clicked) {
      let fileInput = document.querySelector("input.ql-image[type=file]");
      if (fileInput == null) {
        fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute(
          "accept",
          "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
        );
        fileInput.classList.add("ql-image");
        fileInput.addEventListener("change", (e) => {
          const { files } = e.target;
          let file;
          if (files.length > 0) {
            file = files[0];
            const { type } = file;
            const reader = new FileReader();
            reader.onload = (e) => {
              // handle the inserted image
              const dataUrl = e.target.result;
              imageUploader(
                dataUrl,
                type,
                new ImageData(dataUrl, type, file.name)
              );
              fileInput.value = "";
            };
            reader.readAsDataURL(file);
          }
        });
      }
      fileInput.click();
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        // TODO: implement image upload
        handlers: { image: clickImageUpload },
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          ["link", "image"],
          ["clean"],
          ["code-block"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      imageDropAndPaste: {
        handler: imageUploader,
      },
    }),
    [noteId]
  );

  const changeHandler = (newContent) => {
    dispatch(updateNote({ noteId, content: newContent }));
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  );

  const handleContentChange = (newContent) => {
    // const objDiv = document.getElementById("editor-container");
    // objDiv.scrollTop = objDiv.scrollHeight;
    setContent(newContent);
    debouncedChangeHandler(newContent);
  };

  return (
    <Content>
      <div
        style={{
          backgroundColor: "#252525",
          color: "white",
          border: 0,
        }}
      >
        <ReactQuill
          ref={quillRef}
          modules={modules}
          key={`${noteId}-${index}`}
          value={content}
          onChange={handleContentChange}
          scrollingContainer="#editor-container"
          placeholder="Begin something amazing here..."
          readOnly={uploadingImages}
        />
      </div>
      <SavingIndicator
        shouldShow={uploadingImages}
        styles={{ marginTop: 13 }}
      />
    </Content>
  );
};

export default Editor;
