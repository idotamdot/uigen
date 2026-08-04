import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MessageInput } from "../MessageInput";

const PLACEHOLDER =
  "Describe the feeling, the purpose, and the interface you want to bring into existence...";

function renderInput(input = "", isLoading = false) {
  const handleInputChange = vi.fn();
  const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  });

  render(
    <MessageInput
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );

  return { handleInputChange, handleSubmit };
}

afterEach(() => {
  cleanup();
});

test("renders the Interface Alchemy intent prompt", () => {
  renderInput();

  expect(screen.getByText("Shape the intent")).toBeDefined();
  expect(screen.getByText("Shift + Enter for depth")).toBeDefined();
  expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeDefined();
  expect(
    screen.getByText("Atmosphere words become part of the design DNA.")
  ).toBeDefined();
});

test("displays the current input value", () => {
  renderInput("A luminous ritual interface");
  expect(screen.getByDisplayValue("A luminous ritual interface")).toBeDefined();
});

test("calls handleInputChange when typing", async () => {
  const { handleInputChange } = renderInput();
  await userEvent.type(screen.getByPlaceholderText(PLACEHOLDER), "cinematic");
  expect(handleInputChange).toHaveBeenCalled();
});

test("submits through the form", () => {
  const { handleSubmit } = renderInput("Create a portal");
  const form = screen.getByRole("textbox").closest("form");
  expect(form).not.toBeNull();
  fireEvent.submit(form!);
  expect(handleSubmit).toHaveBeenCalledOnce();
});

test("submits with Enter and preserves Shift Enter for multiline intent", () => {
  const { handleSubmit } = renderInput("Create a portal");
  const textarea = screen.getByRole("textbox");

  fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
  expect(handleSubmit).toHaveBeenCalledOnce();

  handleSubmit.mockClear();
  fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
  expect(handleSubmit).not.toHaveBeenCalled();
});

test("disables the prompt and generation control during synthesis", () => {
  renderInput("Create a portal", true);

  expect(screen.getByRole("textbox")).toHaveProperty("disabled", true);
  expect(screen.getByRole("button", { name: "Generate interface" })).toHaveProperty(
    "disabled",
    true
  );
});

test("disables generation for empty or whitespace-only intent", () => {
  const { rerender } = render(
    <MessageInput
      input=""
      handleInputChange={vi.fn()}
      handleSubmit={vi.fn()}
      isLoading={false}
    />
  );

  expect(screen.getByRole("button", { name: "Generate interface" })).toHaveProperty(
    "disabled",
    true
  );

  rerender(
    <MessageInput
      input="   "
      handleInputChange={vi.fn()}
      handleSubmit={vi.fn()}
      isLoading={false}
    />
  );

  expect(screen.getByRole("button", { name: "Generate interface" })).toHaveProperty(
    "disabled",
    true
  );
});

test("enables generation when intent is present", () => {
  renderInput("Create a spatial dashboard");
  expect(screen.getByRole("button", { name: "Generate interface" })).toHaveProperty(
    "disabled",
    false
  );
});

test("uses the living-edge prompt chamber and accessible controls", () => {
  const { container } = render(
    <MessageInput
      input="Create a spatial dashboard"
      handleInputChange={vi.fn()}
      handleSubmit={vi.fn()}
      isLoading={false}
    />
  );

  const textarea = screen.getByRole("textbox", {
    name: "Describe the interface to generate",
  });
  const button = screen.getByRole("button", { name: "Generate interface" });

  expect(container.querySelector(".living-edge")).toBeDefined();
  expect(textarea.className).toContain("min-h-[104px]");
  expect(textarea.className).toContain("max-h-[240px]");
  expect(textarea.className).toContain("resize-none");
  expect(button.className).toContain("disabled:cursor-not-allowed");
  expect(button.className).toContain("disabled:opacity-25");
});

test("detects atmosphere language as design DNA", () => {
  renderInput("A cinematic luminous brutalist archive");

  expect(screen.getByText("cinematic")).toBeDefined();
  expect(screen.getByText("luminous")).toBeDefined();
  expect(screen.getByText("brutalist")).toBeDefined();
});

test("clicking the generation control submits", async () => {
  const { handleSubmit } = renderInput("Create an impossible instrument");
  await userEvent.click(
    screen.getByRole("button", { name: "Generate interface" })
  );
  expect(handleSubmit).toHaveBeenCalledOnce();
});