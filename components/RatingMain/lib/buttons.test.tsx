import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";

jest.mock("@heroui/button", () => ({
  Button: ({
    children,
    onClick,
    isDisabled,
    startContent,
    color,
    size,
    ...rest
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    isDisabled?: boolean;
    startContent?: React.ReactNode;
    color?: unknown;
    size?: unknown;
    [key: string]: unknown;
  }) => (
    <button disabled={Boolean(isDisabled)} onClick={onClick} {...rest}>
      {children}
    </button>
  ),
}));

jest.mock("@heroui/react", () => ({
  Spinner: () => null,
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const RateButton = require("../RateButton")
  .default as typeof import("../RateButton").default;

afterEach(() => {
  jest.clearAllMocks();
});

test("when authenticated: calls handleRate on click", async () => {
  const user = userEvent.setup();
  const handleRate = jest.fn();

  render(
    <RateButton
      isPressed={false}
      isGameSelected
      isAuthenticated
      isRated={false}
      loading={false}
      handleRate={handleRate}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Подтвердить" }));

  expect(handleRate).toHaveBeenCalledTimes(1);
  expect(signIn).not.toHaveBeenCalled();
});

test('when NOT authenticated: calls signIn("google") on click', async () => {
  const user = userEvent.setup();
  const handleRate = jest.fn();

  render(
    <RateButton
      isPressed={false}
      isGameSelected
      isAuthenticated={false}
      isRated={false}
      loading={false}
      handleRate={handleRate}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Войти" }));

  expect(handleRate).not.toHaveBeenCalled();
  expect(signIn).toHaveBeenCalledTimes(1);
  expect(signIn).toHaveBeenCalledWith("google");
});
