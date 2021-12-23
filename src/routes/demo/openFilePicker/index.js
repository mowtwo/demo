import { useCallback, useEffect, useState } from "preact/hooks";
import style from "./style.css";

const readFileAsString = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(file, "utf8");
    reader.addEventListener("load", () => resolve(reader.result.toString()));
  });

let fileHandle = null;
let writable = null;
export default () => {
  const [txt, setTxt] = useState("");
  const [saveButtonText, setSaveButtonText] = useState("");
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    if (!opening) {
      if (txt != "") {
        setSaveButtonText("创建新文件");
        return;
      } else {
        setSaveButtonText("暂无修改");
        return;
      }
    }
    setSaveButtonText("保存修改");
  }, [opening, txt]);
  const openFile = async () => {
    [fileHandle] = await showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "js/*": [".js", ".jss", ".jsx", ".ts", ".tsx"],
            "txt/*": [".txt"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    const file = await fileHandle.getFile();
    const fileStr = await readFileAsString(file);
    setOpening(true);
    setTxt(fileStr);
  };
  const saveFile = async () => {
    if (fileHandle) {
      writable = await fileHandle.createWritable();
    } else {
      const _f = await showSaveFilePicker();
      fileHandle = _f;
      writable = await _f.createWritable();
    }
    // console.log(writable);
    const blob = new Blob([txt]);
    await writable.write(blob);
    await writable.close();
    setOpening(true);
  };
  return (
    <div className={style.fileSystem}>
      <textarea
        cols="30"
        rows="10"
        value={txt}
        onInput={(e) => {
          setTxt(e.target.value);
        }}
      ></textarea>
      <br />
      <button className={style.primary} onClick={openFile}>
        打开新文件
      </button>
      <button className={style.info} disabled={txt == ""} onClick={saveFile}>
        {saveButtonText}
      </button>
    </div>
  );
};
