// jest.setup.ts

import { jest } from "@jest/globals";

// Create a mock implementation of the fetch function
const fetchMock = jest.fn((input: RequestInfo, init?: RequestInit) => {
  return Promise.resolve(
    new Response(JSON.stringify({ message: "Mocked response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
}) as jest.MockedFunction<typeof fetch>; // Cast the mock to the correct type

// Assign the mock to global.fetch
global.fetch = fetchMock;
