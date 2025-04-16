import { useState, useEffect } from 'react';
import { ProblemType, TestCaseType, fetchProblem, fetchTestCases } from '../api/problemApi';

type UseProblemReturnType = {
  problemData: ProblemType | null;
  testCases: TestCaseType[];
  loading: boolean;
  error: string | null;
};

export const useProblem = (problemId: string): UseProblemReturnType => {
  const [problemData, setProblemData] = useState<ProblemType | null>(null);
  const [testCases, setTestCases] = useState<TestCaseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!problemId) {
        setError('문제 ID가 필요합니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [problemResponse, testCasesResponse] = await Promise.all([
          fetchProblem(problemId),
          fetchTestCases(problemId)
        ]);

        setProblemData(problemResponse);
        setTestCases(testCasesResponse);
        setError(null);
      } catch (err) {
        setError('문제 데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching problem data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [problemId]);

  return { problemData, testCases, loading, error };
}; 