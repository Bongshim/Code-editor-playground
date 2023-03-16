import axios from "axios";
import { Buffer } from "buffer";

interface codeInput {
  source_code: string;
  language_id: number;
  stdin: string;
}

export interface CodeOutput {
  status: string;
  output: string;
  error: string;
  time: string;
  memory: string;
}


const secureAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  params: {
    base64_encoded: true,
    wait: false,
  },
  headers: {
    "content-type": "application/json",
  },
});

const checkCompileStatus = async (token: string) => {
  try {
    const response = await secureAxios.get(`submissions/${token}`);
    let data = response.data;

    while (data.status?.id === 1 || data.status?.id === 2) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      data = await checkCompileStatus(token);
    }

    return data;
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

export const compile = async (code: string) => {
  const data: codeInput = {
    source_code: Buffer.from(code).toString("base64"),
    language_id: 71,
    stdin: Buffer.from("code").toString("base64"),
  };
  try {
    const response = await secureAxios.post("submissions", data);
    const token = response.data.token;
    const res = await checkCompileStatus(token);

    const out: CodeOutput = {
      status: res?.status.description,
      output:
        res.stdout === null
          ? ""
          : Buffer.from(res?.stdout, "base64").toString("ascii"),
      error:
        res.stderr === null
          ? ""
          : Buffer.from(res?.stderr, "base64").toString("ascii"),
      time: res?.time,
      memory: res?.memory,
    };

    return out;
  } catch (error) {
    console.log(error);
  }
};
