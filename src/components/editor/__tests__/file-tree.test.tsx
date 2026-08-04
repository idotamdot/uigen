import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { FileTree } from "@/components/editor/FileTree";
import {
  type VirtualFileSystem as FileSystem,
  type FileNode,
} from "@/lib/file-system";
import { useFileSystem } from "@/lib/contexts/file-system-context";

vi.mock("@/lib/contexts/file-system-context");

const Icon = ({ className }: { className?: string }) => (
  <div className={className}>Icon</div>
);

vi.mock("lucide-react", () => ({
  Box: Icon,
  Braces: Icon,
  ChevronRight: ({ className }: { className?: string }) => (
    <div className={className}>ChevronRight</div>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <div className={className}>ChevronDown</div>
  ),
  Component: Icon,
  FileCode2: Icon,
  FileJson2: Icon,
  Folder: Icon,
  FolderOpen: Icon,
  ImageIcon: Icon,
  Palette: Icon,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function createMockFileSystem(nodes: Record<string, FileNode>) {
  return {
    getNode: (path: string) => nodes[path],
  } as FileSystem;
}

function useMockFileSystem(
  fileSystem: FileSystem,
  options: { refreshTrigger?: number; selectedFile?: string | null; setSelectedFile?: ReturnType<typeof vi.fn> } = {}
) {
  const mockUseFileSystem = useFileSystem as ReturnType<typeof vi.fn>;
  mockUseFileSystem.mockReturnValue({
    fileSystem,
    refreshTrigger: options.refreshTrigger ?? 0,
    selectedFile: options.selectedFile ?? null,
    setSelectedFile: options.setSelectedFile ?? vi.fn(),
  });
  return mockUseFileSystem;
}

function rootWith(children: Map<string, FileNode>): FileSystem {
  return createMockFileSystem({
    "/": { type: "directory", name: "", path: "/", children },
  });
}

test("FileTree renders the branded empty Matter state", () => {
  useMockFileSystem(rootWith(new Map()));
  render(<FileTree />);

  expect(screen.getByText("Matter field empty")).toBeDefined();
  expect(
    screen.getByText(
      "Components, assets, tokens, and dependencies will materialize here as the interface forms."
    )
  ).toBeDefined();
});

test("FileTree renders files and directories", () => {
  const children = new Map<string, FileNode>([
    [
      "components",
      {
        type: "directory",
        name: "components",
        path: "/components",
        children: new Map(),
      },
    ],
    ["App.jsx", { type: "file", name: "App.jsx", path: "/App.jsx", content: "" }],
  ]);

  useMockFileSystem(rootWith(children));
  render(<FileTree />);

  expect(screen.getByText("components")).toBeDefined();
  expect(screen.getByText("App.jsx")).toBeDefined();
  expect(screen.getByText("collection")).toBeDefined();
  expect(screen.getByText("component")).toBeDefined();
});

test("FileTree sorts directories before files", () => {
  const children = new Map<string, FileNode>([
    ["b.txt", { type: "file", name: "b.txt", path: "/b.txt", content: "" }],
    [
      "a-folder",
      { type: "directory", name: "a-folder", path: "/a-folder", children: new Map() },
    ],
    ["c.js", { type: "file", name: "c.js", path: "/c.js", content: "" }],
    [
      "z-folder",
      { type: "directory", name: "z-folder", path: "/z-folder", children: new Map() },
    ],
  ]);

  useMockFileSystem(rootWith(children));
  render(<FileTree />);

  const names = screen
    .getAllByText(/^(a-folder|z-folder|b\.txt|c\.js)$/)
    .map((item) => item.textContent);
  expect(names).toEqual(["a-folder", "z-folder", "b.txt", "c.js"]);
});

test("FileTree expands and collapses collections", () => {
  const child: FileNode = {
    type: "file",
    name: "child.txt",
    path: "/parent/child.txt",
    content: "",
  };
  const parent: FileNode = {
    type: "directory",
    name: "parent",
    path: "/parent",
    children: new Map([["child.txt", child]]),
  };

  useMockFileSystem(rootWith(new Map([["parent", parent]])));
  render(<FileTree />);

  const parentButton = screen.getByRole("button", { name: "Collection: parent" });
  expect(screen.getByText("child.txt")).toBeDefined();
  expect(parentButton.getAttribute("aria-expanded")).toBe("true");

  fireEvent.click(parentButton);

  expect(screen.queryByText("child.txt")).toBeNull();
  expect(parentButton.getAttribute("aria-expanded")).toBe("false");
});

test("FileTree selects file matter when clicked", () => {
  const setSelectedFile = vi.fn();
  const file: FileNode = {
    type: "file",
    name: "test.js",
    path: "/test.js",
    content: "",
  };

  useMockFileSystem(rootWith(new Map([["test.js", file]])), { setSelectedFile });
  render(<FileTree />);

  fireEvent.click(screen.getByRole("button", { name: "logic: test.js" }));
  expect(setSelectedFile).toHaveBeenCalledWith("/test.js");
});

test("FileTree gives selected matter an electric treatment", () => {
  const file: FileNode = {
    type: "file",
    name: "selected.js",
    path: "/selected.js",
    content: "",
  };

  useMockFileSystem(rootWith(new Map([["selected.js", file]])), {
    selectedFile: "/selected.js",
  });
  render(<FileTree />);

  const button = screen.getByRole("button", { name: "logic: selected.js" });
  expect(button.className).toContain("border-electric-orchid");
  expect(button.className).toContain("from-plasma-violet/25");
  expect(button.className).toContain("text-hot-white");
});

test("FileTree renders nested collection structure", () => {
  const deep: FileNode = {
    type: "file",
    name: "deep.txt",
    path: "/a/b/c/deep.txt",
    content: "",
  };
  const c: FileNode = {
    type: "directory",
    name: "c",
    path: "/a/b/c",
    children: new Map([["deep.txt", deep]]),
  };
  const b: FileNode = {
    type: "directory",
    name: "b",
    path: "/a/b",
    children: new Map([["c", c]]),
  };
  const a: FileNode = {
    type: "directory",
    name: "a",
    path: "/a",
    children: new Map([["b", b]]),
  };

  useMockFileSystem(rootWith(new Map([["a", a]])));
  render(<FileTree />);

  expect(screen.getByText("a")).toBeDefined();
  expect(screen.getByText("b")).toBeDefined();
  expect(screen.getByText("c")).toBeDefined();
  expect(screen.getByText("deep.txt")).toBeDefined();
});

test("FileTree re-renders when the Matter field refreshes", () => {
  const file: FileNode = {
    type: "file",
    name: "test.js",
    path: "/test.js",
    content: "",
  };
  const fileSystem = rootWith(new Map([["test.js", file]]));
  const mockUseFileSystem = useMockFileSystem(fileSystem, { refreshTrigger: 1 });
  const { rerender } = render(<FileTree />);

  mockUseFileSystem.mockReturnValue({
    fileSystem,
    refreshTrigger: 2,
    selectedFile: null,
    setSelectedFile: vi.fn(),
  });
  rerender(<FileTree />);

  expect(screen.getByText("test.js")).toBeDefined();
});
