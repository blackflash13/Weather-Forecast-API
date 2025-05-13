jest.mock("mongoose", () => ({
    connect: jest.fn().mockResolvedValue({}),
    connection: {
        on: jest.fn(),
    },
}));

jest.mock("../src/models/subscription", () =>
    require("../__tests__/mocks/subscription"),
);
