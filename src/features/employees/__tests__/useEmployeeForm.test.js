

import {
  describe,
  expect,
  it,
} from "vitest";

describe(
  "Employee form validation",
  () => {
    it(
      "accepts valid email",
      () => {
        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        expect(
          emailRegex.test(
            "john@example.com"
          )
        ).toBe(true);
      }
    );

    it(
      "rejects invalid email",
      () => {
        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        expect(
          emailRegex.test(
            "john@"
          )
        ).toBe(false);
      }
    );

    it(
      "accepts ten digit mobile",
      () => {
        expect(
          /^\d{10}$/.test(
            "9876543210"
          )
        ).toBe(true);
      }
    );

    it(
      "rejects invalid mobile",
      () => {
        expect(
          /^\d{10}$/.test(
            "98765"
          )
        ).toBe(false);
      }
    );
  }
);