import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MessageList } from "../MessageList";
import type { Message } from "ai";

vi.mock("../MarkdownRenderer", () => ({
  MarkdownRenderer: ({ content }: { content: string }) => <div>{content}</div>,
}));

afterEach(() => {
  cleanup();
});

test("shows the Interface Alchemy empty state", () => {
  render(<MessageList messages={[]} />);

  expect(screen.getByText("Interface Alchemy")).toBeDefined();
  expect(screen.getByText("Describe something impossible.")).toBeDefined();
  expect(
    screen.getByText(
      "Give the machine a purpose, an atmosphere, and a feeling. The code will follow."
    )
  ).toBeDefined();
});

test("renders user and assistant messages", () => {
  const messages: Message[] = [
    { id: "1", role: "user", content: "Create a luminous archive" },
    { id: "2", role: "assistant", content: "I am shaping the interface." },
  ];

  render(<MessageList messages={messages} />);

  expect(screen.getByText("Create a luminous archive")).toBeDefined();
  expect(screen.getByText("I am shaping the interface.")).toBeDefined();
});

test("renders text and tool invocation parts", () => {
  const messages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: "",
      parts: [
        { type: "text", text: "Composing your interface." },
        {
          type: "tool-invocation",
          toolInvocation: {
            toolCallId: "tool-1",
            args: {},
            toolName: "str_replace_editor",
            state: "result",
            result: "Success",
          },
        },
      ],
    },
  ];

  render(<MessageList messages={messages} />);

  expect(screen.getByText("Composing your interface.")).toBeDefined();
  expect(screen.getByText("str_replace_editor")).toBeDefined();
});

test("shows the branded loading state for an empty assistant response", () => {
  const messages: Message[] = [
    { id: "1", role: "assistant", content: "" },
  ];

  render(<MessageList messages={messages} isLoading />);

  expect(screen.getByText("Resolving the interface")).toBeDefined();
});

test("does not show loading state when the last message is from the user", () => {
  const messages: Message[] = [
    { id: "1", role: "assistant", content: "First response" },
    { id: "2", role: "user", content: "Another request" },
  ];

  render(<MessageList messages={messages} isLoading />);

  expect(screen.queryByText("Resolving the interface")).toBeNull();
});

test("renders design reasoning", () => {
  const messages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: "",
      parts: [
        { type: "text", text: "Let me analyze this." },
        {
          type: "reasoning",
          reasoning: "The user wants a ceremonial visual hierarchy.",
          details: [],
        },
      ],
    },
  ];

  render(<MessageList messages={messages} />);

  expect(screen.getByText("Design reasoning")).toBeDefined();
  expect(
    screen.getByText("The user wants a ceremonial visual hierarchy.")
  ).toBeDefined();
});

test("renders multiple messages in the original order", () => {
  const messages: Message[] = [
    { id: "1", role: "user", content: "First user message" },
    { id: "2", role: "assistant", content: "First assistant response" },
    { id: "3", role: "user", content: "Second user message" },
    { id: "4", role: "assistant", content: "Second assistant response" },
  ];

  const { container } = render(<MessageList messages={messages} />);
  const transcript = container.textContent ?? "";

  const positions = [
    transcript.indexOf("First user message"),
    transcript.indexOf("First assistant response"),
    transcript.indexOf("Second user message"),
    transcript.indexOf("Second assistant response"),
  ];

  expect(positions.every((position) => position >= 0)).toBe(true);
  expect(positions).toEqual([...positions].sort((a, b) => a - b));
});

test("renders a separator for step boundaries", () => {
  const messages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: "",
      parts: [
        { type: "text", text: "Step 1 content" },
        { type: "step-start" },
        { type: "text", text: "Step 2 content" },
      ],
    },
  ];

  const { container } = render(<MessageList messages={messages} />);

  expect(screen.getByText("Step 1 content")).toBeDefined();
  expect(screen.getByText("Step 2 content")).toBeDefined();
  expect(container.querySelector("hr")).not.toBeNull();
});

test("uses distinct alchemical treatments for human and assistant messages", () => {
  const messages: Message[] = [
    { id: "1", role: "user", content: "User message" },
    { id: "2", role: "assistant", content: "Assistant message" },
  ];

  render(<MessageList messages={messages} />);

  const userBubble = screen.getByText("User message").closest("div.rounded-2xl");
  const assistantBubble = screen
    .getByText("Assistant message")
    .closest("div.rounded-2xl");

  expect(userBubble?.className).toContain("from-violet-500");
  expect(userBubble?.className).toContain("to-fuchsia-500");
  expect(assistantBubble?.className).toContain("bg-white/[0.055]");
  expect(assistantBubble?.className).toContain("text-white/85");
});

test("renders content supplied through parts", () => {
  const messages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: "",
      parts: [{ type: "text", text: "This is from parts" }],
    },
  ];

  render(<MessageList messages={messages} />);
  expect(screen.getByText("This is from parts")).toBeDefined();
});

test("shows one loading state for empty assistant parts", () => {
  const messages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: "",
      parts: [],
    },
  ];

  render(<MessageList messages={messages} isLoading />);
  expect(screen.getAllByText("Resolving the interface")).toHaveLength(1);
});