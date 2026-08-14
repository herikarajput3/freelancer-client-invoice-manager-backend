import { describe, expect, it } from "vitest";

import {
    getPagination,
    getPaginationMeta,
} from "../../../core/shared/utils/pagination.js";

describe("pagination", () => {
    it("calculates skip correctly", () => {
        expect(getPagination(1, 20)).toEqual({
            page: 1,
            limit: 20,
            skip: 0,
        });

        expect(getPagination(2, 20)).toEqual({
            page: 2,
            limit: 20,
            skip: 20,
        });
    });

    it("calculates pagination metadata correctly", () => {
        expect(getPaginationMeta(2, 20, 45)).toEqual({
            page: 2,
            limit: 20,
            totalItems: 45,
            totalPages: 3,
            hasNext: true,
            hasPrevious: true,
        });
    });

    it("identifies the first page correctly", () => {
        expect(getPaginationMeta(1, 20, 45)).toEqual({
            page: 1,
            limit: 20,
            totalItems: 45,
            totalPages: 3,
            hasNext: true,
            hasPrevious: false,
        });
    });

    it("identifies the last page correctly", () => {
        expect(getPaginationMeta(3, 20, 45)).toEqual({
            page: 3,
            limit: 20,
            totalItems: 45,
            totalPages: 3,
            hasNext: false,
            hasPrevious: true,
        });
    });
});