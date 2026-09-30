

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import reducer, {
  createEmployee,
  deleteEmployee,
} from "../employeeSlice";

import {
  employeeService,
} from "../../../services/employeeService";

vi.mock(
  "../../../services/employeeService",
  () => ({
    employeeService: {
      create: vi.fn(),
      remove: vi.fn(),
      getAll: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
    },
  })
);

describe(
  "employeeSlice",
  () => {
    it(
      "creates an employee",
      async () => {
        const employee = {
          id: "10",
          name: "John",
          email:
            "john@test.com",
        };

        employeeService.create.mockResolvedValue(
          employee
        );

        const dispatch =
          vi.fn();

        const getState =
          vi.fn();

        const thunk =
          createEmployee({
            name: "John",
          });

        const result =
          await thunk(
            dispatch,
            getState,
            undefined
          );

        expect(
          result.payload
        ).toEqual(employee);
      }
    );

    it(
      "removes an employee",
      () => {
        const state = {
          items: [
            {
              id: "1",
              name: "A",
            },
            {
              id: "2",
              name: "B",
            },
          ],

          selectedEmployee:
            null,

          loading: false,

          searchLoading:
            false,

          mutationLoading:
            false,

          error: null,

          searchError:
            null,
        };

        const action = {
          type:
            deleteEmployee
              .fulfilled
              .type,

          payload: "1",
        };

        const next =
          reducer(
            state,
            action
          );

        expect(
          next.items
        ).toHaveLength(1);

        expect(
          next.items[0].id
        ).toBe("2");
      }
    );
  }
);