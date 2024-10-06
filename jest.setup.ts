import { jest } from "@jest/globals";

const fetchMock = jest.fn((input: RequestInfo, init?: RequestInit) => {
  return Promise.resolve(
    new Response(JSON.stringify({ message: "Mocked response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
}) as jest.MockedFunction<typeof fetch>;

global.fetch = fetchMock;
