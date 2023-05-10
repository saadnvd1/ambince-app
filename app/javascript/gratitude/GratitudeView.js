import React, { useEffect, useState } from "react";
import "./Gratitude.css";
import ReactQuill from "react-quill";

import { ClockIcon, CogIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createGratitudeEntry,
  getGratitudeEntries,
} from "gratitude/gratitudeSlice";
import { setContext } from "@sentry/react";

const { Option } = Select;

const GratitudeView = () => {
  const [isChangingPrompt, setIsChangingPrompt] = useState(false);
  const [entry, setEntry] = useState("");
  const [prompt, setPrompt] = useState("What are you grateful for today?");

  const dispatch = useDispatch();

  const fetchingInitialData = useSelector(
    (state) => state.inspiration.fetchingInitialData
  );

  const prompts = useSelector((state) => state.gratitude.prompts);
  const gratitudeEntries = useSelector(
    (state) => state.gratitude.gratitudeEntries
  );

  const gratitudeEntriesSorted = Object.entries(gratitudeEntries)
    .map(([_, entryData]) => {
      return { ...entryData };
    })
    .sort((a, b) => b.id - a.id);

  useEffect(() => {
    dispatch(getGratitudeEntries());
  }, []);

  if (fetchingInitialData) {
    return <Spin />;
  }

  const handleChangePrompt = (val) => {
    setPrompt(val);
    setIsChangingPrompt(false);
  };

  const handleEnablePromptEditingMode = () => {
    setIsChangingPrompt(!isChangingPrompt);
  };

  const handleSaveEntry = () => {
    dispatch(
      createGratitudeEntry({
        prompt,
        content: entry,
      })
    ).then(() => {
      setEntry("");
    });
  };

  return (
    <div className={"gratitude-container"}>
      {isChangingPrompt && (
        <Select
          style={{ width: "50%" }}
          defaultValue={prompt}
          onChange={handleChangePrompt}
          onSelect={handleChangePrompt}
          onBlur={() => setIsChangingPrompt(false)}
        >
          {prompts.map((p) => {
            return (
              <Option key={p} value={p}>
                {p}
              </Option>
            );
          })}
        </Select>
      )}
      {!isChangingPrompt && (
        <div
          className={"gratitude-prompt"}
          onClick={handleEnablePromptEditingMode}
        >
          <h1>{prompt}</h1>
        </div>
      )}
      <div className={"gratitude-editor-container"}>
        <ReactQuill
          theme="snow"
          value={entry}
          onChange={setEntry}
          scrollingContainer="html"
        />
      </div>
      <div className={"save-entry-btn"}>
        <Button onClick={handleSaveEntry}>Save Entry</Button>
      </div>
      <Divider>
        <div className={"past-entries-text"}>
          <ClockIcon height={24} />
          <h5>Past Entries</h5>
        </div>
      </Divider>
      <ul className={"gratitude-entries-container"}>
        {gratitudeEntriesSorted.map((entry) => {
          return (
            <li className={"gratitude-entry-card"}>
              <div className={"gratitude-card-header"}>
                <p className={"gratitude-entry-date"}>{entry.created_at}</p>
                <p className={"gratitude-entry-prompt"}>{entry.prompt}</p>
              </div>
              <div
                className={"gratitude-entry-body"}
                dangerouslySetInnerHTML={{ __html: entry.content }}
              ></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default GratitudeView;
