import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080';

export type ProblemType = {
  id: number;
  title: string;
  description: string;
  inputConstraints: string;
  outputConstraints: string;
  difficulty: number;
  acceptanceRate: number;
  timeLimit: number;
  memoryLimit: number;
  tags: string[];
};

export type TestCaseType = {
  id: number;
  input: string;
  output: string;
};

export type ExecuteResultType = {
  testcase_id: number;
  stdout: string;
  stderr: string | null;
  time: number;
  memory: number;
  status: string;
};

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchProblem = async (problemId: string): Promise<ProblemType> => {
  const response = await api.get(`/problems/${problemId}`);
  return response.data.result.result;
};

export const fetchTestCases = async (problemId: string): Promise<TestCaseType[]> => {
  const response = await api.get(`/testcases/${problemId}`);
  return response.data.result.result;
};

export const executeCode = async (code: string, language: string, testcaseIds: number[]): Promise<ExecuteResultType[]> => {
  const response = await api.post(`/judge/execute`, {
    code,
    language,
    testcase_ids: testcaseIds
  });
  return response.data.result.result.results;
};

export const submitCode = async (problemId: number, code: string, language: string, userId: number) => {
  const response = await api.post(`/judge/submit`, {
    problem_id: problemId,
    language,
    code,
    user_id: userId
  });
  return response.data.result.result;
}; 