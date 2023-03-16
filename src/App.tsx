import { useEffect, useState } from "react";
import AceEditor from "react-ace";

// IMPORT ACE EDITOR MODES AND THEME
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { CodeOutput, compile } from "./compilerService";

function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<CodeOutput>({
    status: "",
    output: "",
    error: "",
    time: "",
    memory: "",
  });

  useEffect(() => {
    setLoading(false);
  }, [output]);

  function onChange(newValue: string) {
    setCode(newValue);
  }

  const onSubmit = async () => {
    setLoading(true);
    const result = await compile(code);
    setOutput(result as CodeOutput);
  };

  return (
    <div className="custom-background grid md:place-content-center p-4">
      <div className="flex flex-col gap-y-8">
        <h1 className="text-center text-3xl font-extrabold text-[#100013]">
          React Ace Editor (Python)
        </h1>
        <main className="flex flex-col md:flex-row gap-4">
          <div>
            <AceEditor
              mode="python"
              theme="monokai"
              onChange={onChange}
              value={code}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              fontSize={14}
              highlightActiveLine={true}
              showGutter={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
          <div className="flex flex-col gap-y-8 w-full min-w-[400px]">
            <button
              onClick={onSubmit}
              disabled={loading}
              className={`${
                loading ? "bg-slate-500" : "bg-[#500161]"
              } flex shadow-2xl text-slate-50 py-2 px-8 rounded-lg {${!loading} &&'hover:bg-[#190122]'} w-fit scale-100 active:scale-90 transition-all ease-linear`}
            >
              {loading ? "Executing" : "Execute"}
            </button>
            <div>
              <p className="text-left font-bold mb-4">Output</p>
              <pre className="bg-[#100013] text-slate-50 min-w-[250px] min-h-[200px] p-4 text-left flex flex-col gap-4">
                {output?.time && <code>Time: {output?.time}</code>}
                {output?.memory && <code>Memory: {output?.memory}</code>}
                {output?.status && <code>Status: {output?.status}</code>}
                {output?.output && <code>Output: {output?.output}</code>}
                {output?.error && <code>Error: {output?.error}</code>}
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
